import { expect, test } from "./fixtures";

test("skip link focuses main content", async ({ page }) => {
  await page.goto("/en/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: /skip to main content/i });
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("mobile menu closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/en/");
  const toggle = page.locator("[data-menu-toggle]");
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("desktop nav moves focus with ArrowRight", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/en/");
  const expertise = page
    .getByRole("navigation", { name: /main navigation/i })
    .getByRole("link", { name: /expertise/i });
  await expertise.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page
      .getByRole("navigation", { name: /main navigation/i })
      .getByRole("link", { name: /projects/i })
  ).toBeFocused();
});

test("mobile nav moves focus with ArrowDown when menu open", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/en/");
  await page.locator("[data-menu-toggle]").click();
  const expertise = page
    .getByRole("navigation", { name: /main navigation/i })
    .getByRole("link", { name: /expertise/i });
  await expertise.focus();
  await page.keyboard.press("ArrowDown");
  await expect(
    page
      .getByRole("navigation", { name: /main navigation/i })
      .getByRole("link", { name: /projects/i })
  ).toBeFocused();
});

test("language popover shows full language names", async ({ page }) => {
  await page.goto("/pt/");
  await page.locator("[data-footer-lang-toggle]").click();
  await expect(page.getByRole("listbox")).toBeVisible();
  await expect(page.getByRole("option", { name: "English" })).toBeVisible();
  await expect(page.getByRole("option", { name: "Português" })).toBeVisible();
  await expect(page.getByRole("option", { name: "Español" })).toBeVisible();
});

test("accessibility panel closes on click outside", async ({ page }) => {
  await page.goto("/en/");
  await page.getByRole("button", { name: /accessibility settings/i }).click();
  const panel = page.locator("#accessibility-panel");
  await expect(panel).toBeVisible();
  await page.locator("main").click({ position: { x: 10, y: 10 } });
  await expect(panel).toBeHidden();
});

test("accessibility panel opens and applies font scale", async ({ page }) => {
  await page.goto("/pt/");
  const openButton = page.getByRole("button", {
    name: /abrir configurações de acessibilidade/i,
  });
  await openButton.click();
  const panel = page.locator("#accessibility-panel");
  await expect(panel).toBeVisible();
  await panel.getByLabel("125%").check();
  await expect(page.locator("html")).toHaveAttribute(
    "data-a11y-font-scale",
    "125"
  );
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
});

test("header chat links to WhatsApp", async ({ page }) => {
  await page.goto("/pt/");
  const chat = page
    .getByRole("navigation", { name: /navegação principal/i })
    .getByRole("link", { name: /conversar/i });
  await expect(chat).toHaveAttribute("href", /wa\.me\/5511976598853/);
});
