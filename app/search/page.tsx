import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SearchBox from "@/components/SearchBox";
import { searchProducts } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Liorre T-shirts by fit, colour, price and offers.",
};

const suggestions = [
  "Oversized",
  "Acid wash",
  "Round neck",
  "Black",
  "Offers",
  "Price low to high",
  "Highly rated",
  "Polo",
];

export default async function SearchPage(props: PageProps<"/search">) {
  const { q } = await props.searchParams;
  const query = (typeof q === "string" ? q : "").trim();
  const { products, notes } = query ? searchProducts(query) : { products: [], notes: [] };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">Search</h1>
        <div className="mt-6">
          <SearchBox defaultValue={query} autoFocus={!query} />
        </div>
      </div>

      {query && products.length > 0 && (
        <>
          <p className="mt-8 text-center text-gray-600">
            {products.length} result{products.length > 1 ? "s" : ""} for{" "}
            <span className="font-semibold text-black">&ldquo;{query}&rdquo;</span>
            {notes.length > 0 && <span className="text-gray-400"> · {notes.join(" · ")}</span>}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </>
      )}

      {query && products.length === 0 && (
        <div className="mt-12 text-center" role="alert">
          <p className="text-4xl">🔍</p>
          <p className="mt-4 text-xl font-semibold">
            Sorry, we couldn&apos;t find any results for &ldquo;{query}&rdquo;.
          </p>
          <p className="mt-2 text-gray-500">Check the spelling or try one of these:</p>
        </div>
      )}

      {(!query || products.length === 0) && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <Link
              key={s}
              href={`/search?q=${encodeURIComponent(s)}`}
              className="px-4 py-2 rounded-full border border-gray-300 hover:border-black transition text-sm"
            >
              {s}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
