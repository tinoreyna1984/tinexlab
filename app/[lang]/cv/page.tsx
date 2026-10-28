import { Suspense } from "react";

import { PageFallback } from "@/components/page-fallback";
import { PageContainer } from "@/components/page-container";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return pageMetadata(isLocale(lang) ? lang : "es", "cv");
}

export default function CvPage({ params }: { params: Promise<{ lang: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <CvPageContent params={params} />
    </Suspense>
  );
}

async function CvPageContent({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "es") as Locale;
  const { cv } = getDictionary(locale);

  return (
    <PageContainer>
      <SectionHeading eyebrow={cv.eyebrow} title={cv.title} description={cv.description} />
      <p className="mt-5 text-sm text-muted">{cv.born}</p>

      <section className="mt-16" aria-labelledby="experience-title">
        <h2 id="experience-title" className="text-2xl font-bold text-foreground">{cv.experience}</h2>
        <div className="mt-8 space-y-5 border-l-2 border-accent/50 pl-5 sm:pl-8">
          {cv.work.map((item) => (
            <article key={`${item.company}-${item.period}`} className="relative rounded-2xl border border-border bg-surface p-5 sm:p-6">
              <span className="absolute -left-[2.05rem] top-7 size-3 rounded-full border-2 border-background bg-accent sm:-left-[2.55rem]" aria-hidden="true" />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-sm text-accent">{item.company}</p>
                  <h3 className="mt-1 text-xl font-semibold text-foreground">{item.role}</h3>
                </div>
                <p className="text-sm font-medium text-muted">{item.period}</p>
              </div>
              <p className="mt-2 text-sm text-muted">{item.location}</p>
              <p className="mt-4 leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="education-title">
        <h2 id="education-title" className="text-2xl font-bold text-foreground">{cv.education}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cv.educationItems.map((item) => (
            <article key={`${item.institution}-${item.period}`} className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-mono text-sm text-accent">{item.period}</p>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{item.degree}</h3>
              <p className="mt-2 text-sm text-muted">{item.institution}</p>
              <p className="mt-4 text-sm leading-6 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="skills-title">
        <h2 id="skills-title" className="text-2xl font-bold text-foreground">{cv.skills}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {(
            [
              { title: cv.frontend, skills: cv.skillsData.frontend },
              { title: cv.backend, skills: cv.skillsData.backend },
              { title: cv.management, skills: cv.skillsData.management },
              { title: cv.preferredTools, skills: cv.skillsData.tools },
              { title: cv.others, skills: cv.skillsData.others },
            ] as { title: string; skills: string[] }[]
          ).map(({ title, skills }) => (
            <div key={title} className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-semibold text-foreground">{title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li key={skill} className="rounded-full bg-surface-muted px-3 py-1.5 text-sm text-muted">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="rounded-2xl border border-accent/50 bg-accent/10 p-5">
            <h3 className="font-semibold text-foreground">{cv.preferredTechnologies}</h3>
            <p className="mt-4 text-lg font-semibold text-accent">{cv.preferredTechnologiesValue}</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-surface p-5">
          <h3 className="font-semibold text-foreground">{cv.languages}</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {cv.languagesData.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl bg-surface-muted px-4 py-3 text-sm">
                <span className="font-medium text-foreground">{item.name}</span>
                <span className="text-muted">{item.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
