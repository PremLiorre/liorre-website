import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/FilterBar";
import { products } from "@/lib/products";
import { applyFilters, parseFilter, parseSort } from "@/lib/filters";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop Liorre oversized, acid wash and regular fit t-shirts.",
};

export default async function ShopPage(props: PageProps<"/shop">) {
  const { filter: f, sort: so } = await props.searchParams;
  const filter = parseFilter(f);
  const sort = parseSort(so);
  const list = applyFilters(products, filter, sort);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center">
        <p className="uppercase tracking-[0.3em] text-amber-600 text-sm mb-4">Shop</p>
        <h1 className="text-4xl sm:text-5xl font-bold">The Liorre Collection</h1>
        <p className="mt-4 text-gray-600">Add to cart, then place your order on WhatsApp or Instagram.</p>
      </div>

      <div className="mt-10">
        <FilterBar filter={filter} sort={sort} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  );
}
