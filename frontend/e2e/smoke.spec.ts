import { expect, test } from "./fixtures";

for (const lang of ["en", "pt", "es"]) {
  test(`homepage loads for ${lang}`, async ({ page }) => {
    const response = await page.goto(`/${lang}/`);
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("h1")).toBeVisible();
  });
}
