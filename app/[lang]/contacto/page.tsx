import Link from "next/link";
import { Suspense } from "react";

import { ContactForm } from "@/components/contact-form";
import { PageFallback } from "@/components/page-fallback";
import { PageContainer } from "@/components/page-container";
import { SectionHeading } from "@/components/section-heading";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const socialLinks = [
  ["LinkedIn", "https://www.linkedin.com/in/tinoreyna1984"],
  ["Instagram", "https://www.instagram.com/tinoreyna1984"],
  ["X", "https://twitter.com/tinoreyna1984"],
  ["Facebook", "https://www.facebook.com/tinoreyna1984"],
  ["GitHub", "https://github.com/tinoreyna1984"],
] as const;

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
      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_0.7fr] lg:gap-16">
        <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <ContactForm labels={contact} />
        </div>
        <aside className="lg:pt-4">
          <h2 className="text-xl font-semibold text-foreground">{contact.social}</h2>
          <ul className="mt-5 flex flex-wrap gap-3 lg:flex-col lg:items-start">
            {socialLinks.map(([label, href]) => (
              <li key={label}>
                <Link href={href} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition hover:border-accent hover:text-accent">
                  {label} <span aria-hidden="true" className="ml-2">↗</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="https://wa.link/o4xl2a" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex font-semibold text-accent underline underline-offset-4 hover:text-accent-strong">
            {contact.whatsapp} <span aria-hidden="true" className="ml-2">↗</span>
          </Link>
          <div className="mt-10 rounded-2xl bg-surface-muted p-5 text-sm text-muted">
            <p className="font-semibold text-foreground">{home.email}</p>
            <p className="mt-2">{home.phone}</p>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
