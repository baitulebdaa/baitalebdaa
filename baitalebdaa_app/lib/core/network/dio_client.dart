import 'dart:async';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

import '../failure/failure.dart';

/// Builds the HTTP client for REST sources (the website's content endpoint from Phase W).
/// Firebase traffic goes through the Firebase SDKs, not this client.
Dio createDio({required Uri baseUri, bool logRequests = false}) {
  final dio = Dio(
    BaseOptions(
      baseUrl: baseUri.toString(),
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 20),
      sendTimeout: const Duration(seconds: 20),
      headers: {Headers.acceptHeader: 'application/json'},
    ),
  );
  dio.interceptors.add(RetryInterceptor(dio));
  if (logRequests) dio.interceptors.add(const RedactedLogInterceptor());
  return dio;
}

/// Retries GET and HEAD only: they are idempotent, so a retry cannot duplicate a
/// side effect. Writes are never retried here; submissions carry their own idempotency key.
class RetryInterceptor extends Interceptor {
  RetryInterceptor(this._dio, {this.maxRetries = 2, this.baseDelay = const Duration(milliseconds: 400)});

  final Dio _dio;
  final int maxRetries;
  final Duration baseDelay;

  static const _attemptKey = 'retry_attempt';

  @override
  Future<void> onError(DioException err, ErrorInterceptorHandler handler) async {
    final options = err.requestOptions;
    final attempt = (options.extra[_attemptKey] as int?) ?? 0;
    if (!_isRetryable(err) || attempt >= maxRetries || (options.cancelToken?.isCancelled ?? false)) {
      handler.next(err);
      return;
    }
    await Future<void>.delayed(baseDelay * (1 << attempt));
    options.extra[_attemptKey] = attempt + 1;
    try {
      handler.resolve(await _dio.fetch<Object?>(options));
    } on DioException catch (retryError) {
      handler.next(retryError);
    }
  }

  bool _isRetryable(DioException err) {
    final method = err.requestOptions.method.toUpperCase();
    if (method != 'GET' && method != 'HEAD') return false;
    return switch (err.type) {
      DioExceptionType.connectionError || DioExceptionType.connectionTimeout || DioExceptionType.receiveTimeout => true,
      DioExceptionType.badResponse => (err.response?.statusCode ?? 0) >= 500,
      _ => false,
    };
  }
}

/// Logs method, path and status only. Query strings, headers and bodies can carry personal
/// data, so they never reach the console.
class RedactedLogInterceptor extends Interceptor {
  const RedactedLogInterceptor();

  @override
  void onResponse(Response<Object?> response, ResponseInterceptorHandler handler) {
    debugPrint('HTTP ${response.requestOptions.method} ${response.requestOptions.uri.path} → ${response.statusCode}');
    handler.next(response);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    debugPrint(
      'HTTP ${err.requestOptions.method} ${err.requestOptions.uri.path} ✕ ${err.type.name} ${err.response?.statusCode ?? ''}',
    );
    handler.next(err);
  }
}

/// The one place Dio errors become [Failure]s.
Failure failureFromDio(DioException error) {
  final status = error.response?.statusCode;
  return switch (error.type) {
    DioExceptionType.connectionError => const OfflineFailure(),
    DioExceptionType.connectionTimeout ||
    DioExceptionType.sendTimeout ||
    DioExceptionType.receiveTimeout ||
    DioExceptionType.transformTimeout => const TimeoutFailure(),
    DioExceptionType.badResponse => switch (status) {
      401 || 403 => const UnauthorisedFailure(),
      404 => const NotFoundFailure(),
      429 => RateLimitedFailure(retryAfter: _retryAfter(error.response)),
      503 => const UnavailableFailure(),
      _ => ServerFailure(statusCode: status),
    },
    DioExceptionType.cancel => UnknownFailure(error),
    DioExceptionType.badCertificate => const OfflineFailure(),
    DioExceptionType.unknown => UnknownFailure(error.error),
  };
}

Duration? _retryAfter(Response<Object?>? response) {
  final seconds = int.tryParse(response?.headers.value('retry-after') ?? '');
  return seconds == null ? null : Duration(seconds: seconds);
}
