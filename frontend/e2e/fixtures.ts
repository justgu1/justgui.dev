import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  context: async ({ context }, use) => {
    await context.addInitScript(() => {
      localStorage.setItem("justgui.welcome.done", "1");
    });
    await context.addCookies([
      {
        name: "justgui_welcome",
        value: "1",
        url: "http://127.0.0.1:4321",
      },
      {
        name: "justgui_vid",
        value: "e2e-playwright-visitor",
        url: "http://127.0.0.1:4321",
      },
    ]);
    await use(context);
  },
  page: async ({ page }, use) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });
    await use(page);
    if (errors.length > 0) {
      throw new Error(`Console errors:\n${errors.join("\n")}`);
    }
  },
});

export { expect };
