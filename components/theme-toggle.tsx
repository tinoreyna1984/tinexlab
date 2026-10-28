"use client";

import { useEffect, useSyncExternalStore } from "react";

export type ThemePreference = "system" | "light" | "dark";

export const storageKey = "tinexlab-theme";

function getPreference(): ThemePreference {
  if (typeof window === "undefined") return "system";
  const saved = window.localStorage.getItem(storageKey);
  return saved === "light" || saved === "dark" || saved === "system"
    ? saved
    : "system";
}

function subscribe(callback: () => void) {
  const listener = () => callback();
  window.addEventListener("storage", listener);
  window.addEventListener("tinexlab-theme-change", listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener("tinexlab-theme-change", listener);
  };
}

function applyTheme(preference: ThemePreference) {
  const isDark =
    preference === "dark" ||
    (preference === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
}

export function ThemeToggle({ label }: { label: string }) {
  const preference = useSyncExternalStore(
    subscribe,
    getPreference,
    (): ThemePreference => "system",
  );

  useEffect(() => {
    applyTheme(preference);
  }, [preference]);

  function cycleTheme() {
    const next: ThemePreference =
      preference === "system"
        ? "light"
        : preference === "light"
          ? "dark"
          : "system";

    window.localStorage.setItem(storageKey, next);
    applyTheme(next);
    window.dispatchEvent(new Event("tinexlab-theme-change"));
  }

  const icon = preference === "dark" ? "☾" : preference === "light" ? "☀" : "◐";
  const preferenceLabel =
    preference === "dark" ? "oscuro" : preference === "light" ? "claro" : "sistema";

  return (
    <button
      type="button"
      className="btn btn-secondary btn-compact gap-2"
      onClick={cycleTheme}
      aria-label={`${label}: ${preferenceLabel}. Cambiar tema`}
      title={`${label}: ${preferenceLabel}`}
    >
      <span aria-hidden="true" className="text-base">
        {icon}
      </span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
