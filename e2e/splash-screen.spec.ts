import { expect, test, type Page } from "@playwright/test";

// Retrasa la descarga de la propia imagen del splash (eager, parte del
// evento `load`) para que la señal `load` tarde y el ciclo completo sea
// observable de forma determinista; JS y CSS no se tocan (la hidratación
// no se retrasa).
async function delayLoad(page: Page, ms: number) {
  await page.route(/inicio\.png/, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
    await route.continue().catch(() => {});
  });
}

test.describe("splash screen de carga", () => {
  test.use({ locale: "es-MX" });

  test("primera visita: muestra inicio.png, avanza sin retroceder y desaparece solo", async ({
    page,
  }) => {
    // El HTML inicial del servidor (sin ejecutar JS) arranca en 0 %.
    const ssr = await page.request.get("/es");
    expect(await ssr.text()).toMatch(
      /data-testid="splash-progress"[^>]*>0(?:<!-- -->)? %</,
    );

    await delayLoad(page, 1500);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const splash = page.getByTestId("splash-screen");
    await expect(splash).toBeVisible();

    // Trazo de fases y porcentaje, instalado sobre el markup del servidor
    // antes de la hidratación: cubre la entrada con fade-in, el remate a
    // 100 % y la salida con fade-out.
    const entryAnimation = await page.evaluate(() => {
      const trace: { cls: string; progress: string }[] = [];
      const read = () => {
        const el = document.querySelector('[data-testid="splash-screen"]');
        trace.push({
          cls: el?.className ?? "",
          progress:
            el?.querySelector('[data-testid="splash-progress"]')
              ?.textContent ?? "",
        });
      };
      read();
      const splash = document.querySelector('[data-testid="splash-screen"]');
      if (splash) {
        new MutationObserver(read).observe(splash, {
          attributes: true,
          attributeFilter: ["class"],
          subtree: true,
          childList: true,
        });
      }
      (
        window as unknown as { __splashTrace: typeof trace }
      ).__splashTrace = trace;
      return splash ? getComputedStyle(splash).animationName : "";
    });
    // El markup del servidor entra con la animación de aparición.
    expect(entryAnimation).toBe("splash-fade-in");

    // La imagen de bienvenida es public/inicio.png (decorativa: alt vacío).
    // En producción src pasa por el optimizador: `url=%2Finicio.png`.
    await expect(splash.locator("img")).toHaveAttribute("src", /inicio\.png/);
    await expect(splash.locator("img")).toHaveAttribute("alt", "");
    // Capa decorativa aria-hidden: no participa en el árbol de accesibilidad.
    await expect(splash).toHaveAttribute("aria-hidden", "true");

    // Mientras el splash está visible: el porcentaje es entero con símbolo
    // "%", nunca retrocede y la imagen de bienvenida termina de cargarse.
    const samples: { percent: number; naturalWidth: number }[] = [];
    for (let i = 0; i < 15; i++) {
      const snap = await page.evaluate(() => {
        const splash = document.querySelector('[data-testid="splash-screen"]');
        if (!splash) return null;
        const text =
          splash
            .querySelector('[data-testid="splash-progress"]')
            ?.textContent ?? "";
        const img = splash.querySelector("img") as HTMLImageElement | null;
        return { text, percent: parseInt(text, 10), naturalWidth: img?.naturalWidth ?? 0 };
      });
      if (snap === null) break;
      expect(snap.text).toMatch(/^\d+ %$/);
      expect(Number.isInteger(snap.percent)).toBe(true);
      samples.push(snap);
      await page.waitForTimeout(120);
    }
    expect(samples.length).toBeGreaterThanOrEqual(3);
    for (let i = 1; i < samples.length; i++) {
      expect(samples[i].percent).toBeGreaterThanOrEqual(samples[i - 1].percent);
    }
    // Deja el 0 % inicial: el progreso avanzó de verdad.
    expect(samples[samples.length - 1].percent).toBeGreaterThan(
      samples[0].percent,
    );
    // La imagen de bienvenida (inicio.png) se cargó durante la transición.
    expect(samples.some((s) => s.naturalWidth > 0)).toBe(true);

    // Se oculta sola al terminar la carga y el contenido queda visible.
    await expect(splash).toBeHidden({ timeout: 12000 });
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();

    // Trazo completo: entró con `splash--apareciendo`, avanzó en
    // `splash--cargando` y salió con `splash--desapareciendo`.
    const trace = await page.evaluate(
      () =>
        (
          window as unknown as {
            __splashTrace: { cls: string; progress: string }[];
          }
        ).__splashTrace,
    );
    const classes = trace.map((s) => s.cls);
    expect(classes.some((c) => c.includes("splash--apareciendo"))).toBe(true);
    expect(classes.some((c) => c.includes("splash--cargando"))).toBe(true);
    expect(classes.some((c) => c.includes("splash--desapareciendo"))).toBe(
      true,
    );
    // El remate con la señal `load` lleva el indicador a 100 % antes de salir.
    const lastProgress = [...trace]
      .reverse()
      .find((s) => s.progress.includes("%"));
    expect(lastProgress?.progress).toContain("100 %");
  });

  test("recarga dentro de la misma sesión no vuelve a mostrar el splash", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Primera visita: el splash aparece y termina de ocultarse solo.
    const splash = page.getByTestId("splash-screen");
    await expect(splash).toBeVisible();
    await expect(splash).toBeHidden({ timeout: 12000 });

    // La bandera de sesión quedó escrita.
    expect(
      await page.evaluate(() =>
        window.sessionStorage.getItem("tinexlab-splash-seen"),
      ),
    ).not.toBeNull();

    // Recarga en la misma sesión: el script pre-paint lo oculta antes del
    // primer pintado y la hidratación lo desmonta; el contenido se ve directo.
    await page.reload();
    await expect(splash).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    // Se mantiene oculto incluso después de la hidratación.
    await page.waitForTimeout(700);
    await expect(splash).toBeHidden();
  });

  test("cierre garantizado: se oculta antes de 8 s aunque la carga no señale", async ({
    page,
  }) => {
    // La señal `load` no llega a tiempo: la imagen del splash tarda 9 s.
    await page.route(/inicio\.png/, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 9000));
      await route.continue().catch(() => {});
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const splash = page.getByTestId("splash-screen");
    await expect(splash).toBeVisible();

    // Instante exacto (reloj de la página) en que el splash desaparece del
    // DOM: el tope duro (desde el inicio de la navegación, ≈ aparición)
    // fuerza remate y fade-out sin esperar `load`.
    const goneAtPromise = page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          const timer = window.setInterval(() => {
            if (!document.querySelector('[data-testid="splash-screen"]')) {
              window.clearInterval(timer);
              resolve(performance.now());
            }
          }, 50);
        }),
    );
    await expect(splash).toBeHidden({ timeout: 7800 });
    const goneAt = await goneAtPromise;
    expect(goneAt).toBeLessThan(8000);
  });

  test("con movimiento reducido aparece y desaparece sin animación de opacidad", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    // Ventana observable del progreso antes de que `load` llegue.
    await delayLoad(page, 1500);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const splash = page.getByTestId("splash-screen");
    await expect(splash).toBeVisible();
    // Sin transición de opacidad: CSS desactiva las animaciones del splash.
    await expect(splash).toHaveCSS("animation-name", "none");

    // El indicador sigue actualizando su valor (sin animaciones).
    const first = await page.getByTestId("splash-progress").textContent();
    await page.waitForTimeout(600);
    const later = await page.getByTestId("splash-progress").textContent();
    expect(parseInt(later ?? "", 10)).toBeGreaterThan(
      parseInt(first ?? "", 10),
    );

    // Aparece y desaparece de forma inmediata al completar la carga.
    await expect(splash).toBeHidden({ timeout: 12000 });
  });

  // Viewports de la spec: móvil pequeño (360 px) y escritorio (1440 px).
  const viewportCases = [
    { name: "móvil 360px", width: 360, height: 740 },
    { name: "escritorio 1440px", width: 1440, height: 900 },
  ];

  for (const { name, width, height } of viewportCases) {
    test(`responsivo (${name}): sin scroll horizontal, imagen sin distorsión y porcentaje abajo-izquierda`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height });
      // Mantiene el splash visible el tiempo suficiente para medirlo.
      await delayLoad(page, 2000);
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const splash = page.getByTestId("splash-screen");
      await expect(splash).toBeVisible();

      // Porcentaje anclado abajo-izquierda (1rem de margen, con tolerancia)
      // y legible: visible, cifras tabulares y cuerpo mínimo de 1rem.
      const progress = page.getByTestId("splash-progress");
      await expect(progress).toBeVisible();
      const progBox = await progress.boundingBox();
      expect(progBox).not.toBeNull();
      expect(progBox!.x).toBeLessThanOrEqual(24);
      expect(progBox!.y + progBox!.height).toBeGreaterThanOrEqual(height - 40);
      await expect(progress).toHaveCSS("font-variant-numeric", /tabular-nums/);
      const fontSize = await progress.evaluate(
        (el) => parseFloat(getComputedStyle(el).fontSize),
      );
      expect(fontSize).toBeGreaterThanOrEqual(16);

      // Espera a que inicio.png termine de cargarse: antes de load la caja
      // del <img> es 0 × 0 (sin tamaño intrínseco) y no hay nada que medir.
      await page.waitForFunction(() => {
        const img = document.querySelector(
          '[data-testid="splash-screen"] img',
        ) as HTMLImageElement | null;
        return Boolean(img && img.complete && img.naturalWidth > 0);
      });

      // Sin scroll horizontal: el documento no desborda el ancho del viewport
      // tampoco con la imagen ya cargada y ajustada.
      const overflow = await page.evaluate(
        () =>
          document.scrollingElement!.scrollWidth -
          document.scrollingElement!.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);

      // Imagen ajustada al viewport sin deformarse: cabe completa y conserva
      // su relación de aspecto natural (1180 × 884 ≈ 1.335).
      const imgBox = await splash.locator("img").boundingBox();
      expect(imgBox).not.toBeNull();
      expect(imgBox!.width).toBeLessThanOrEqual(width);
      expect(imgBox!.height).toBeLessThanOrEqual(height);
      const displayedRatio = imgBox!.width / imgBox!.height;
      expect(Math.abs(displayedRatio - 1180 / 884)).toBeLessThan(0.02);

      await expect(splash).toBeHidden({ timeout: 12000 });
    });
  }

  test("teclado: sin elementos enfocables en el splash y el foco no entra al overlay", async ({
    page,
  }) => {
    await delayLoad(page, 2000);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const splash = page.getByTestId("splash-screen");
    await expect(splash).toBeVisible();

    // El overlay no tiene elementos enfocables (es decorativo, aria-hidden).
    expect(
      await splash
        .locator('a, button, input, select, textarea, [tabindex]')
        .count(),
    ).toBe(0);

    // Montar el splash no roba el foco: sigue en el cuerpo de la página.
    expect(
      await page.evaluate(() => document.activeElement?.tagName),
    ).toBe("BODY");

    // Con tabulación el foco nunca llega a entrar al splash.
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Tab");
      const insideSplash = await page.evaluate(() =>
        Boolean(
          document.activeElement?.closest('[data-testid="splash-screen"]'),
        ),
      );
      expect(insideSplash).toBe(false);
    }

    // Una vez desaparecido, los controles del sitio son alcanzables con Tab.
    await expect(splash).toBeHidden({ timeout: 12000 });
    await page.evaluate(() =>
      (document.activeElement as HTMLElement | null)?.blur(),
    );
    let focusedTag = "";
    for (let i = 0; i < 10 && focusedTag === ""; i++) {
      await page.keyboard.press("Tab");
      focusedTag = await page.evaluate(() => {
        const el = document.activeElement;
        return el && el !== document.body ? el.tagName.toLowerCase() : "";
      });
    }
    expect(focusedTag).toMatch(/^(a|button)$/);
  });

  test("porcentaje legible en ambos temas: usa los tokens de color vigentes", async ({
    page,
  }) => {
    await delayLoad(page, 1500);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const splash = page.getByTestId("splash-screen");
    const progress = page.getByTestId("splash-progress");
    await expect(progress).toBeVisible();

    const colors = () =>
      progress.evaluate((el) => ({
        text: getComputedStyle(el).color,
        background: getComputedStyle(
          document.querySelector('[data-testid="splash-screen"]')!,
        ).backgroundColor,
      }));

    // Tema claro: texto casi negro sobre fondo casi blanco (≈17:1).
    const light = await colors();
    expect(light.text).toBe("rgb(23, 23, 23)"); // --foreground (#171717)
    expect(light.background).toBe("rgb(254, 254, 254)"); // --background

    // Tema oscuro: texto casi blanco sobre negro (≈18:1). El indicador
    // responde a los tokens del tema sin perder contraste.
    await page.evaluate(() =>
      document.documentElement.setAttribute("data-theme", "dark"),
    );
    const dark = await colors();
    expect(dark.text).toBe("rgb(237, 237, 237)"); // --foreground (#ededed)
    expect(dark.background).toBe("rgb(0, 0, 0)"); // --background (#000000)
    expect(dark.text).not.toBe(light.text);

    await expect(splash).toBeHidden({ timeout: 12000 });
  });
});
