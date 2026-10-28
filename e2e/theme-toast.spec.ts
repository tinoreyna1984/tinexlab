import { expect, test, type Page } from "@playwright/test";

function themeButton(page: Page) {
  return page.getByRole("button", { name: /Cambiar tema/ });
}

async function freshPage(page: Page, path: string) {
  await page.goto(path);
  await page.evaluate(() => window.localStorage.removeItem("tinexlab-theme"));
  await page.reload();
  await expect(themeButton(page)).toBeVisible();
}

// El proxy negocia el idioma de la raíz por Accept-Language: cada grupo fija
// el `locale` del contexto para que la localización sea determinista.
const localizedCases = [
  {
    path: "/",
    locale: "es-MX",
    expected: "Tema: claro",
    dismiss: "Cerrar mensaje",
  },
  {
    path: "/en/",
    locale: "en-US",
    expected: "Theme: light",
    dismiss: "Close message",
  },
  {
    path: "/pt/",
    locale: "pt-BR",
    expected: "Tema: claro",
    dismiss: "Fechar mensagem",
  },
];

for (const { path, locale, expected, dismiss } of localizedCases) {
  test.describe(`mensaje localizado (${locale})`, () => {
    test.use({ locale });

    test(`el selector de tema muestra el mensaje en ${path}`, async ({ page }) => {
      await freshPage(page, path);

      await themeButton(page).click();

      const toast = page.getByTestId("theme-toast");
      await expect(toast).toBeVisible();
      await expect(toast).toContainText(expected);
      await expect(toast).toContainText(dismiss);

      // El mensaje se cierra solo sin interacción.
      await expect(toast).toBeHidden({ timeout: 7000 });
    });
  });
}

test.describe("cambios repetidos y otras secciones", () => {
  test.use({ locale: "es-MX" });

  test("cambios repetidos dejan un solo mensaje visible", async ({ page }) => {
    await freshPage(page, "/");

    const button = themeButton(page);
    await button.click();
    await button.click();
    await button.click();

    const toast = page.getByTestId("theme-toast");
    await expect(toast).toHaveCount(1);
    await expect(toast).toBeVisible();
    // system → light → dark → system: el mensaje refleja el último tema aplicado.
    await expect(toast).toContainText("Tema: sistema");
    // La preferencia sigue persistiéndose correctamente.
    await expect
      .poll(() => page.evaluate(() => window.localStorage.getItem("tinexlab-theme")))
      .toBe("system");
  });

  test("el mensaje funciona en una sección distinta de la portada", async ({
    page,
  }) => {
    await freshPage(page, "/portafolio");

    await themeButton(page).click();

    const toast = page.getByTestId("theme-toast");
    await expect(toast).toBeVisible();
    await expect(toast).toContainText("Tema: claro");
  });
});

test.describe("cierres del mensaje", () => {
  test.use({ locale: "es-MX" });

  test("se cierra solo después de ~4 s sin interacción", async ({ page }) => {
    await freshPage(page, "/");

    await themeButton(page).click();
    const toast = page.getByTestId("theme-toast");
    await expect(toast).toBeVisible();

    // Todavía visible pasados ~3 s (no cierra antes de tiempo)...
    await page.waitForTimeout(3000);
    await expect(toast).toBeVisible();

    // ...y desaparece sola al completar el tiempo de visualización.
    await expect(toast).toBeHidden({ timeout: 5000 });
  });

  test("pulsar después del fade-in lo cierra antes del auto-cierre", async ({
    page,
  }) => {
    await freshPage(page, "/");

    await themeButton(page).click();
    const toast = page.getByTestId("theme-toast");
    await expect(toast).toBeVisible();

    // Espera a que termine el fade-in (300 ms) para pulsar con margen.
    await page.waitForTimeout(450);
    await expect(toast).toHaveClass(/--visible/);
    await toast.click();

    // Cierra con su fade-out sin esperar los ~4 s de auto-cierre.
    await expect(toast).toBeHidden({ timeout: 1500 });
  });

  test("pulsar durante el fade-in de entrada no lo cierra", async ({ page }) => {
    // Reloj simulado y pausado: control exacto de las fases del mensaje.
    await page.clock.install();
    await page.clock.pauseAt(new Date(Date.now() + 5000));
    await freshPage(page, "/");

    await themeButton(page).click();
    const toast = page.getByTestId("theme-toast");
    await expect(toast).toBeVisible();
    await expect(toast).toHaveClass(/--apareciendo/);

    // 100 ms: sigue dentro del fade-in de 300 ms; el pulso no debe cerrarlo.
    await page.clock.fastForward(100);
    await toast.click();
    await expect(toast).toHaveClass(/--apareciendo/);

    // Al completar los 300 ms pasa a visible (el pulso anterior lo ignoró).
    await page.clock.fastForward(250);
    await expect(toast).toHaveClass(/--visible/);

    // Y entonces un pulso sí lo cierra, con su fade-out.
    await toast.click();
    await expect(toast).toHaveClass(/--desapareciendo/);
    await page.clock.fastForward(350);
    await expect(toast).toHaveCount(0);
  });

  test("con movimiento reducido aparece y se cierra sin animación", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await freshPage(page, "/");

    await themeButton(page).click();
    const toast = page.getByTestId("theme-toast");
    await expect(toast).toBeVisible();
    await expect(toast).toHaveCSS("animation-name", "none");

    await expect(toast).toBeHidden({ timeout: 7000 });
  });
});
