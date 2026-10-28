import type { MetadataRoute } from "next";

import { localizedPath, locales, sectionPaths } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tinexlab.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return sectionPaths.flatMap((section) =>
    locales.map((locale) => ({
      url: new URL(localizedPath(locale, section.path), siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: section.path === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alternate) => [
            alternate,
            new URL(localizedPath(alternate, section.path), siteUrl).toString(),
          ]),
        ),
      },
    })),
  );
}
