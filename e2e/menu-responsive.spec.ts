import { test, expect, type Page } from "@playwright/test";

import { expectMenuState, menuControls } from "./helpers/menu";
import { waitForSplashToHide } from "./helpers/splash";

const verticalViewports = [
  [320, 568],
  [360, 800],
  [375, 667],
  [390, 844],
  [414, 896],
  [430, 932],
  [768, 1024],
  [820, 1180],
  [912, 1368],
] as const;

const horizontalViewports = [
  [568, 320],
  [667, 375],
  [800, 390],
  [896, 414],
  [1024, 768],
] as const;

async function expectNoHorizontalOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

for (const [width, height] of verticalViewports) {
  test(`menú móvil funciona en ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    // La primera visita de la sesión muestra el splash: esperar a que oculte
    // antes de interactuar con el menú.
    await waitForSplashToHide(page);

    const { button, panel, links } = menuControls(page);
    await expect(button).toBeVisible();
    await expectMenuState(page, false);

    await button.click();
    await expectMenuState(page, true);
    await expect(panel).toBeVisible();
    await expect(links).toHaveCount(5);
    await expectNoHorizontalOverflow(page);

    await page.keyboard.press("Escape");
    await expectMenuState(page, false);
    await expect(button).toBeFocused();

    await button.click();
    await expectMenuState(page, true);
    await button.click();
    await expectMenuState(page, false);

    await button.click();
    await links.nth(1).click();
    await expect(page).toHaveURL(/\/cv$/);
    await page.goto("/");
    await expectMenuState(page, false);
  });
}

for (const [width, height] of horizontalViewports) {
  test(`menú responsive funciona en ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await waitForSplashToHide(page);
    await expectNoHorizontalOverflow(page);

    const { button, panel } = menuControls(page);
    if (width >= 1024) {
      await expect(button).toBeHidden();
      await expect(panel).toBeVisible();
      return;
    }

    await expect(button).toBeVisible();
    await button.click();
    await expectMenuState(page, true);
    await expect(panel).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
}

test("menú se sincroniza al cruzar 1023 y 1024 px", async ({ page }) => {
  await page.setViewportSize({ width: 1023, height: 800 });
  await page.goto("/");
  await waitForSplashToHide(page);

  const { button, panel } = menuControls(page);
  await expect(button).toBeVisible();
  await button.click();
  await expectMenuState(page, true);

  await page.setViewportSize({ width: 1024, height: 800 });
  await expect(button).toBeHidden();
  await expect(panel).toBeVisible();

  await page.setViewportSize({ width: 1023, height: 800 });
  await expect(button).toBeVisible();
  await expectMenuState(page, false);
  await button.click();
  await expectMenuState(page, true);
  await expectNoHorizontalOverflow(page);
});
