import type { Metadata } from "next";
import { headers } from "next/headers";

import { LocaleShell } from "@/components/locale-shell";
import { NotFoundPanel } from "@/components/not-found-panel";
import { PageContainer } from "@/components/page-container";
import { isLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Página no encontrada | Tinexlab",
};

// El 404 depende del header x-locale de la petición: se permite render
// bloqueante (sin shell estático) en lugar de envolver headers() en Suspense
// con un fallback que duplicaría el panel en el DOM.
export const instant = false;

// El 404 se resuelve aquí: en esta app (cacheComponents + layout de idioma
// con Suspense) los boundaries not-found de segmento no llegan a activarse,
// así que el boundary de la raíz es el único que renderiza. El proxy adjunta
// x-locale a la petición (reescrita o directa) para localizar el chrome y
// los textos; sin header, se usa español como idioma de respaldo.
export default async function NotFound() {
  const requestedLocale = (await headers()).get("x-locale");
  const locale: Locale =
    requestedLocale !== null && isLocale(requestedLocale) ? requestedLocale : "es";

  return (
    <LocaleShell locale={locale}>
      <PageContainer>
        <NotFoundPanel locale={locale} />
      </PageContainer>
    </LocaleShell>
  );
}
