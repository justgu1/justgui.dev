import { expect, test } from "./fixtures";

test("page renders with prefers-reduced-motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/");
  await expect(page.locator("h1")).toBeVisible();
});

test("accessibility panel reduce motion toggle applies dataset", async ({
  page,
}) => {
  await page.goto("/en/");
  await page
    .getByRole("button", { name: /open accessibility settings/i })
    .click();
  const panel = page.locator("#accessibility-panel");
  await panel.getByRole("checkbox", { name: /reduce motion/i }).check();
  await expect(page.locator("html")).toHaveAttribute(
    "data-a11y-motion",
    "reduce"
  );
});
