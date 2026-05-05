"use client";

import { createContext, useCallback, useContext, useState } from "react";

const STORAGE_KEY = "locale";

export type Locale = "fr" | "en";

export const dictionaries = {
  fr: {
    header: {
      title: "Liste de naissance d'Alexandre et Julie",
      subtitle:
        "Bienvenue sur notre liste · Chaque participation, quelle qu'elle soit, nous touche infiniment",
    },
    product: {
      participate: "Participer",
      gifted: "Déjà offert",
      available: "Disponible",
      price: (price: number) =>
        price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" }),
    },
    form: {
      title: (productTitle: string) => `Participer pour : ${productTitle}`,
      firstName: "Prénom",
      lastName: "Nom",
      amount: "Montant de votre participation",
      amountHint: "Choisissez librement le montant qui vous convient",
      message: "Un message pour nous",
      messagePlaceholder: "Un petit mot qui nous fera chaud au cœur…",
      submit: "Envoyer le message et procéder au paiement",
      submitting: "Envoi en cours…",
      paymentNote:
        "Les informations de paiement seront transmises à l'étape suivante, par virement ou Wero, sans aucun frais.",
      errorMessage: "Une erreur est survenue. Veuillez réessayer.",
      backToList: "Retour à la liste",
      step2Title: "Dernière étape",
      step2Intro: (amount: string, productTitle: string, isFree: boolean) =>
        isFree
          ? `Votre participation de ${amount} € à la cagnotte est désormais enregistrée en votre nom. Il ne vous reste plus qu'à choisir le mode de paiement qui vous convient le mieux.`
          : `Votre participation de ${amount} € pour le cadeau "${productTitle}" est désormais enregistrée en votre nom. Il ne vous reste plus qu'à choisir le mode de paiement qui vous convient le mieux.`,
      step2How: "Comment procéder",
      step2Methods: "En faisant un versement sur l'un des comptes suivants :",
      step2IBAN: "RIB / IBAN",
      step2IBANValue: "FR76 2573 3000 0100 0001 4625 772",
      step2PayPal: "PayPal",
      step2PayPalValue: "julie.mrt@gmail.com",
      step2Wero: "Wero",
      step2WeroValue: "06 67 15 95 11 (Alexandre)",
      step2Thanks:
        "Merci infiniment pour votre geste, il nous touche énormément. 💚",
      backToList2: "Retour à la liste",
    },
    info: {
      subtitle: "Bienvenue sur notre liste de naissance !",
      description:
        "Notre petite framboise est attendue pour début juillet et elle a hâte de vous rencontrer. Si vous souhaitez participer à notre liste, chaque cadeau, grand ou petit, nous touchera énormément.\n\nIl n'y a volontairement pas de vêtements dans la liste ci-dessous car nous en avons déjà récupérés beaucoup de notre entourage. ",
      dueDate: "Date d'arrivée prévue",
      dueDateValue: "3 juillet 2026",
      address: "Notre adresse",
      addressValue: "1 rue Capitaine Badille, 13600 La Ciotat",
      freeContrib: "Vous préférez faire un don libre ?",
      freeContribBtn: "Participer à la cagnotte",
      babySex: "Sexe",
      babySexValue: "Fille",
      babyWeight: "Poids au 28 avril",
      babyWeightValue: "1,8 kg",
    },
    lang: {
      toggle: "EN",
    },
  },
  en: {
    header: {
      title: "Alexandre & Julie's Baby Registry",
      subtitle:
        "Welcome to our registry · Every contribution, big or small, means the world to us",
    },
    product: {
      participate: "Participate",
      gifted: "Already gifted",
      available: "Available",
      price: (price: number) =>
        price.toLocaleString("en-GB", { style: "currency", currency: "EUR" }),
    },
    form: {
      title: (productTitle: string) => `Contribute towards: ${productTitle}`,
      firstName: "First name",
      lastName: "Last name",
      amount: "Your contribution amount",
      amountHint: "Choose any amount that works for you",
      message: "A message for us",
      messagePlaceholder: "A few kind words we'll treasure…",
      submit: "Send message and proceed to payment",
      submitting: "Sending…",
      paymentNote:
        "Payment details will be shared on the next step, by bank transfer or Wero, with no fees.",
      errorMessage: "Something went wrong. Please try again.",
      backToList: "Back to the list",
      step2Title: "Last step",
      step2Intro: (amount: string, productTitle: string, isFree: boolean) =>
        isFree
          ? `Your contribution of €${amount} to the kitty has been registered in your name. All that's left is to choose the payment method that works best for you.`
          : `Your contribution of €${amount} for "${productTitle}" has been registered in your name. All that's left is to choose the payment method that works best for you.`,
      step2How: "How to proceed",
      step2Methods: "Make a transfer to one of the following accounts:",
      step2IBAN: "Bank transfer / IBAN",
      step2IBANValue: "FR76 2573 3000 0100 0001 4625 772",
      step2PayPal: "PayPal",
      step2PayPalValue: "julie.mrt@gmail.com",
      step2Wero: "Wero",
      step2WeroValue: "06 67 15 95 11 (Alexandre)",
      step2Thanks: "Thank you so much — your gesture means the world to us. 💚",
      backToList2: "Back to the list",
    },
    info: {
      subtitle: "Welcome to our baby registry!",
      description:
        "Our little raspberry is due in early July and can't wait to meet you. If you'd like to take part in our registry, every gift — big or small — will mean the world to us.\n\nWe've intentionally left clothing off the list below, as we've already received plenty from those around us.",
      dueDate: "Expected arrival date",
      dueDateValue: "3 July 2026",
      address: "Our address",
      addressValue: "1 rue Capitaine Badille, 13600 La Ciotat, France",
      freeContrib: "Prefer to make a free contribution?",
      freeContribBtn: "Contribute to the kitty",
      babySex: "Sex",
      babySexValue: "Girl",
      babyWeight: "Weight as of April 28",
      babyWeightValue: "1.8 kg",
    },
    lang: {
      toggle: "FR",
    },
  },
} as const;

type Dictionaries = typeof dictionaries;
export type Dict = Dictionaries[Locale];

function detectLocale(): Locale {
  if (typeof window === "undefined") return "fr";
  // Prefer the value set synchronously by the inline script in layout.tsx
  const preloaded = (window as unknown as Record<string, unknown>).__LOCALE__;
  if (preloaded === "fr" || preloaded === "en") return preloaded;
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored === "fr" || stored === "en") return stored;
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("en")) return "en";
  return "fr";
}

export type LocaleContextValue = {
  locale: Locale;
  t: Dict;
  setLocale: (locale: Locale) => void;
};

export const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocaleInit() {
  // Lazy init reads window.__LOCALE__ (set by inline script) on first render,
  // avoiding the FR→EN flash for English users.
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale());

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLocaleState(next);
  }, []);

  return { locale, t: dictionaries[locale], setLocale };
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
