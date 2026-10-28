import { expect, test, type Page } from "@playwright/test";

import { waitForSplashToHide } from "./helpers/splash";

// La página de error 404 personalizada se activa para cualquier URL sin
// ruta propia: responde HTTP 404 con el chrome del sitio (header y footer)
// y localiza textos e imagen según el locale de la URL (es es el
// predeterminado y también el fallback para locales no soportados).
const localizedCases = [
  {
    path: "/pagina-inexistente",
    title: "Página no encontrada",
    backLabel: "Volver al inicio",
    backHref: "/",
    alt: "Ilustración de una página no encontrada",
  },
  {
    path: "/en/ruta-inexistente",
    title: "Page not found",
    backLabel: "Back to home",
    backHref: "/en",
    alt: "Illustration of a page not found",
  },
  {
    path: "/pt/ruta-inexistente",
    title: "Página não encontrada",
    backLabel: "Voltar ao início",
    backHref: "/pt",
    alt: "Ilustração de uma página não encontrada",
  },
  {
    // Locale no soportado: el proxy lo reescribe al locale por defecto.
    path: "/xx/ruta-inexistente",
    title: "Página no encontrada",
    backLabel: "Volver al inicio",
    backHref: "/",
    alt: "Ilustración de una página no encontrada",
  },
] as const;

const intrinsicRatio = 982 / 551;

function notFoundPanel(page: Page) {
  return page.getByTestId("not-found-panel");
}

function notFoundImage(page: Page) {
  return page.locator('img[src*="404"]');
}

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
    .toBe(true);
}

for (const { path, title, backLabel, backHref, alt } of localizedCases) {
  test(`página de error 404 en ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);

    await waitForSplashToHide(page);

    // La respuesta no se indexa (Next inyecta noindex en respuestas 404).
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

    const panel = notFoundPanel(page);
    await expect(panel).toBeVisible();
    await expect(panel.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(panel.getByRole("link", { name: backLabel })).toHaveAttribute("href", backHref);

    // Imagen central con texto alternativo localizado, que carga de verdad.
    const image = notFoundImage(page);
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("alt", alt);
    await expect
      .poll(() =>
        image.evaluate((el) => {
          const img = el as HTMLImageElement;
          return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
        }),
      )
      .toBe(true);

    // El chrome del sitio se conserva en la página de error.
    await expect(page.getByTestId("site-navigation")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
}

test("la imagen 404 se muestra completa y centrada en escritorio", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/pagina-inexistente");
  await waitForSplashToHide(page);

  const image = notFoundImage(page);
  await expect(image).toBeVisible();

  const box = (await image.boundingBox())!;

  // Centrada horizontalmente en el viewport.
  expect(Math.abs(box.x + box.width / 2 - 1280 / 2)).toBeLessThan(2);

  // Sin deformación: la caja renderizada conserva la relación de aspecto.
  const renderedRatio = box.width / box.height;
  expect(Math.abs(renderedRatio - intrinsicRatio)).toBeLessThan(0.05);
});

test("la página de error no provoca desplazamiento horizontal en móvil", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/pagina-inexistente");
  await waitForSplashToHide(page);

  await expect(notFoundPanel(page)).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
