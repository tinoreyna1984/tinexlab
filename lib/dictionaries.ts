import "server-only";

import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";
import pt from "./dictionaries/pt.json";
import type { Locale } from "./i18n";

export type Dictionary = typeof es;

const dictionaries: Record<Locale, Dictionary> = { es, en, pt };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
