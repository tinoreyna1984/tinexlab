import { expect, test } from "@playwright/test";

for (const locale of ["es", "en", "pt"]) {
  test(`muestra el copyright dinámico y enlaces del footer en ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);

    const footer = page.locator("footer");
    const copyright = footer.locator("p");
    const currentYear = new Date().getFullYear().toString();

    await expect(footer).toBeVisible();
    await expect(copyright).toContainText(currentYear);
    await expect(footer.getByRole("link").first()).toBeVisible();
  });
}
