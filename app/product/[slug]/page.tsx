import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import FavouriteButton from "@/components/FavouriteButton";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import Stars from "@/components/Stars";
import JsonLd from "@/components/JsonLd";
import SizeChart, { CHARTS } from "@/components/SizeChart";
import {
  CARE_INSTRUCTIONS,
  CARE_SIGNOFF,
  DESCRIPTION_SIGNOFF,
  getProduct,
  products,
} from "@/lib/products";
import { ratingFor, reviews } from "@/lib/reviews";
import { SITE, formatPrice } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.intro,
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const rating = ratingFor(product.slug);
  const productReviews = reviews.filter((r) => r.productSlug === product.slug);
  const related = products.filter((p) => p.slug !== product.slug && p.fit === product.fit).slice(0, 3);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.intro,
          image: product.images.map((i) => `${SITE.url}${i}`),
          brand: { "@type": "Brand", name: "LIORRE" },
          color: product.color,
          offers: {
            "@type": "Offer",
            url: `${SITE.url}/product/${product.slug}`,
            priceCurrency: "INR",
            price: product.price,
            availability: product.outOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
          },
        }}
      />
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black">Home</Link> /{" "}
        <Link href="/shop" className="hover:text-black">Shop</Link> /{" "}
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
        <ProductGallery images={[...product.images, ...(CHARTS[product.fit] ? [CHARTS[product.fit]!.src] : [])]} alt={product.name} discountPercent={product.discountPercent} />

        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {product.isNew && (
              <span className="bg-amber-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                New Arrival
              </span>
            )}
            {product.outOfStock && (
              <span className="bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Out of Stock
              </span>
            )}
            {product.launchOffer && (
              <span className="bg-black text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Launch Offer
              </span>
            )}
          </div>
          <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
            {product.fit} · {product.color}
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2 text-gray-500">
            {rating ? (
              <>
                <Stars rating={rating.average} />
                <span>
                  {rating.average} · {rating.count} review{rating.count > 1 ? "s" : ""}
                </span>
              </>
            ) : (
              <Link href="/#feedback" className="hover:text-black underline">
                Be the first to review
              </Link>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
            {product.mrp && (
              <>
                <s className="text-lg text-gray-400">MRP {formatPrice(product.mrp)}</s>
                <span className="text-sm font-bold text-red-600">{product.discountPercent}% OFF</span>
              </>
            )}
          </div>

          <div className="mt-8">
            {product.outOfStock ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
                <p className="text-lg font-bold text-amber-800">Out of Stock — Arriving Soon</p>
                <p className="mt-1 text-sm text-amber-700">Save it to your favourites and check back soon.</p>
              </div>
            ) : (
              <AddToCart slug={product.slug} />
            )}
            <FavouriteButton
              slug={product.slug}
              withLabel
              className="mt-3 w-full h-12 rounded-xl border border-gray-300 hover:border-black"
            />
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold uppercase tracking-wide">
              {product.highlights.length > 0 ? `${product.name} — ${product.fit} T-Shirt` : "Description"}
            </h2>
            <p className="mt-4 text-gray-600 leading-7">{product.intro}</p>
            {product.highlights.length > 0 && (
              <>
                <h3 className="mt-6 font-semibold">Product Highlights</h3>
                <ul className="mt-3 space-y-2 text-gray-600">
                  {product.highlights.map((h) => (
                    <li key={h.label} className="flex gap-2">
                      <span className="text-amber-600">•</span>
                      <span>
                        <span className="font-semibold text-black">{h.label}:</span> {h.value}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-gray-700">
                  <p>{DESCRIPTION_SIGNOFF[0]}</p>
                  <p className="font-semibold">{DESCRIPTION_SIGNOFF[1]}</p>
                </div>
              </>
            )}
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Product Specifications</h2>
            <dl className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
              {[{ label: "Color", value: product.color }, ...product.specs].map((s) => (
                <div key={s.label} className="grid grid-cols-3 gap-4 px-5 py-3 odd:bg-gray-50">
                  <dt className="text-gray-500">{s.label}</dt>
                  <dd className="col-span-2 font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {product.showCare && (
            <details className="mt-6 border border-gray-100 rounded-2xl px-5 py-4 group">
              <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center">
                Wash Care
                <span className="text-gray-400 group-open:rotate-45 transition text-2xl leading-none">+</span>
              </summary>
              <ul className="mt-4 space-y-2 text-gray-600">
                {CARE_INSTRUCTIONS.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-amber-600">•</span>
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-semibold">{CARE_SIGNOFF}</p>
            </details>
          )}

          {product.fit !== "Polo" && <SizeChart fit={product.fit} />}
        </div>
      </div>

      {productReviews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productReviews.map((r, i) => (
              <figure key={i} className="bg-gray-50 rounded-3xl p-6">
                <Stars rating={r.rating} />
                <blockquote className="mt-3 text-gray-700">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-sm text-gray-500">
                  <span className="font-semibold text-black">{r.name}</span>
                  {r.city && `, ${r.city}`}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16 sm:mt-24">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
