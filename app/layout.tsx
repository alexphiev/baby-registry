import type { Metadata } from "next";
import { Albert_Sans, Fredoka } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getServerLocale } from "@/lib/locale-server";

const albertSans = Albert_Sans({
  variable: "--font-albert",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Liste de naissance d'Alexandre et Julie",
  description:
    "Liste de naissance d'Alexandre et Julie / Alexandre and Julie's baby registry",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html
      lang={locale}
      className={`${albertSans.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider initialLocale={locale}>
          <LanguageSwitcher />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
