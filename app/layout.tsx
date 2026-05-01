import type { Metadata } from "next";
import { Albert_Sans, Fredoka } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

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

// Runs synchronously before React hydration to avoid locale flash.
const localeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('locale');
    if (stored === 'en' || stored === 'fr') { window.__LOCALE__ = stored; return; }
    if (navigator.language.toLowerCase().startsWith('en')) { window.__LOCALE__ = 'en'; } else { window.__LOCALE__ = 'fr'; }
  } catch(e) { window.__LOCALE__ = 'fr'; }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${albertSans.variable} ${fredoka.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <LocaleProvider>
          <LanguageSwitcher />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
