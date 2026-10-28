import { expect, type Page } from "@playwright/test";

// Espera a que el splash de carga esté oculto (o sin montar) antes de
// interactuar con la página. En la primera visita de cada sesión del
// navegador el splash cubre la pantalla con `pointer-events: auto` mientras
// el sitio carga; cualquier prueba que toque la página debe esperar aquí
// para no quedar debajo del overlay. Tras esa primera navegación la bandera
// de sesión lo omite y la espera resuelve de inmediato.
export async function waitForSplashToHide(page: Page, timeout = 12_000) {
  // toBeHidden también resuelve si el elemento no existe en el DOM.
  await expect(page.getByTestId("splash-screen")).toBeHidden({ timeout });
}
