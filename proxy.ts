import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const SHEET_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (SHEET_URL) {
    fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        path: request.nextUrl.pathname,
        country: request.headers.get("x-vercel-ip-country") || "unknown",
      }),
    }).catch(() => {});
  }
  return intlMiddleware(request);
}

export default proxy;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
