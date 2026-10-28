import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeToast } from "@/components/theme-toast";
import { getDictionary } from "@/lib/dictionaries";
import { sectionPaths, type Locale } from "@/lib/i18n";

// Chrome compartido del sitio (header, main, footer y toast de tema) para
// que el layout de idioma y la página de error 404 compongan exactamente
// la misma estructura sin duplicar lógica.
export function LocaleShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dictionary = getDictionary(locale);
  const navigation = sectionPaths.map((section) => ({
    ...section,
    label: dictionary.nav[section.key],
  }));
  const footerLinks = sectionPaths.slice(1).map((section) => ({
    path: section.path,
    label: dictionary.nav[section.key],
  }));

  return (
    <div lang={locale} className="flex min-h-screen flex-col">
      <SiteHeader
        lang={locale}
        labels={{
          menu: dictionary.nav.menu,
          close: dictionary.nav.close,
          brand: "Tinexlab",
        }}
        localeLabels={{ es: "Español", en: "English", pt: "Português" }}
        themeLabel={dictionary.nav.theme}
        navigation={navigation}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter lang={locale} copyright={dictionary.footer.copyright} links={footerLinks} />
      <ThemeToast labels={dictionary.themeToast} />
    </div>
  );
}
