import { expect, test } from "./fixtures";

test("does not load tracking scripts in local env", async ({ page }) => {
  await page.goto("/en/");
  const scripts = await page
    .locator("script[src]")
    .evaluateAll((nodes) => nodes.map((n) => (n as HTMLScriptElement).src));
  const tracking = scripts.filter(
    (src) =>
      src.includes("googletagmanager.com") ||
      src.includes("google-analytics.com") ||
      src.includes("connect.facebook.net")
  );
  expect(tracking).toEqual([]);
});
