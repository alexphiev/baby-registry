"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n";

export function Header() {
  const { t } = useLocale();

  return (
    <header className="relative w-full h-64 sm:h-80 flex items-end overflow-hidden">
      <Image
        src="/images/banner.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
      />
      {/* Gradient overlay — strong at bottom, subtle at top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(30,46,28,0.62) 100%)",
        }}
      />
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 pb-8">
          <h1
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight drop-shadow-sm"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {t.header.title}
          </h1>
        </div>
      </div>
    </header>
  );
}
