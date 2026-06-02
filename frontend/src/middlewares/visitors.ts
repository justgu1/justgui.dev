import type { MiddlewareHandler } from "astro";
import { randomUUID } from "node:crypto";
import { IS_PRODUCTION } from "../config/env";
import { pathLang } from "../utils/localePath";
import { hashIp, resolveClientIp } from "../server/db/ipHash";
import { getDb } from "../server/db/client";
import { ensureVisitor, hasConsent } from "../server/db/repositories/visitors";

const VISITOR_COOKIE = "justgui_vid";
const WELCOME_COOKIE = "justgui_welcome";
const WELCOME_PENDING_COOKIE = "justgui_welcome_pending";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/favicons") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/cv") ||
    pathname.startsWith("/sitemap") ||
    pathname.endsWith(".xml") ||
    pathname === "/robots.txt"
  );
}

function setWelcomePending(context: Parameters<MiddlewareHandler>[0]): void {
  context.cookies.set(WELCOME_PENDING_COOKIE, "1", {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: IS_PRODUCTION,
  });
}

function resolveShowWelcome(
  context: Parameters<MiddlewareHandler>[0],
  isNewCookie: boolean,
  isNew: boolean,
  visitorId: string,
  isApi: boolean
): boolean {
  if (isApi) return false;

  const hasWelcomeCookie = Boolean(context.cookies.get(WELCOME_COOKIE)?.value);
  if (hasWelcomeCookie) return false;

  const hasPending = Boolean(
    context.cookies.get(WELCOME_PENDING_COOKIE)?.value
  );
  if (hasPending || isNewCookie || isNew) return true;

  try {
    return !hasConsent(getDb(), visitorId);
  } catch {
    return true;
  }
}

export const VisitorsMiddleware: MiddlewareHandler = async (context, next) => {
  const pathname = context.url.pathname;

  let visitorId = context.cookies.get(VISITOR_COOKIE)?.value;
  const isNewCookie = !visitorId;

  if (!visitorId) {
    visitorId = randomUUID();
    context.cookies.set(VISITOR_COOKIE, visitorId, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
      secure: IS_PRODUCTION,
      httpOnly: true,
    });
  }

  context.locals.visitorId = visitorId;

  if (isStaticAsset(pathname)) {
    return next();
  }

  const ip = resolveClientIp(
    context.clientAddress,
    context.request.headers.get("x-forwarded-for")
  );
  const ipHash = hashIp(ip);
  const lang = pathLang(pathname);
  const isApi = pathname.startsWith("/api");

  let isNew = false;
  try {
    const result = ensureVisitor({
      visitorId,
      ipHash,
      userAgent: context.request.headers.get("user-agent"),
      acceptLanguage: context.request.headers.get("accept-language"),
      path: pathname,
      lang,
    });
    isNew = result.isNew;
  } catch (error) {
    if (process.env.PUBLIC_APP_ENV === "local") {
      console.error("[db] visitor tracking failed:", error);
    }
  }

  const showWelcome = resolveShowWelcome(
    context,
    isNewCookie,
    isNew,
    visitorId,
    isApi
  );
  context.locals.showWelcome = showWelcome;

  if (showWelcome) {
    setWelcomePending(context);
  }

  return next();
};
