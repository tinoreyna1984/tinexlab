import { test, expect } from "@playwright/test";

test.describe("portafolio", () => {
  test("muestra el catálogo y permite filtrar y limpiar", async ({ page }) => {
    await page.goto("/es/portafolio");
    await expect(page.locator("article")).toHaveCount(19);
    const react = page.getByRole("button", { name: "React", exact: true }).first();
    await react.click();
    await expect(react).toHaveAttribute("aria-pressed", "true");
    await expect(page).toHaveURL(/tags=react/);
    await expect(page.locator("article")).not.toHaveCount(19);
    await page.getByRole("button", { name: /limpiar/i }).click();
    await expect(page).not.toHaveURL(/tags=/);
    await expect(page.locator("article")).toHaveCount(19);
  });

  test("conserva la localización con el filtro activo", async ({ page }) => {
    await page.goto("/pt/portafolio?tags=react");
    await expect(page.getByRole("button", { name: "React", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("article")).not.toHaveCount(19);
  });
});
