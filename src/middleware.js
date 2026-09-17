import { NextResponse } from "next/server";

// Serves the English homepage's real content directly at the bare domain root
// (a rewrite, not a redirect) so Google indexes the clean https://www.baitalebdaa.com/
// URL instead of .../en/ — see src/lib/page-metadata.js for the matching canonical
// and hreflang logic on that same page.
export function middleware(request) {
  const url = request.nextUrl.clone();
  url.pathname = "/en";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/",
};
