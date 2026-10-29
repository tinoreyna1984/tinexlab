import Link from "next/link";
import { Suspense } from "react";

import { PageFallback } from "@/components/page-fallback";
import { PageContainer } from "@/components/page-container";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const socialLinks = [
  ["LinkedIn", "https://www.linkedin.com/in/tinoreyna1984", "linkedin"],
  ["Instagram", "https://www.instagram.com/tinoreyna1984", "instagram"],
  ["X", "https://twitter.com/tinoreyna1984", "x"],
  ["Facebook", "https://www.facebook.com/tinoreyna1984", "facebook"],
  ["GitHub", "https://github.com/tinoreyna1984", "github"],
] as const;

type SocialIconName = (typeof socialLinks)[number][2];

function SocialIcon({ name }: { name: SocialIconName }) {
  const paths: Record<SocialIconName, string> = {
    linkedin: "M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4.5v13H.5V8Zm7 0h4.3v1.78h.06c.6-1.13 2.07-2.28 4.26-2.28 4.56 0 5.4 3 5.4 6.9V21h-4.5v-5.85c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V21H7.5V8Z",
    instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 12 16.5a4.5 4.5 0 0 1 0-9Zm0 2A2.5 2.5 0 1 0 12 14.5a2.5 2.5 0 0 0 0-5ZM17.5 6a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z",
    x: "M4 3h4.6l3.7 5.25L16.8 3H20l-6.2 7.1L20.5 21h-4.6l-4.1-5.85L6.6 21H3.4l6.4-7.7L4 3Zm4.1 2 8.8 14h1.2L9.3 5H8.1Z",
    facebook: "M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.87.24-1.46 1.5-1.46h1.7V4a22 22 0 0 0-2.48-.13c-2.45 0-4.13 1.5-4.13 4.25V10H7.3v3h2.8v8h3.4Z",
    github: "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.2c-3.22.7-3.9-1.37-3.9-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.72 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.47.12-3.06 0 0 .98-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.18-1.49 3.16-1.18 3.16-1.18.64 1.59.24 2.76.12 3.06.75.81 1.2 1.84 1.2 3.1 0 4.45-2.7 5.42-5.28 5.7.42.36.78 1.08.78 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z",
  };

  return (
    <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24" focusable="false">
      <path d={paths[name]} />
    </svg>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return pageMetadata(isLocale(lang) ? lang : "es", "contact");
}

export default function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <ContactPageContent params={params} />
    </Suspense>
  );
}

async function ContactPageContent({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "es") as Locale;
  const { contact, home } = getDictionary(locale);

  return (
    <PageContainer>
      <SectionHeading eyebrow={contact.eyebrow} title={contact.title} description={contact.description} />
      <div className="mt-12 rounded-3xl border border-border bg-surface p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] md:items-stretch md:gap-10 lg:gap-16">
          <section className="flex min-w-0 flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">{contact.emailLabel}</p>
            <a href="mailto:tinoreyna1984@gmail.com" className="mt-4 break-words text-[clamp(1.5rem,4vw,2.75rem)] font-semibold leading-tight text-accent underline decoration-accent/40 underline-offset-8 transition hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              tinoreyna1984@gmail.com
            </a>
            <p className="mt-5 max-w-xl text-sm leading-6 text-muted">{contact.emailInstructions}</p>
          </section>

          <aside className="min-w-0 border-t border-border pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <h2 className="text-xl font-semibold text-foreground">{contact.social}</h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map(([label, href, icon]) => (
                <li key={label}>
                  <Link href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                    <SocialIcon name={icon} />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="https://wa.link/o4xl2a" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex max-w-full font-semibold text-accent underline underline-offset-4 hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              <span className="break-words">{contact.whatsapp}</span> <span aria-hidden="true" className="ml-2 shrink-0">↗</span>
            </Link>
            <div className="mt-8 rounded-2xl bg-surface-muted p-5 text-sm text-muted">
              <p className="font-semibold text-foreground">{home.email}</p>
              <p className="mt-2">{home.phone}</p>
            </div>
          </aside>
        </div>
      </div>
    </PageContainer>
  );
}
