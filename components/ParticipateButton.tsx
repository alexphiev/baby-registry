"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";

type Props = {
  productId: string;
  isGifted: boolean;
};

export function ParticipateButton({ productId, isGifted }: Props) {
  const { t } = useLocale();

  if (isGifted) {
    return (
      <div className="w-full flex items-center justify-center h-9 rounded-lg bg-(--color-muted) text-[14px] font-semibold text-(--color-text-muted) cursor-not-allowed">
        {t.product.gifted}
      </div>
    );
  }

  return (
    <Link
      href={`/participate/${productId}`}
      className="w-full flex items-center justify-center h-9 rounded-lg text-[14px] font-semibold text-white transition-opacity hover:opacity-80"
      style={{ background: "#4a6b47" }}
    >
      {t.product.participate}
    </Link>
  );
}
