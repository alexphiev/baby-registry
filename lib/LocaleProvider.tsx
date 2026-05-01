"use client";

import { LocaleContext, useLocaleInit } from "./i18n";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const value = useLocaleInit();
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}
