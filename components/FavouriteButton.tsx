"use client";

import { useFavourites } from "./FavouritesContext";

export default function FavouriteButton({
  slug,
  withLabel = false,
  className = "",
}: {
  slug: string;
  withLabel?: boolean;
  className?: string;
}) {
  const { isFavourite, toggle } = useFavourites();
  const active = isFavourite(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        // Cards are links; don't navigate when tapping the heart.
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
      className={`inline-flex items-center justify-center gap-2 transition ${className}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={active ? "#dc2626" : "none"}
        stroke={active ? "#dc2626" : "currentColor"}
        strokeWidth="1.8"
        strokeLinejoin="round"
      >
        <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z" />
      </svg>
      {withLabel && <span className="font-semibold">{active ? "Saved to Favourites" : "Add to Favourites"}</span>}
    </button>
  );
}
