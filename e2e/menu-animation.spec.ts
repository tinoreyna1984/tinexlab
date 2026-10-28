import { test, expect, type Page } from "@playwright/test";

import { expectMenuState, menuControls } from "./helpers/menu";
import { waitForSplashToHide } from "./helpers/splash";

async function expectNoHorizontalOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

/** Lee el estado observable del panel en un solo roundtrip. */
async function panelSnapshot(panel: ReturnType<typeof menuControls>["panel"]) {
  return panel.evaluate((el) => ({
    dataOpen: el.getAttribute("data-open"),
    opacity: Number(getComputedStyle(el).opacity),
    visibility: getComputedStyle(el).visibility,
    pointerEvents: getComputedStyle(el).pointerEvents,
    inert: el.hasAttribute("inert"),
    position: getComputedStyle(el).position,
  }));
}

for (const [width, height] of [
  [320, 568],
  [375, 667],
] as const) {
  test(`menú móvil anima apertura y cierre en ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    // La primera visita de la sesión muestra el splash: esperar a que oculte
    // antes de interactuar con el menú.
    await waitForSplashToHide(page);

    const { button, panel, links } = menuControls(page);
    await expect(panel).toHaveCSS("position", "absolute");
    await expect(panel).toHaveCSS("visibility", "hidden");

    // Apertura: los estados cambian de inmediato, sin esperar la transición
    // (la opacidad todavía no llegó a 1 cuando leemos los atributos).
    await button.click();
    const opening = await panelSnapshot(panel);
    expect(opening.dataOpen).toBe("true");
    expect(opening.opacity).toBeLessThan(1);
    await expect(button).toHaveAttribute("aria-expanded", "true");

    // (a) El panel termina completamente visible, sin overflow horizontal.
    await expect(panel).toBeVisible();
    await expect(panel).toHaveCSS("opacity", "1");
    await expect(panel).toHaveCSS("visibility", "visible");
    await expect(links).toHaveCount(5);
    await expectNoHorizontalOverflow(page);

    // Cierre (Escape): estados inmediatos + bloqueo de interacción durante
    // la transición de salida (1.3): inert y pointer-events:none.
    await page.keyboard.press("Escape");
    const closing = await panelSnapshot(panel);
    expect(closing.dataOpen).toBe("false");
    expect(closing.inert).toBe(true);
    expect(closing.pointerEvents).toBe("none");
    const focusBlocked = await panel.evaluate((el) => {
      const link = el.querySelector("a");
      link?.focus();
      return document.activeElement !== link;
    });
    expect(focusBlocked).toBe(true);
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expectMenuState(page, false);

    // (a) El panel termina completamente oculto tras la animación de salida.
    await expect(panel).toBeHidden();
    await expect(panel).toHaveCSS("opacity", "0");
    await expect(panel).toHaveCSS("visibility", "hidden");
    await expectNoHorizontalOverflow(page);

    // Cierre con el botón: mismo estado final.
    await button.click();
    await expectMenuState(page, true);
    await expect(panel).toBeVisible();
    await button.click();
    await expectMenuState(page, false);
    await expect(panel).toBeHidden();
    await expectNoHorizontalOverflow(page);
  });
}

test("escritorio muestra el menú estático, sin animación", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/");
  await waitForSplashToHide(page);

  const { button, panel } = menuControls(page);
  await expect(button).toBeHidden();
  await expect(panel).toBeVisible();
  const desktop = await panelSnapshot(panel);
  expect(desktop.position).toBe("static");
  expect(desktop.opacity).toBe(1);
  expect(desktop.visibility).toBe("visible");
  // Sin transición alguna: la navegación horizontal no se anima.
  await expect(panel).toHaveCSS("transition-duration", "0s");
});

test("con movimiento reducido abre y cierra de inmediato", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  await waitForSplashToHide(page);

  const { button, panel } = menuControls(page);
  // La preferencia anula la transición del panel por completo.
  await expect(panel).toHaveCSS("transition-duration", "0s");

  // Estados finales idénticos a los de la animación normal, sin transición.
  await button.click();
  await expectMenuState(page, true);
  await expect(panel).toBeVisible();
  await expect(panel).toHaveCSS("opacity", "1");
  await expect(panel).toHaveCSS("visibility", "visible");

  await page.keyboard.press("Escape");
  await expectMenuState(page, false);
  await expect(panel).toBeHidden();
  await expect(panel).toHaveCSS("opacity", "0");
  await expect(panel).toHaveCSS("visibility", "hidden");
});
