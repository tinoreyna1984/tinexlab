import Link from "next/link";

import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

export function SiteFooter({
  lang,
  copyright,
  links,
}: {
  lang: Locale;
  copyright: string;
  links: { label: string; path: string }[];
}) {
  const currentYear = new Date().getFullYear().toString();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>{copyright.replace("{year}", currentYear)}</p>
        <nav aria-label="Enlaces del pie de página">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  href={localizedPath(lang, link.path)}
                  className="underline-offset-4 hover:text-accent hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
