import { test as base } from "@playwright/test";

export const test = base.extend({
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

export { expect } from "@playwright/test";
