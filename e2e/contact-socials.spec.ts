import { test, expect } from "@playwright/test";

const socials = [
  ["LinkedIn", "linkedin.com/in/tinoreyna1984"],
  ["Instagram", "instagram.com/tinoreyna1984"],
  ["X", "twitter.com/tinoreyna1984"],
  ["Facebook", "facebook.com/tinoreyna1984"],
  ["GitHub", "github.com/tinoreyna1984"],
] as const;

test.describe("redes sociales de contacto", () => {
  test("mantiene el contacto accesible y sin desbordamiento en todos los idiomas", async ({ page }) => {
    for (const locale of ["es", "en", "pt"]) {
      for (const viewport of [
        { width: 375, height: 800 },
        { width: 768, height: 900 },
        { width: 1280, height: 900 },
      ]) {
        await page.setViewportSize(viewport);
        await page.goto(`/${locale}/contacto`);
        await expect(page.getByRole("link", { name: "tinoreyna1984@gmail.com", exact: true }))
          .toHaveAttribute("href", "mailto:tinoreyna1984@gmail.com");
        await expect(page.getByRole("link", { name: /whatsapp/i })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      }
    }
  });

  test("expone el correo directo como enlace mailto", async ({ page }) => {
    await page.goto("/es/contacto");
    await expect(page.getByRole("link", { name: "tinoreyna1984@gmail.com", exact: true }))
      .toHaveAttribute("href", "mailto:tinoreyna1984@gmail.com");
  });

  for (const [name, destination] of socials) {
    test(`expone ${name} como enlace accesible`, async ({ page }) => {
      await page.goto("/es/contacto");
      const link = page.getByRole("link", { name, exact: true });
      await expect(link).toHaveAttribute("href", new RegExp(destination));
      await expect(link.locator("svg")).toHaveAttribute("aria-hidden", "true");
    });
  }

  test("conserva WhatsApp", async ({ page }) => {
    await page.goto("/es/contacto");
    await expect(page.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("href", "https://wa.link/o4xl2a");
  });
});
