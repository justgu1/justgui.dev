import type { APIRoute } from "astro";
import { IS_PRODUCTION } from "../../config/env";
import { recordConsent } from "../../server/db/repositories/consent";

const WELCOME_COOKIE = "justgui_welcome";
const WELCOME_PENDING_COOKIE = "justgui_welcome_pending";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const visitorId = locals.visitorId;
  if (!visitorId) {
    return new Response(JSON.stringify({ error: "missing visitor" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const record = body as Record<string, unknown>;
  const analyticsGranted = record.analyticsGranted === true;

  try {
    recordConsent({
      visitorId,
      analyticsGranted,
      adGranted: analyticsGranted,
    });
  } catch (error) {
    if (process.env.PUBLIC_APP_ENV === "local") {
      console.error("[db] consent insert failed:", error);
    }
    return new Response(JSON.stringify({ error: "storage failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  cookies.set(WELCOME_COOKIE, "1", {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    secure: IS_PRODUCTION,
  });

  cookies.delete(WELCOME_PENDING_COOKIE, {
    path: "/",
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
