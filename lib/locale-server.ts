import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE } from "./locale-constants";
import type { Locale } from "./i18n";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  if (cookieLocale === "en" || cookieLocale === "fr") return cookieLocale;

  const headerStore = await headers();
  const acceptLang = headerStore.get("accept-language");
  const primary = acceptLang?.split(",")[0]?.trim().toLowerCase();
  if (primary?.startsWith("en")) return "en";

  return "fr";
}
