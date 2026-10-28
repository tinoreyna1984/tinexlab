"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { Locale, SectionKey } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

type NavigationItem = { path: string; key: SectionKey; label: string };
const desktopBreakpoint = 1024;

export function SiteHeader({
  lang,
  labels,
  localeLabels,
  themeLabel,
  navigation,
}: {
  lang: Locale;
  labels: { menu: string; close: string; brand: string };
  localeLabels: Record<Locale, string>;
  themeLabel: string;
  navigation: NavigationItem[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const desktopQuery = window.matchMedia(`(min-width: ${desktopBreakpoint}px)`);
    const syncViewport = (desktop: boolean) => {
      setIsDesktop(desktop);
      if (desktop) setMenuOpen(false);
    };
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      syncViewport(event.matches);
    };
    const handleResize = () => syncViewport(window.innerWidth >= desktopBreakpoint);

    syncViewport(desktopQuery.matches);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", handleBreakpointChange);
    } else {
      desktopQuery.addListener(handleBreakpointChange);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (typeof desktopQuery.removeEventListener === "function") {
        desktopQuery.removeEventListener("change", handleBreakpointChange);
      } else {
        desktopQuery.removeListener(handleBreakpointChange);
      }
    };
  }, []);

  const mobileMenuOpen = !isDesktop && menuOpen;

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const currentPath =
    lang === "es"
      ? pathname || "/"
      : pathname?.replace(new RegExp(`^/${lang}`), "") || "/";
  const localeOptions = (Object.keys(localeLabels) as Locale[]).map((locale) => ({
    value: locale,
    label: localeLabels[locale],
    href: localizedPath(locale, currentPath),
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href={localizedPath(lang)}
          className="group inline-flex items-center gap-2 font-mono text-lg font-bold tracking-tight text-foreground"
          onClick={closeMenu}
        >
          <Image
            src="/tinexlab-logo.png"
            alt=""
            width={96}
            height={96}
            className="size-8 sm:size-9 aspect-square object-contain rounded-lg transition-transform group-hover:rotate-6"
          />
          <span className="title-neon">{labels.brand}</span>
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          data-testid="menu-toggle"
          className="btn btn-secondary btn-compact gap-2 lg:hidden"
          onClick={() => {
            if (!isDesktop) setMenuOpen((open) => !open);
          }}
          aria-expanded={mobileMenuOpen}
          aria-controls="site-navigation"
        >
          <span aria-hidden="true">{mobileMenuOpen ? "X" : "☰"}</span>
        </button>

        <div
          id="site-navigation"
          data-testid="site-navigation"
          data-open={mobileMenuOpen}
          aria-hidden={isDesktop ? undefined : !mobileMenuOpen}
          inert={!isDesktop && !mobileMenuOpen}
          className="site-nav-panel lg:!static lg:!flex lg:!items-center lg:!gap-5 lg:!border-0 lg:!bg-transparent lg:!p-0 lg:!shadow-none"
        >
          <nav aria-label="Navegación principal">
            <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-5">
              {navigation.map((item) => {
                const href = localizedPath(lang, item.path);
                const active = currentPath === item.path;
                return (
                  <li key={item.key}>
                    <Link
                      href={href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-surface-muted hover:text-accent ${active ? "text-accent" : "text-muted"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4 lg:mt-0 lg:border-0 lg:pt-0">
            <LocaleSwitcher
              label="Seleccionar idioma"
              current={lang}
              options={localeOptions}
            />
            <ThemeToggle label={themeLabel} />
          </div>
        </div>
      </div>
    </header>
  );
}
