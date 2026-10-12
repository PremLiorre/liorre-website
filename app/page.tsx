import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/Marquee";
import Slider from "@/components/Slider";
import ProductCard from "@/components/ProductCard";
import Wordmark from "@/components/Wordmark";
import Stars from "@/components/Stars";
import FeedbackForm from "@/components/FeedbackForm";
import { products, newArrivals, getProduct } from "@/lib/products";
import { lovedFor, reviews, ratingFor } from "@/lib/reviews";
import { SITE, whatsappLink } from "@/lib/site";
import { banners } from "@/lib/banners";
import { FacebookIcon, InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/Icons";

export default function Page() {
  const overall = ratingFor();

  // Every product photo, for the strip running across the top.
  const runningImages = products.flatMap((p) =>
    p.images.map((src) => ({ src, alt: p.name, href: `/product/${p.slug}` })),
  );

  // One lead image per product, shown one at a time in the hero.
  const heroSlides = products
    .filter((p) => p.images[0].startsWith("/products/"))
    .map((p) => ({
      src: p.images[0],
      alt: p.name,
      title: p.name,
      subtitle: `${p.fit} · ${p.color}`,
      href: `/product/${p.slug}`,
    }));

  const fitTiles = [
    { title: "Oversized", subtitle: "260 GSM · Launch offer from ₹799", image: "/products/built-different-lava-1.jpg", href: "/shop?filter=oversized" },
    { title: "Regular Fit", subtitle: "220 GSM · Launch offer ₹799", image: "/products/maroon-regular-1.jpg", href: "/shop?filter=regular" },
    { title: "Polo", subtitle: "Out of stock · Arriving soon", image: "/polo-blue.jpg", href: "/shop?filter=polo" },
  ];

  return (
    <main>
      {/* Banners — full width, one at a time, auto-rotating every 5 seconds (lib/banners.ts).
          Phones show the whole 16:9 banner; desktop uses a shorter 12:5 frame that trims
          only the top/bottom edges, keeping the headline and Shop Now button visible. */}
      {banners.length > 0 && (
        <section aria-label="Featured">
          <Slider
            slides={banners}
            interval={5000}
            className="aspect-video lg:aspect-[12/5] w-full !rounded-none !shadow-none bg-black"
            imageClassName="object-cover"
            sizes="100vw"
            preloadFirst
          />
        </section>
      )}

      {/* Running images */}
      <section aria-label="Liorre collection" className="pt-6 sm:pt-8">
        <Marquee items={runningImages} height="h-40 sm:h-56" duration={60} />
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-amber-600 text-sm mb-4">{SITE.parent}</p>
            <h1>
              <span className="sr-only">LIORRE</span>
              <Wordmark className="w-full max-w-[300px] sm:max-w-[420px] md:max-w-[540px] h-auto text-[#1a1712]" title="LIORRE" />
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Premium oversized, acid wash and regular fit t-shirts crafted for comfort,
              confidence and modern fashion.
            </p>
            {overall && (
              <div className="mt-4 flex items-center gap-2 text-gray-600">
                <Stars rating={overall.average} />
                <span>
                  {overall.average}/5 from {overall.count} customer review{overall.count > 1 ? "s" : ""}
                </span>
              </div>
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop"
                className="text-center bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition shadow-md"
              >
                Shop Now
              </Link>
              <Link
                href="#new-arrivals"
                className="text-center border border-gray-300 px-8 py-4 rounded-xl hover:border-black transition"
              >
                New Arrivals
              </Link>
            </div>
          </div>

          <Slider slides={heroSlides} className="aspect-[4/5] sm:aspect-[5/4]" />
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section id="new-arrivals" className="bg-gray-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center">
              <p className="uppercase tracking-[0.3em] text-amber-600 text-sm mb-4">Just Dropped</p>
              <h2 className="text-3xl sm:text-4xl font-bold">New Arrivals</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {newArrivals.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Shop by fit */}
      <section id="collections" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <p className="uppercase tracking-[0.3em] text-amber-600 text-sm mb-4">Collections</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Designed To Stand Out</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {fitTiles.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition"
              >
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-contain group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-2xl font-bold">{t.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{t.subtitle}</p>
                  <p className="mt-3 text-sm font-semibold text-amber-700 group-hover:underline">Shop now →</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/favourites"
              className="inline-flex items-center gap-2 border border-black px-8 py-4 rounded-xl font-semibold hover:bg-black hover:text-white transition"
            >
              ♡ View My Favourites
            </Link>
            <p className="mt-3 text-sm text-gray-500">Tap the heart on any T-shirt to save it for later.</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="relative w-full h-72 sm:h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/about.jpg"
                alt="Minimal Luxury"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div>
              <p className="uppercase tracking-[0.3em] text-amber-600 text-sm mb-4">About Liorre</p>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Premium Identity.
                <br />
                Minimal Luxury.
              </h2>
              <p className="mt-6 text-gray-600">
                Liorre is a premium clothing brand under {SITE.parent} focused on quality
                fabrics, timeless style and modern fits.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white p-6 rounded-2xl shadow">
                  <h3 className="text-2xl font-bold">Unique Designs</h3>
                  <p className="text-gray-500">Every print tells a story</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow">
                  <h3 className="text-3xl font-bold">24/7</h3>
                  <p className="text-gray-500">Support</p>
                </div>
              </div>

              <Link href="/lookbook" className="inline-block mt-8 font-semibold text-amber-700 hover:underline">
                Read our story in the Lookbook →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews + Feedback */}
      <section id="reviews" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <p className="uppercase tracking-[0.3em] text-amber-600 text-sm mb-4">Customer Love</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Reviews & Feedback</h2>
            {overall && (
              <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">
                <Stars rating={overall.average} size={20} />
                <span className="font-semibold">{overall.average} / 5</span>
                <span>· {overall.count} reviews</span>
              </div>
            )}
          </div>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {reviews.map((r, i) => (
                <figure key={i} className="bg-gray-50 rounded-3xl p-6">
                  <Stars rating={r.rating} />
                  <blockquote className="mt-3 text-gray-700">“{r.text}”</blockquote>
                  <figcaption className="mt-4 text-sm text-gray-500">
                    <span className="font-semibold text-black">{r.name}</span>
                    {r.city && `, ${r.city}`}
                    {r.productSlug && getProduct(r.productSlug) && ` · ${getProduct(r.productSlug)!.name}`}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">
              Be one of the first to review Liorre — share your experience below.
            </p>
          )}

          {lovedFor.length > 0 && (
            <div className="mt-10 flex flex-col items-center">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Our customers love the</p>
              <div className="mt-3 flex flex-wrap justify-center gap-3">
                {lovedFor.map((l) => (
                  <span key={l} className="bg-amber-50 text-amber-800 border border-amber-200 font-semibold px-5 py-2 rounded-full">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div id="feedback" className="max-w-3xl mx-auto mt-12">
            <h3 className="text-2xl font-bold mb-4 text-center">Share Your Feedback</h3>
            <FeedbackForm />
            {SITE.reviewFormUrl && (
              <div className="text-center mt-6">
                <p className="text-gray-500">Bought a Liorre tee? Tell us about the fabric, fit and comfort.</p>
                <a
                  href={SITE.reviewFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block border border-black px-8 py-3 rounded-xl font-semibold hover:bg-black hover:text-white transition"
                >
                  Write a Detailed Review
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center bg-gray-100 rounded-3xl p-8 sm:p-12">
          <h2 className="text-3xl md:text-5xl font-bold">Wear Confidence With Liorre</h2>
          <p className="mt-6 text-gray-600">Premium apparel crafted for modern everyday fashion.</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {[
              {
                href: `mailto:${SITE.email}?subject=Liorre Inquiry&body=Hello Liorre Team,%0D%0A%0D%0AI would like to know more about your products.`,
                label: "Email Us",
                icon: <MailIcon />,
                external: false,
              },
              { href: SITE.instagramDmUrl, label: "DM on Instagram", icon: <InstagramIcon />, external: true },
              { href: whatsappLink("Hi Liorre! I have a question."), label: "WhatsApp Us", icon: <WhatsAppIcon />, external: true },
              { href: SITE.facebookUrl, label: "Facebook", icon: <FacebookIcon />, external: true },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                {c.icon}
                {c.label}
              </a>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-600">
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-black">
              <MailIcon size={18} className="text-amber-600" /> {SITE.email}
            </a>
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-black">
              <InstagramIcon size={18} className="text-amber-600" /> @{SITE.instagramHandle}
            </a>
            <a href={SITE.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-black">
              <FacebookIcon size={18} className="text-amber-600" /> Liorre on Facebook
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
