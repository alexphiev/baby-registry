import { Header } from "@/components/Header";
import { InfoBlock } from "@/components/InfoBlock";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <main className="min-h-screen pb-12">
      <Header />
      <InfoBlock />
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pt-2">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i === 0} />
        ))}
      </section>
    </main>
  );
}
