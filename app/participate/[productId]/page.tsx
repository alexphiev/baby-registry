"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocale } from "@/lib/i18n";
import { getProduct, getTitle } from "@/lib/products";

export default function ParticipatePage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const { locale, t } = useLocale();

  const isFree = productId === "libre";
  const product = isFree ? null : getProduct(productId);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<"form" | "loading" | "payment" | "error">("form");

  if (!isFree && !product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[14px] text-(--color-text-muted)">Produit introuvable.</p>
      </main>
    );
  }

  const title = product ? getTitle(product, locale) : t.info.freeContribBtn;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("loading");
    try {
      const res = await fetch("/api/participate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: isFree ? "libre" : product!.id,
          productTitle: title,
          firstName,
          lastName,
          amount,
          message,
          locale,
        }),
      });
      if (!res.ok) throw new Error();
      setStep("payment");
    } catch {
      setStep("error");
    }
  }

  // ── Step 2: payment instructions ─────────────────────────────────────────
  if (step === "payment") {
    return (
      <main className="min-h-screen bg-(--color-cream)">
        <div className="max-w-2xl mx-auto px-6 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-(--color-text-muted) hover:text-(--color-text) transition-colors"
          >
            ← {t.form.backToList2}
          </Link>
        </div>

        <div className="max-w-2xl mx-auto px-6 pt-6 pb-16 space-y-6">

          {/* Header card */}
          <div className="rounded-xl border border-(--color-border) bg-white px-6 py-6">
            <p
              className="text-[11px] font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#4a6b47" }}
            >
              {t.form.step2Title}
            </p>
            <p className="text-[15px] text-(--color-text) leading-relaxed">
              {t.form.step2Intro(amount, title, isFree)}
            </p>
          </div>

          {/* Payment methods */}
          <div className="rounded-xl border border-(--color-border) bg-white overflow-hidden">
            <div className="px-6 py-5 border-b border-(--color-border)">
              <p className="text-[16px] font-semibold text-(--color-text)">
                {t.form.step2How}
              </p>
              <p className="text-[13px] text-(--color-text-muted) mt-1">
                {t.form.step2Methods}
              </p>
            </div>

            <div className="divide-y divide-(--color-border)">
              {/* IBAN */}
              <div className="flex items-center justify-between px-6 py-4 gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
                    style={{ background: "var(--color-sage-light)" }}
                  >
                    🏦
                  </div>
                  <p className="text-[14px] font-semibold text-(--color-text)">
                    {t.form.step2IBAN}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] text-(--color-text-muted) mb-0.5">Julie Murat</p>
                  <p className="text-[13px] font-mono text-(--color-text-muted) tracking-wide">
                    {t.form.step2IBANValue}
                  </p>
                </div>
              </div>

              {/* PayPal */}
              <div className="flex items-center justify-between px-6 py-4 gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
                    style={{ background: "var(--color-baby-blue-light)" }}
                  >
                    💸
                  </div>
                  <p className="text-[14px] font-semibold text-(--color-text)">
                    {t.form.step2PayPal}
                  </p>
                </div>
                <p className="text-[13px] text-(--color-text-muted)">
                  {t.form.step2PayPalValue}
                </p>
              </div>

              {/* Wero */}
              <div className="flex items-center justify-between px-6 py-4 gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
                    style={{ background: "var(--color-yellow-light)" }}
                  >
                    📱
                  </div>
                  <p className="text-[14px] font-semibold text-(--color-text)">
                    {t.form.step2Wero}
                  </p>
                </div>
                <p className="text-[13px] text-(--color-text-muted)">
                  {t.form.step2WeroValue}
                </p>
              </div>
            </div>
          </div>

          {/* Thanks */}
          <p className="text-[14px] text-(--color-text-muted) text-center leading-relaxed px-2">
            {t.form.step2Thanks}
          </p>

          <Link
            href="/"
            className="flex items-center justify-center h-11 rounded-lg border border-(--color-border) bg-white text-[14px] font-semibold text-(--color-text) transition-colors hover:bg-(--color-muted)"
          >
            ← {t.form.backToList2}
          </Link>
        </div>
      </main>
    );
  }

  // ── Step 1: form ──────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-(--color-cream)">
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-(--color-text-muted) hover:text-(--color-text) transition-colors"
        >
          ← {t.form.backToList}
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-6 pb-16">
        {/* Product recap */}
        <div className="flex items-center gap-5 rounded-xl border border-(--color-border) bg-white px-5 py-4 mb-8">
          {product ? (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-(--color-muted)">
              <Image
                src={product.image}
                alt={title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ) : (
            <div
              className="w-16 h-16 rounded-lg shrink-0 flex items-center justify-center text-2xl"
              style={{ background: "var(--color-sage-light)" }}
            >
              🎁
            </div>
          )}
          <div>
            <p className="text-[16px] font-semibold text-(--color-text) leading-snug">
              {title}
            </p>
            {product ? (
              <p className="text-[14px] font-semibold mt-0.5" style={{ color: "#4a6b47" }}>
                {t.product.price(product.price)}
              </p>
            ) : null}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-[16px] font-semibold text-(--color-text)">
                {t.form.firstName}
              </label>
              <Input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-11 text-[14px] border-(--color-border) bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[16px] font-semibold text-(--color-text)">
                {t.form.lastName}
              </label>
              <Input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-11 text-[14px] border-(--color-border) bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[16px] font-semibold text-(--color-text)">
              {t.form.amount}
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-36">
                <Input
                  required
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-11 text-[14px] border-(--color-border) bg-white pr-8"
                  placeholder="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[14px] text-(--color-text-muted) pointer-events-none">
                  €
                </span>
              </div>
              <p className="text-[13px] text-(--color-text-muted) leading-snug">
                {t.form.amountHint}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[16px] font-semibold text-(--color-text)">
              {t.form.message}
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder={t.form.messagePlaceholder}
              className="text-[14px] border-(--color-border) bg-white resize-none leading-relaxed"
            />
          </div>

          <p className="text-[13px] text-(--color-text-muted) leading-relaxed">
            {t.form.paymentNote}
          </p>

          {step === "error" ? (
            <p className="text-[13px] text-destructive">{t.form.errorMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={step === "loading"}
            className="w-full h-11 rounded-lg text-[15px] font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ background: "#4a6b47" }}
          >
            {step === "loading" ? t.form.submitting : t.form.submit}
          </button>
        </form>
      </div>
    </main>
  );
}
