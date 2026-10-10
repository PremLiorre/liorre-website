import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop Liorre oversized, acid wash and regular fit t-shirts.",
};

const filters = [
  { key: "all", label: "All" },
  { key: "new", label: "New Arrivals" },
  { key: "offer", label: "Launch Offer" },
  { key: "oversized", label: "Oversized" },
  { key: "regular", label: "Regular Fit" },
  { key: "polo", label: "Polo" },
];

export default async function ShopPage(props: PageProps<"/shop">) {
  const { filter } = await props.searchParams;
  const active = typeof filter === "string" && filters.some((f) => f.key === filter) ? filter : "all";

  const list = products.filter((p) => {
    if (active === "new") return p.isNew;
    if (active === "offer") return p.launchOffer;
    if (active === "oversized") return p.fit === "Oversized";
    if (active === "regular") return p.fit === "Regular Fit";
    if (active === "polo") return p.fit === "Polo";
    return true;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center">
        <p className="uppercase tracking-[0.3em] text-amber-600 text-sm mb-4">Shop</p>
        <h1 className="text-4xl sm:text-5xl font-bold">The Liorre Collection</h1>
        <p className="mt-4 text-gray-600">Add to cart, then place your order on WhatsApp or Instagram.</p>
      </div>

      <div className="mt-10 flex gap-2 overflow-x-auto pb-2 sm:justify-center -mx-4 px-4">
        {filters.map((f) => (
          <Link
            key={f.key}
            href={f.key === "all" ? "/shop" : `/shop?filter=${f.key}`}
            scroll={false}
            className={`shrink-0 px-5 py-2 rounded-full border transition ${
              active === f.key ? "bg-black text-white border-black" : "border-gray-300 hover:border-black"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </main>
  );
}
