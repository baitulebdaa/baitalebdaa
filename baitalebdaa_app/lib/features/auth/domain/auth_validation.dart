/// What is wrong with a form field. Screens turn these into localised messages.
enum FieldIssue { required, invalidEmail, passwordTooShort, nameTooLong }

/// Client-side checks for the sign-in forms. Firebase re-checks everything server-side;
/// these exist so mistakes are caught before a network round trip.
abstract final class AuthValidation {
  /// Above Firebase's own minimum of 6.
  static const minPasswordLength = 8;
  static const maxNameLength = 80;

  // The website's contact form uses the same rule (src/app/api/contact/route.js).
  static final _email = RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$');

  static FieldIssue? email(String value) {
    final email = value.trim();
    if (email.isEmpty) return FieldIssue.required;
    return _email.hasMatch(email) ? null : FieldIssue.invalidEmail;
  }

  /// Signing in only needs something typed; the server decides whether it is right.
  static FieldIssue? password(String value) => value.isEmpty ? FieldIssue.required : null;

  static FieldIssue? newPassword(String value) {
    if (value.isEmpty) return FieldIssue.required;
    return value.length < minPasswordLength ? FieldIssue.passwordTooShort : null;
  }

  static FieldIssue? name(String value) {
    final name = value.trim();
    if (name.isEmpty) return FieldIssue.required;
    return name.length > maxNameLength ? FieldIssue.nameTooLong : null;
  }
}
