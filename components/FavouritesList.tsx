"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { useFavourites } from "./FavouritesContext";
import { getProduct } from "@/lib/products";

export default function FavouritesList() {
  const { slugs } = useFavourites();
  const items = slugs.map(getProduct).filter((p) => p !== undefined);

  if (items.length === 0) {
    return (
      <div className="text-center mt-12">
        <p className="text-gray-500">No favourites yet. Tap the ♡ on any T-shirt to save it here.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition"
        >
          Browse T-shirts
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
      {items.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
