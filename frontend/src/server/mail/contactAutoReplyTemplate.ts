import type { SupportedLang } from "../../config/seo";
import type { AutoReplyMessages } from "./autoReplyMessages";

const COLORS = {
  bg: "#111010",
  surface: "#191616",
  cream: "#faf6ee",
  gray: "#b0a79e",
  accent: "#e76a5b",
  border: "#302b29",
} as const;

export type AutoReplyTemplateInput = {
  lang: SupportedLang;
  name: string;
  siteUrl: string;
  messages: AutoReplyMessages;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeSiteUrl(siteUrl: string): string {
  return siteUrl.replace(/\/$/, "");
}

function logoUrl(siteUrl: string): string {
  return `${normalizeSiteUrl(siteUrl)}/favicons/favicon_512x512.png`;
}

export function buildAutoReplyText({
  name,
  siteUrl,
  messages,
}: AutoReplyTemplateInput): string {
  const url = normalizeSiteUrl(siteUrl);

  return [
    messages.greeting(name),
    "",
    messages.body,
    "",
    `${messages.cta}: ${url}`,
    "",
    messages.signature,
    messages.siteLabel,
  ].join("\n");
}

export function buildAutoReplyHtml({
  lang,
  name,
  siteUrl,
  messages,
}: AutoReplyTemplateInput): string {
  const url = normalizeSiteUrl(siteUrl);
  const greeting = escapeHtml(messages.greeting(name));
  const body = escapeHtml(messages.body);
  const subject = escapeHtml(messages.subject);
  const preheader = escapeHtml(messages.preheader);
  const cta = escapeHtml(messages.cta);
  const siteLabel = escapeHtml(messages.siteLabel);
  const signatureLines = messages.signature
    .split("\n")
    .map((line) => escapeHtml(line));

  const signatureHtml = signatureLines
    .map(
      (line, index) =>
        `<p style="margin:${index === 0 ? "0" : "4px 0 0"};font-size:16px;line-height:1.5;color:${COLORS.cream};font-family:Georgia,'Times New Roman',serif;">${line}</p>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="${lang}" dir="ltr">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.bg};color:${COLORS.cream};font-family:Arial,Helvetica,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLORS.bg};">
<tr>
<td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:${COLORS.surface};border:1px solid ${COLORS.border};border-radius:8px;">
<tr>
<td style="padding:28px 28px 20px;border-bottom:1px solid ${COLORS.border};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td width="56" valign="middle" style="padding-right:12px;">
<a href="${url}" style="text-decoration:none;">
<img src="${logoUrl(siteUrl)}" width="48" height="48" alt="justgui" style="display:block;border:0;border-radius:8px;">
</a>
</td>
<td valign="middle">
<a href="${url}" style="font-size:24px;line-height:1.2;color:${COLORS.cream};text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:bold;letter-spacing:0.04em;">justgui</a>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:28px;">
<h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:${COLORS.cream};font-family:Arial,Helvetica,sans-serif;font-weight:bold;">${greeting}</h1>
<p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:${COLORS.gray};font-family:Arial,Helvetica,sans-serif;">${body}</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="border-radius:6px;background-color:${COLORS.accent};">
<a href="${url}" style="display:inline-block;padding:14px 24px;font-size:16px;line-height:1.5;color:${COLORS.cream};text-decoration:underline;font-family:Arial,Helvetica,sans-serif;font-weight:bold;">${cta}</a>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:0 28px 28px;border-top:1px solid ${COLORS.border};">
<div style="padding-top:20px;">
${signatureHtml}
<p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:${COLORS.gray};font-family:Arial,Helvetica,sans-serif;">
<a href="${url}" style="color:${COLORS.accent};text-decoration:underline;">${siteLabel}</a>
</p>
</div>
</td>
</tr>
</table>
<p style="margin:16px 0 0;max-width:560px;font-size:12px;line-height:1.5;color:${COLORS.gray};font-family:Arial,Helvetica,sans-serif;text-align:center;">
<a href="${url}" style="color:${COLORS.gray};text-decoration:underline;">${siteLabel}</a>
</p>
</td>
</tr>
</table>
</body>
</html>`;
}

export { escapeHtml };
