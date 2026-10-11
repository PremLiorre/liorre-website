import type { Metadata } from "next";
import FavouritesList from "@/components/FavouritesList";

export const metadata: Metadata = {
  title: "Favourites",
  description: "Your saved Liorre T-shirts.",
};

export default function FavouritesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center">
        <p className="uppercase tracking-[0.3em] text-amber-600 text-sm mb-4">Saved For Later</p>
        <h1 className="text-4xl sm:text-5xl font-bold">Your Favourites</h1>
      </div>
      <FavouritesList />
    </main>
  );
}
