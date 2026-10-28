"use client";

import type { Locale } from "@/lib/i18n";

type LocaleOption = { value: Locale; label: string; href: string };

export function LocaleSwitcher({
  label,
  current,
  options,
}: {
  label: string;
  current: Locale;
  options: LocaleOption[];
}) {
  return (
    <label className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border px-3 text-sm font-medium text-foreground">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">文</span>
      <select
        className="cursor-pointer appearance-none bg-transparent font-medium outline-none"
        value={current}
        onChange={(event) => {
          const option = options.find(({ value }) => value === event.target.value);
          if (option) window.location.assign(option.href);
        }}
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
