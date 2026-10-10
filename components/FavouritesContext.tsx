"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getProduct } from "@/lib/products";

type FavouritesContextValue = {
  slugs: string[];
  isFavourite: (slug: string) => boolean;
  toggle: (slug: string) => void;
};

const FavouritesContext = createContext<FavouritesContextValue | null>(null);
const STORAGE_KEY = "liorre-favourites";

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Restore after hydration so server and client render the same markup.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (Array.isArray(saved)) setSlugs(saved.filter((s) => getProduct(s)));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  }, [slugs, loaded]);

  return (
    <FavouritesContext.Provider
      value={{
        slugs,
        isFavourite: (slug) => slugs.includes(slug),
        toggle: (slug) =>
          setSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used inside FavouritesProvider");
  return ctx;
}
