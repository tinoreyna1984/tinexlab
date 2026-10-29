"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type LocalizedProject = {
  slug: string;
  title: string;
  description: string;
  tags: { slug: string; label: string }[];
  year: string;
  repo?: string;
  site?: string;
  image: string;
};

export function PortfolioGrid({
  projects,
  tags,
  labels,
}: {
  projects: LocalizedProject[];
  tags: { slug: string; label: string }[];
  labels: {
    filterLabel: string;
    all: string;
    clear: string;
    noResults: string;
    repo: string;
    site: string;
    year: string;
    technologies: string;
    projectImageAlt: string;
  };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = (searchParams.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const filteredProjects =
    selected.length === 0
      ? projects
      : projects.filter((project) => selected.every((tag) => project.tags.some((item) => item.slug === tag)));

  function updateTags(next: string[]) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.length) params.set("tags", next.join(","));
    else params.delete("tags");
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }

  function toggleTag(tag: string) {
    updateTags(selected.includes(tag) ? selected.filter((item) => item !== tag) : [...selected, tag]);
  }

  return (
    <div>
      <fieldset className="portfolio-filters rounded-3xl border border-border bg-surface p-5 md:p-6">
        <legend className="px-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">{labels.filterLabel}</legend>
        <div className="mt-2 flex flex-wrap gap-2.5" role="group" aria-label={labels.filterLabel}>
          <button
            type="button"
            onClick={() => updateTags([])}
            aria-pressed={selected.length === 0}
            className="filter-chip btn btn-compact btn-primary w-auto"
          >
            {labels.all}
          </button>
          {tags.map((tag) => {
            const active = selected.includes(tag.slug);
            return (
              <button
                key={tag.slug}
                type="button"
                onClick={() => toggleTag(tag.slug)}
                aria-pressed={active}
                className="filter-chip btn btn-compact btn-secondary w-auto"
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="results-count text-sm text-muted" aria-live="polite">
          <span className="font-mono text-lg font-bold text-foreground">{filteredProjects.length}</span> / {projects.length}
        </p>
        {selected.length > 0 ? (
            <button type="button" onClick={() => updateTags([])} className="filter-clear text-sm font-semibold text-accent underline underline-offset-4">
            {labels.clear}
          </button>
        ) : null}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center text-muted">
          {labels.noResults}
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article key={project.slug} className="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
              <div className="relative aspect-[16/10] bg-surface-muted">
                <Image src={project.image} alt={`${labels.projectImageAlt}: ${project.title}`} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold text-foreground">{project.title}</h2>
                  <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">{project.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={labels.technologies}>
                  {project.tags.map((tag) => <li key={tag.slug} className="rounded-full bg-surface-muted px-2.5 py-1 text-xs text-muted">{tag.label}</li>)}
                </ul>
                <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-4 text-sm font-semibold">
                  {project.repo ? <Link href={project.repo} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{labels.repo} <span aria-hidden="true">↗</span></Link> : null}
                  {project.site ? <Link href={project.site} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{labels.site} <span aria-hidden="true">↗</span></Link> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
