"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n";

export function InfoBlock() {
  const { t } = useLocale();

  return (
    <div className="max-w-6xl mx-auto w-full px-6 pt-8 pb-2">
      <div className="rounded-xl border border-(--color-border) bg-white overflow-hidden">

        {/* Top section: profile photo + description + details */}
        <div className="flex flex-col md:flex-row">
          {/* Profile photo: full height on desktop, top banner on mobile */}
          <div className="relative md:w-52 shrink-0 h-48 md:h-auto border-b md:border-b-0 md:border-r border-(--color-border)">
            <Image
              src="/images/profile.JPG"
              alt="Photo de profil"
              fill
              sizes="(max-width: 768px) 100vw, 13rem"
              className="object-cover object-top"
            />
          </div>

          {/* Left: text */}
          <div className="flex-1 px-7 py-6 border-b md:border-b-0 md:border-r border-(--color-border)">
            <p
              className="text-[11px] font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#4a6b47" }}
            >
              {t.info.subtitle}
            </p>
            <p className="text-[14px] text-(--color-text) leading-relaxed">
              {t.info.description}
            </p>
          </div>

          {/* Right: date + address */}
          <div className="flex flex-col divide-y divide-(--color-border) md:w-64 shrink-0">
            <div className="px-6 py-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-(--color-text-muted) mb-1">
                {t.info.dueDate}
              </p>
              <p className="text-[16px] font-semibold text-(--color-text)">
                {t.info.dueDateValue}
              </p>
            </div>
            <div className="px-6 py-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-(--color-text-muted) mb-1">
                {t.info.address}
              </p>
              <p className="text-[14px] text-(--color-text) leading-relaxed">
                {t.info.addressValue}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Free contribution */}
      <div className="my-3 flex items-center justify-end gap-4 px-2 py-3">
        <p className="text-[16px] font-semibold text-(--color-text)">
          {t.info.freeContrib}
        </p>
        <Link
          href="/participate/libre"
          className="shrink-0 inline-flex items-center justify-center rounded-lg px-5 h-10 text-[14px] font-semibold text-white transition-opacity hover:opacity-80"
          style={{ background: "#4a6b47" }}
        >
          {t.info.freeContribBtn}
        </Link>
      </div>

    </div>
  );
}
