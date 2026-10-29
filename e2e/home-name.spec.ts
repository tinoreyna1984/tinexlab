import { test, expect } from "@playwright/test";

for (const locale of ["es", "en", "pt"]) {
  test(`muestra la identidad en ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);

    const eyebrow = page.locator("main p").filter({ hasText: /ingeniero|engineer|engenheiro/i }).first();
    const name = page.getByRole("heading", { name: "Tino Reyna", exact: true });
    const title = page.locator("h1").first();

    await expect(name).toBeVisible();
    await expect(name).toHaveText("Tino Reyna");
    await expect(page.getByRole("link", { name: /CV|experiencia|experience/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /portafolio|portfolio|portfólio/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /contacto|contact|contato|hablemos|talk/i }).first()).toBeVisible();

    const order = await page.evaluate(({ eyebrowText, nameText, titleText }) => {
      const text = document.querySelector("main")?.textContent ?? "";
      return text.indexOf(eyebrowText) < text.indexOf(nameText) && text.indexOf(nameText) < text.indexOf(titleText);
    }, { eyebrowText: (await eyebrow.textContent()) ?? "", nameText: "Tino Reyna", titleText: (await title.textContent()) ?? "" });
    expect(order).toBe(true);
  });
}
