import { expect, test } from "@playwright/test";

test("page renders with prefers-reduced-motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/");
  await expect(page.locator("h1")).toBeVisible();
});
