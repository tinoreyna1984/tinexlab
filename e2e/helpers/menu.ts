import { expect, type Locator, type Page } from "@playwright/test";

export function menuControls(page: Page): {
  button: Locator;
  panel: Locator;
  links: Locator;
} {
  const panel = page.getByTestId("site-navigation");
  return {
    button: page.getByTestId("menu-toggle"),
    panel,
    links: panel.getByRole("link"),
  };
}

export async function expectMenuState(page: Page, open: boolean) {
  const { button, panel } = menuControls(page);
  await expect(button).toHaveAttribute("aria-expanded", String(open));
  await expect(panel).toHaveAttribute("data-open", String(open));
}
