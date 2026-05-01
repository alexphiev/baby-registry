"use client";

import { useLocale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, t, setLocale } = useLocale();

  return (
    <button
      onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
      className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm border border-(--color-border) text-(--color-text-muted) hover:text-(--color-text) rounded-full px-3 py-1 text-sm font-medium shadow-sm transition-colors"
      aria-label="Switch language"
    >
      {t.lang.toggle}
    </button>
  );
}
