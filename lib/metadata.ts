import type { Metadata } from "next";

import { getDictionary } from "./dictionaries";
import { defaultLocale, localizedPath, type Locale } from "./i18n";

const metadataKeys = {
  home: "homeTitle",
  cv: "cvTitle",
  portfolio: "portfolioTitle",
  interests: "interestsTitle",
  contact: "contactTitle",
} as const;

const routePaths = {
  home: "/",
  cv: "/cv",
  portfolio: "/portafolio",
  interests: "/intereses",
  contact: "/contacto",
} as const;

export function pageMetadata(locale: Locale, page: keyof typeof metadataKeys): Metadata {
  const dictionary = getDictionary(locale);
  const path = routePaths[page];
  const title = dictionary.metadata[metadataKeys[page]];
  const languages = Object.fromEntries(
    (["es", "en", "pt"] as const).map((language) => [
      language,
      localizedPath(language, path),
    ]),
  );

  return {
    title: `${title} | Tinexlab`,
    description: dictionary.metadata.siteDescription,
    alternates: {
      canonical: localizedPath(locale, path),
      languages: { ...languages, "x-default": localizedPath(defaultLocale, path) },
    },
    openGraph: {
      title: `${title} | Tinexlab`,
      description: dictionary.metadata.siteDescription,
      url: localizedPath(locale, path),
      siteName: "Tinexlab",
      locale,
      type: "website",
    },
  };
}
