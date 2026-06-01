import { describe, expect, it } from "vitest";
import { autoReplyMessages } from "./autoReplyMessages";
import {
  buildAutoReplyHtml,
  buildAutoReplyText,
  escapeHtml,
} from "./contactAutoReplyTemplate";

const siteUrl = "https://justgui.dev";

describe("contactAutoReplyTemplate", () => {
  it("escapes HTML in visitor name", () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"
    );
  });

  for (const lang of ["en", "pt", "es"] as const) {
    it(`builds accessible HTML for ${lang}`, () => {
      const messages = autoReplyMessages[lang];
      const html = buildAutoReplyHtml({
        lang,
        name: "Ada Lovelace",
        siteUrl,
        messages,
      });

      expect(html).toContain(`lang="${lang}"`);
      expect(html).toContain(`<title>${messages.subject}</title>`);
      expect(html).toContain(escapeHtml(messages.preheader));
      expect(html).toContain('alt="justgui"');
      expect(html).toContain('role="presentation"');
      expect(html).toContain(`${siteUrl}/favicons/favicon_512x512.png`);
      expect(html).toContain(siteUrl);
      expect(html).toContain("#faf6ee");
      expect(html).toContain("#191616");
      expect(html).toContain("Ada Lovelace");
    });

    it(`builds plain text fallback for ${lang}`, () => {
      const messages = autoReplyMessages[lang];
      const text = buildAutoReplyText({
        lang,
        name: "Ada Lovelace",
        siteUrl,
        messages,
      });

      expect(text).toContain("Ada Lovelace");
      expect(text).toContain(messages.body);
      expect(text).toContain(siteUrl);
      expect(text).toContain("Guilherme Santos");
    });
  }

  it("escapes malicious name in HTML output", () => {
    const html = buildAutoReplyHtml({
      lang: "en",
      name: '<img src=x onerror="alert(1)">',
      siteUrl,
      messages: autoReplyMessages.en,
    });

    expect(html).not.toContain("<img src=x onerror");
    expect(html).toContain("&lt;img src=x onerror=");
  });
});
