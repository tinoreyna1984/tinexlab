import { Suspense, type ReactNode } from "react";
import { notFound } from "next/navigation";

import { LocaleShell } from "@/components/locale-shell";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  return (
    <Suspense fallback={<LocaleShellFallback />}>
      <LocaleLayoutContent params={params}>{children}</LocaleLayoutContent>
    </Suspense>
  );
}

async function LocaleLayoutContent({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <LocaleShell locale={lang as Locale}>{children}</LocaleShell>;
}

function LocaleShellFallback() {
  return (
    <div className="flex min-h-screen flex-col" aria-busy="true" aria-label="Cargando">
      <div className="h-16 border-b border-border bg-background" />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="h-5 w-40 animate-pulse rounded bg-surface-muted" />
          <div className="mt-5 h-12 max-w-xl animate-pulse rounded bg-surface-muted" />
          <div className="mt-5 h-5 max-w-2xl animate-pulse rounded bg-surface-muted" />
        </div>
      </main>
    </div>
  );
}
