import Image from "next/image";
import Link from "next/link";

import { getDictionary } from "@/lib/dictionaries";
import { localizedPath, type Locale } from "@/lib/i18n";

// Panel de la página de error 404. El locale llega como prop desde el
// boundary que lo renderiza: los archivos not-found no reciben params en
// Next 16, y en esta app el boundary de la raíz es el único que se activa
// (ver design.md D1/D2).
export function NotFoundPanel({ locale }: { locale: Locale }) {
  const { notFound } = getDictionary(locale);

  return (
    <section
      data-testid="not-found-panel"
      className="flex flex-1 flex-col items-center justify-center gap-7 py-10 text-center"
    >
      <Image
        src="/404.jpg"
        alt={notFound.imageAlt}
        width={982}
        height={551}
        priority
        className="h-auto w-full max-w-[982px] rounded-3xl"
      />
      <h1 className="text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl">
        {notFound.title}
      </h1>
      <p className="max-w-2xl text-lg leading-8 text-muted">{notFound.message}</p>
      <Link href={localizedPath(locale, "/")} className="btn btn-primary min-h-12 px-6">
        {notFound.backHome}
      </Link>
    </section>
  );
}
