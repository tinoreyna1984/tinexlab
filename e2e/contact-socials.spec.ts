import { test, expect } from "@playwright/test";

const socials = [
  ["LinkedIn", "linkedin.com/in/tinoreyna1984"],
  ["Instagram", "instagram.com/tinoreyna1984"],
  ["X", "twitter.com/tinoreyna1984"],
  ["Facebook", "facebook.com/tinoreyna1984"],
  ["GitHub", "github.com/tinoreyna1984"],
] as const;

test.describe("redes sociales de contacto", () => {
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
