import Image from "next/image";
import { Suspense } from "react";

import { PageFallback } from "@/components/page-fallback";
import { PageContainer } from "@/components/page-container";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return pageMetadata(isLocale(lang) ? lang : "es", "interests");
}

export default function InterestsPage({ params }: { params: Promise<{ lang: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <InterestsPageContent params={params} />
    </Suspense>
  );
}

async function InterestsPageContent({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "es") as Locale;
  const { interests } = getDictionary(locale);

  return (
    <PageContainer>
      <SectionHeading eyebrow={interests.eyebrow} title={interests.title} description={interests.description} />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {interests.items.map((item) => (
          <article key={item.title} className="overflow-hidden rounded-3xl border border-border bg-surface">
            <div className="relative aspect-[4/3] bg-surface-muted">
              <Image src={item.image} alt={item.alt} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
              <p className="mt-3 leading-7 text-muted">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </PageContainer>
  );
}
