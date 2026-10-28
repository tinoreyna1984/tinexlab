import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

import { PageContainer } from "@/components/page-container";
import { PageFallback } from "@/components/page-fallback";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return pageMetadata(isLocale(lang) ? lang : "es", "home");
}

export default function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <HomePageContent params={params} />
    </Suspense>
  );
}

async function HomePageContent({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "es") as Locale;
  const dictionary = getDictionary(locale);
  const { home } = dictionary;

  return (
    <PageContainer>
      <section className="grid gap-12 py-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-16">
        <div>
          <p className="mb-5 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {home.eyebrow}
          </p>
          <h1 className="title-neon max-w-3xl text-5xl font-bold tracking-[-0.04em] text-foreground sm:text-7xl">
            {home.title}
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-muted">{home.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={localizedPath(locale, "/cv")}
              className="btn btn-primary min-h-12 px-6"
            >
              {home.ctaCv}
            </Link>
            <Link
              href={localizedPath(locale, "/portafolio")}
              className="btn btn-secondary min-h-12 px-6"
            >
              {home.ctaPortfolio}
            </Link>
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-muted">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            {home.availability}
          </p>
        </div>

        <aside className="rounded-3xl border border-border bg-surface p-6 shadow-xl shadow-black/5 sm:p-8">
          <div className="mb-8">
            <span className="rounded-full bg-surface-muted px-3 py-1 font-mono text-xs text-accent">
              {home.role}
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 sm:items-start">
            <Image
              src="/bio.jpg"
              alt={home.bioImageAlt}
              width={960}
              height={959}
              sizes="(min-width: 640px) 25vw, 90vw"
              className="aspect-square w-full rounded-3xl object-cover"
            />
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="text-muted">{home.location}</dt>
                <dd className="mt-1 font-medium text-foreground">{home.email}</dd>
              </div>
              <div>
                <dt className="text-muted">{home.phone}</dt>
                <dd className="mt-1 font-medium text-foreground">{home.role}</dd>
              </div>
            </dl>
          </div>
          <Link
            href={localizedPath(locale, "/contacto")}
            className="mt-8 inline-flex font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
          >
            {home.ctaContact} <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </aside>
      </section>

      <section className="mt-16 border-t border-border pt-10" aria-labelledby="highlights-title">
        <SectionHeading title={home.highlightsTitle} />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["15+", home.yearsLabel],
            ["19", home.projectsLabel],
            [home.techValue, home.techLabel],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-2xl font-bold text-accent">{value}</p>
              <p className="mt-2 text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
