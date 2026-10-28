import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, isLocale, locales } from "@/lib/i18n";

function preferredLocale(request: NextRequest) {
  const accepted = request.headers.get("accept-language")?.toLowerCase() ?? "";
  for (const locale of locales) {
    if (accepted.split(",").some((value) => value.trim().startsWith(locale))) {
      return locale;
    }
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  // x-locale viaja como header de petición para que app/not-found.tsx pueda
  // localizar el chrome y los textos del 404 (headers() no expone el pathname).
  const requestHeaders = new Headers(request.headers);

  if (isLocale(firstSegment)) {
    requestHeaders.set("x-locale", firstSegment);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const locale = pathname === "/" ? preferredLocale(request) : defaultLocale;
  requestHeaders.set("x-locale", locale);
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(rewriteUrl, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
