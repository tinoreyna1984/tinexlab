export const locales = ["es", "en", "pt"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, path = "/") {
  const normalizedPath = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return locale === defaultLocale
    ? normalizedPath
    : `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export const sectionPaths = [
  { path: "/", key: "home" },
  { path: "/cv", key: "cv" },
  { path: "/portafolio", key: "portfolio" },
  { path: "/intereses", key: "interests" },
  { path: "/contacto", key: "contact" },
] as const;

export type SectionKey = (typeof sectionPaths)[number]["key"];
