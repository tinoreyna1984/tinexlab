import { Suspense } from "react";

import { PageFallback } from "@/components/page-fallback";
import { PageContainer } from "@/components/page-container";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { projectTags, projects } from "@/lib/projects";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return pageMetadata(isLocale(lang) ? lang : "es", "portfolio");
}

export default function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PortfolioPageContent params={params} />
    </Suspense>
  );
}

async function PortfolioPageContent({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "es") as Locale;
  const { portfolio } = getDictionary(locale);
  const localizedProjects = projects.map((project) => ({
    ...project,
    title: project.title[locale],
    description: project.description[locale],
    tags: project.tags
      .map((slug) => projectTags.find((tag) => tag.slug === slug))
      .filter((tag): tag is (typeof projectTags)[number] => Boolean(tag))
      .map((tag) => ({ slug: tag.slug, label: tag.label[locale] })),
  }));
  const localizedTags = projectTags.map((tag) => ({ slug: tag.slug, label: tag.label[locale] }));

  return (
    <PageContainer>
      <SectionHeading eyebrow={portfolio.eyebrow} title={portfolio.title} description={portfolio.description} />
      <div className="mt-12">
        <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-surface-muted" />}>
          <PortfolioGrid projects={localizedProjects} tags={localizedTags} labels={portfolio} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
