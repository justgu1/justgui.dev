import { expect, test } from "@playwright/test";

test("english homepage shows main heading without javascript", async ({
  page,
}) => {
  await page.goto("/en/");
  await expect(page.locator("h1")).toBeVisible();
});
