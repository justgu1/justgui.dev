import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

const langs = ["en", "pt", "es"] as const;

for (const lang of langs) {
  test.describe(`navigation ${lang}`, () => {
    test("has landmarks and single h1", async ({ page }) => {
      await page.goto(`/${lang}/`);
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.locator("main#main-content")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
      await expect(page.locator("h1")).toHaveCount(1);
    });

    test("section anchors exist", async ({ page }) => {
      await page.goto(`/${lang}/`);
      for (const id of ["expertise", "projects", "about", "contact"]) {
        await expect(page.locator(`#${id}`)).toBeAttached();
      }
    });

    test("passes axe WCAG2AA", async ({ page }) => {
      await page.goto(`/${lang}/`);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  });
}
