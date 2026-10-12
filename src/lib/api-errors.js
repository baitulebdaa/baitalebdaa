// Turns an /api/contact or /api/chat error `code` into the visitor's own language
// (dict.apiErrors), falling back to the form's generic message for unknown codes.
export function apiErrorMessage(dict, code, fallback) {
  return (code && dict?.apiErrors?.[code]) || fallback;
}

// Reads a JSON body without throwing on an empty or non-JSON error response.
export async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}
