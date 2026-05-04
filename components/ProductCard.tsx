"use client";

import Image from "next/image";
import { ParticipateButton } from "@/components/ParticipateButton";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/lib/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { locale, t } = useLocale();
  const isGifted = product.status === "gifted";
  const title = product.title[locale];

  return (
    <div
      className="group flex flex-col rounded-xl overflow-hidden border border-(--color-border) bg-white transition-shadow hover:shadow-md"
    >
      {/* Image */}
      <div className="relative w-full aspect-4/3 overflow-hidden bg-(--color-muted)">
        <Image
          src={product.image}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${isGifted ? "opacity-50 grayscale" : ""}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
        {isGifted ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-white/90 text-(--color-text-muted)"
            >
              {t.product.gifted}
            </span>
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-4 pt-4 pb-4 gap-3">
        <div className="flex-1">
          <h2 className="text-[16px] font-semibold text-(--color-text) leading-snug">
            {title}
          </h2>
          <p
            className="mt-1 text-[16px] font-semibold tracking-tight"
            style={{ color: "#4a6b47" }}
          >
            {t.product.price(product.price)}
          </p>
        </div>

        <ParticipateButton productId={product.id} isGifted={isGifted} />
      </div>
    </div>
  );
}
