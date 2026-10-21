import 'dart:typed_data';

import 'package:baitalebdaa_app/core/failure/failure.dart';
import 'package:baitalebdaa_app/core/network/dio_client.dart';
import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';

/// Answers each request with the next status in the script (repeating the last one).
class _ScriptedAdapter implements HttpClientAdapter {
  _ScriptedAdapter(this.statuses);

  final List<int> statuses;
  int calls = 0;

  @override
  Future<ResponseBody> fetch(
    RequestOptions options,
    Stream<Uint8List>? requestStream,
    Future<void>? cancelFuture,
  ) async {
    final status = statuses[calls < statuses.length ? calls : statuses.length - 1];
    calls++;
    return ResponseBody.fromString(
      '{}',
      status,
      headers: {
        Headers.contentTypeHeader: ['application/json'],
        if (status == 429) 'retry-after': ['30'],
      },
    );
  }

  @override
  void close({bool force = false}) {}
}

Dio _dio(_ScriptedAdapter adapter) {
  final dio = Dio(BaseOptions(baseUrl: 'https://example.test'))..httpClientAdapter = adapter;
  dio.interceptors.add(RetryInterceptor(dio, baseDelay: Duration.zero));
  return dio;
}

void main() {
  group('RetryInterceptor', () {
    test('retries a GET after a server error, then succeeds', () async {
      final adapter = _ScriptedAdapter([500, 200]);
      final response = await _dio(adapter).get<Object?>('/content');
      expect(response.statusCode, 200);
      expect(adapter.calls, 2);
    });

    test('gives up after two retries', () async {
      final adapter = _ScriptedAdapter([503]);
      await expectLater(_dio(adapter).get<Object?>('/content'), throwsA(isA<DioException>()));
      expect(adapter.calls, 3);
    });

    test('never retries a POST, so a submission cannot be duplicated', () async {
      final adapter = _ScriptedAdapter([500, 200]);
      await expectLater(_dio(adapter).post<Object?>('/requests'), throwsA(isA<DioException>()));
      expect(adapter.calls, 1);
    });

    test('does not retry client errors', () async {
      final adapter = _ScriptedAdapter([404, 200]);
      await expectLater(_dio(adapter).get<Object?>('/missing'), throwsA(isA<DioException>()));
      expect(adapter.calls, 1);
    });
  });

  group('failureFromDio', () {
    Future<Failure> failureFor(int status) async {
      try {
        await _dio(_ScriptedAdapter([status])).post<Object?>('/x');
      } on DioException catch (error) {
        return failureFromDio(error);
      }
      fail('expected a DioException for $status');
    }

    test('maps HTTP statuses', () async {
      expect(await failureFor(401), isA<UnauthorisedFailure>());
      expect(await failureFor(404), isA<NotFoundFailure>());
      expect(await failureFor(503), isA<UnavailableFailure>());
      expect(await failureFor(500), isA<ServerFailure>().having((f) => f.statusCode, 'statusCode', 500));
    });

    test('reads Retry-After on 429', () async {
      expect(
        await failureFor(429),
        isA<RateLimitedFailure>().having((f) => f.retryAfter, 'retryAfter', const Duration(seconds: 30)),
      );
    });

    test('maps transport errors', () {
      final options = RequestOptions(path: '/x');
      expect(
        failureFromDio(DioException.connectionError(requestOptions: options, reason: 'no route')),
        isA<OfflineFailure>(),
      );
      expect(
        failureFromDio(DioException.receiveTimeout(timeout: Duration.zero, requestOptions: options)),
        isA<TimeoutFailure>(),
      );
    });
  });
}
