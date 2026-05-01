import productsData from "@/data/products.json";
import type { Locale } from "./i18n";

export type ProductStatus = "available" | "gifted";

export type Product = {
  id: string;
  title: { fr: string; en: string };
  price: number;
  image: string;
  status: ProductStatus;
};

export const products: Product[] = productsData as Product[];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getTitle(product: Product, locale: Locale): string {
  return product.title[locale];
}
