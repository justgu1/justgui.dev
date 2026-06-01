import type { APIRoute } from "astro";
import { isMailConfigured } from "../../server/mail/config";
import { sendContactEmail } from "../../server/mail/sendContactEmail";
import {
  contactMessage,
  resolveContactLang,
  validateContactPayload,
} from "../../server/contact/contactMessages";
import {
  createContactSubmission,
  markContactFailed,
  markContactSent,
} from "../../server/db/repositories/contact";

export const POST: APIRoute = async ({ request, locals }) => {
  const lang = resolveContactLang(request.headers.get("x-lang"));

  if (!isMailConfigured()) {
    return new Response(
      JSON.stringify({ message: contactMessage(lang, "unavailable") }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ message: contactMessage(lang, "validation") }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const payload = validateContactPayload(body);
  if (!payload) {
    return new Response(
      JSON.stringify({ message: contactMessage(lang, "validation") }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  let submissionId: number | null = null;
  try {
    submissionId = createContactSubmission({
      visitorId: locals.visitorId ?? null,
      name: payload.name,
      email: payload.email,
      message: payload.message,
      lang,
    });
  } catch (error) {
    if (process.env.PUBLIC_APP_ENV === "local") {
      console.error("[db] contact insert failed:", error);
    }
  }

  try {
    await sendContactEmail({ ...payload, lang });
    if (submissionId !== null) {
      markContactSent(submissionId);
    }
    return new Response(
      JSON.stringify({ message: contactMessage(lang, "success") }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    if (submissionId !== null) {
      markContactFailed(submissionId);
    }
    return new Response(
      JSON.stringify({ message: contactMessage(lang, "error") }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
