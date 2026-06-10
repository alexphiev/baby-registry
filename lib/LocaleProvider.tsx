"use client";

import { LocaleContext, useLocaleInit, type Locale } from "./i18n";

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const value = useLocaleInit(initialLocale);
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}
