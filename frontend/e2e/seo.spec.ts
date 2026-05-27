import { expect, test } from "./fixtures";

test("seo meta tags on english page", async ({ page }) => {
  await page.goto("/en/");
  await expect(page).toHaveTitle(/.+/);
  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute("content", /.+/);
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute("href", /\/en\/?$/);
  await expect(page.locator('link[hreflang="pt"]')).toHaveAttribute(
    "href",
    /.+/
  );
  await expect(page.locator('link[hreflang="es"]')).toHaveAttribute(
    "href",
    /.+/
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    1
  );
});
