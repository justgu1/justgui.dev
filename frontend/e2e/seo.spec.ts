import { expect, test } from "./fixtures";

test("seo meta tags on english page", async ({ page }) => {
  await page.goto("/en/");
  await expect(page).toHaveTitle(/Just Gui Software/i);
  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute("content", /e-commerce/i);
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
  const jsonLd = page.locator('script[type="application/ld+json"]');
  await expect(jsonLd).toHaveCount(1);
  await expect(jsonLd).toContainText("ProfessionalService");
  await expect(jsonLd).toContainText("ItemList");
  await expect(jsonLd).toContainText("knowsAbout");
});
