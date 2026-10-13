import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "./DiscountBadge";
import FavouriteButton from "./FavouriteButton";
import Stars from "./Stars";
import type { Product } from "@/lib/products";
import { ratingFor } from "@/lib/reviews";
import { formatPrice } from "@/lib/site";

export default function ProductCard({ product }: { product: Product }) {
  const rating = ratingFor(product.slug);

  return (
    <div className="relative h-full">
      <Link
        href={`/product/${product.slug}`}
        className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition"
      >
        {/* object-contain: show the whole photo, never crop */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain group-hover:scale-[1.03] transition duration-500"
          />
          {product.discountPercent && (
            <DiscountBadge percent={product.discountPercent} className="absolute top-1 left-1 w-11 h-11 sm:w-12 sm:h-12" />
          )}
        </div>

        <div className="p-5 sm:p-6 flex flex-col flex-1">
          {(product.isNew || product.launchOffer || product.outOfStock) && (
            <div className="flex flex-wrap gap-2 mb-3">
              {product.isNew && (
                <span className="bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  New
                </span>
              )}
              {product.launchOffer && (
                <span className="bg-black text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  Launch Offer
                </span>
              )}
              {product.outOfStock && (
                <span className="bg-gray-200 text-gray-700 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  Out of Stock · Arriving Soon
                </span>
              )}
            </div>
          )}
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 truncate" title={`${product.fit} · ${product.color}`}>
            {product.fit} · {product.color}
          </p>
          {/* Fixed two-line title area keeps every card the same height */}
          <h3 className="mt-1 text-lg sm:text-xl font-semibold leading-snug line-clamp-2 min-h-[2lh]">{product.name}</h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            {rating ? (
              <>
                <Stars rating={rating.average} />
                <span>
                  {rating.average} ({rating.count})
                </span>
              </>
            ) : (
              <span>No reviews yet</span>
            )}
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="flex items-baseline gap-2">
              <span className="text-xl font-bold">{formatPrice(product.price)}</span>
              {product.mrp && <s className="text-sm text-gray-400">{formatPrice(product.mrp)}</s>}
            </span>
            <span className="text-sm font-semibold text-amber-700 group-hover:underline">
              {product.outOfStock ? "View →" : "View & Buy →"}
            </span>
          </div>
        </div>
      </Link>
      <FavouriteButton
        slug={product.slug}
        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 shadow hover:bg-white"
      />
    </div>
  );
}
