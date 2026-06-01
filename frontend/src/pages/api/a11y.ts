import type { APIRoute } from "astro";
import { saveA11yPreferences } from "../../server/db/repositories/a11y";

export const POST: APIRoute = async ({ request, locals }) => {
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
  const prefs = record.prefs;
  if (!prefs || typeof prefs !== "object") {
    return new Response(JSON.stringify({ error: "invalid prefs" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    saveA11yPreferences({
      visitorId,
      prefsJson: JSON.stringify(prefs),
    });
  } catch (error) {
    if (process.env.PUBLIC_APP_ENV === "local") {
      console.error("[db] a11y sync failed:", error);
    }
    return new Response(JSON.stringify({ error: "storage failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
