import { expect, test, type Page } from "@playwright/test";

// La imagen biográfica reemplaza al monograma "T." en la tarjeta lateral de
// Inicio y ahora comparte grid con el <dl> de datos de contacto.
// Rutas de locale explícitas para que la localización sea determinista.
const localizedCases = [
  { path: "/es/", alt: "Foto de perfil de Tino Reyna" },
  { path: "/en/", alt: "Profile photo of Tino Reyna" },
  { path: "/pt/", alt: "Foto de perfil de Tino Reyna" },
] as const;

const intrinsicRatio = 960 / 959;

function bioImage(page: Page) {
  return page.locator('aside img[src*="bio"]');
}

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
    .toBe(true);
}

for (const { path, alt } of localizedCases) {
  test(`imagen biográfica accesible en ${path}`, async ({ page }) => {
    await page.goto(path);

    const image = bioImage(page);
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("alt", alt);

    // El monograma de texto ya no se muestra en la tarjeta.
    await expect(page.locator('aside span:text-is("T.")')).toHaveCount(0);

    // La imagen carga de verdad (no un recurso roto). Se espera a que termine
    // de decodificarse: el primer contacto con el optimizador de Next es lento.
    await expect
      .poll(() =>
        image.evaluate((el) => {
          const img = el as HTMLImageElement;
          return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
        }),
      )
      .toBe(true);
  });
}

test("imagen biográfica sin desbordes ni deformación en móvil y escritorio", async ({ page }) => {
  for (const viewport of [
    { width: 375, height: 667 },
    { width: 1280, height: 800 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/es/");

    const image = bioImage(page);
    await expect(image).toBeVisible();

    // Sin desbordes horizontales en la página.
    await expectNoHorizontalOverflow(page);

    const aside = page.locator("aside");
    const imageBox = (await image.boundingBox())!;
    const asideBox = (await aside.boundingBox())!;

    // La imagen cabe dentro de su contenedor (tarjeta).
    expect(imageBox.x).toBeGreaterThanOrEqual(asideBox.x - 1);
    expect(imageBox.x + imageBox.width).toBeLessThanOrEqual(asideBox.x + asideBox.width + 1);

    // Sin deformación: la caja renderizada conserva la relación de aspecto.
    const renderedRatio = imageBox.width / imageBox.height;
    expect(Math.abs(renderedRatio - intrinsicRatio)).toBeLessThan(0.05);
  }
});

test("la imagen se muestra junto a los datos en pantalla ancha", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/es/");

  const imageBox = (await bioImage(page).boundingBox())!;
  const dlBox = (await page.locator("aside dl").boundingBox())!;

  // Columnas del grid: la imagen queda a la izquierda del <dl>, sin solape
  // horizontal, y comparten fila (se solapan verticalmente).
  expect(imageBox.x + imageBox.width).toBeLessThanOrEqual(dlBox.x + 1);
  expect(imageBox.y).toBeLessThan(dlBox.y + dlBox.height);
  expect(dlBox.y).toBeLessThan(imageBox.y + imageBox.height);
});

test("la imagen se apila sobre los datos en móvil", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/es/");

  const imageBox = (await bioImage(page).boundingBox())!;
  const dlBox = (await page.locator("aside dl").boundingBox())!;

  // Apiladas: la imagen termina antes de que empiecen los datos y comparten
  // columna (se solapan horizontalmente).
  expect(imageBox.y + imageBox.height).toBeLessThanOrEqual(dlBox.y + 1);
  expect(imageBox.x).toBeLessThan(dlBox.x + dlBox.width);
  expect(dlBox.x).toBeLessThan(imageBox.x + imageBox.width);
});

test("la imagen usa el mismo radio de borde que su contenedor", async ({ page }) => {
  await page.goto("/es/");

  const image = bioImage(page);
  await expect(image).toBeVisible();

  const radii = await page.evaluate(() => {
    const img = document.querySelector('aside img[src*="bio"]') as HTMLImageElement;
    const aside = document.querySelector("aside") as HTMLElement;
    return {
      image: window.getComputedStyle(img).borderRadius,
      container: window.getComputedStyle(aside).borderRadius,
    };
  });

  expect(radii.image).toBe(radii.container);
  // rounded-3xl (1.5rem) en ambos: valor distinto de circular ni de rectángulo.
  expect(radii.image).toBe("24px");
});
