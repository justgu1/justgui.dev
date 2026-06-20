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
  const jsonLdContent = await jsonLd.textContent();
  expect(jsonLdContent).toBeTruthy();
  expect(jsonLdContent).toContain("ProfessionalService");
  expect(jsonLdContent).toContain("ItemList");
  expect(jsonLdContent).toContain("knowsAbout");
});
