
"use client";

import { useState } from "react";
export default function Page() {
const [menuOpen, setMenuOpen] = useState(false);
  const collections = [
  {
    title: "Oversized - Built Different",
    image: "/built-different.jpg",
    description:
      "Premium oversized fit featuring the signature Built Different back print.",
  },
  {
    title: "Oversized - Grape Wine",
    image: "/grape-wine.jpg",
    description:
      "Vintage washed oversized t-shirt with unique grape wine artwork.",
  },
{
  title: "Oversized - Beige Panda",
  image: "/Biege.jpg",
  description:
    "Premium oversized fit featuring the signature Panda back print.",
},
  {
    title: "Round Neck - Nomad Culture",
    image: "/nomad-black.jpg",
    description:
      "Classic regular fit round neck t-shirt with Nomad Culture graphic.",
  },
  {
    title: "Polo Collection - Navy Blue",
    image: "/polo-blue.jpg",
    description:
      "Premium polo t-shirt with embroidered Liorre branding.",
  },
  {
    title: "Polo Collection - Sage Green",
    image: "/polo-green.jpg",
    description:
      "Modern premium polo crafted for everyday elegance and comfort.",
  },
  ];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white text-black">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

    <div className="flex items-center gap-3">
      <img
        src="/logo.jpg"
        alt="Liorre Logo"
        className="h-12 sm:h-16 md:h-20 w-auto"
      />
      <span className="text-xl font-bold tracking-wide">
        LIORRE
      </span>
    </div>

    {/* Desktop Menu */}
    <div className="hidden md:flex items-center gap-8">
      <a href="#collections" className="hover:text-black">Collections</a>
      <a href="#about" className="hover:text-black">About</a>
      <a href="#contact" className="hover:text-black">Contact</a>

      <a
        href="/lookbook"
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Lookbook
      </a>
    </div>

    {/* Mobile Menu Button */}
    <button
      className="md:hidden text-3xl"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      ☰
    </button>

  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden bg-white border-t">

      <a
        href="#collections"
        className="block px-6 py-4 border-b"
        onClick={() => setMenuOpen(false)}
      >
        Collections
      </a>

      <a
        href="#about"
        className="block px-6 py-4 border-b"
        onClick={() => setMenuOpen(false)}
      >
        About
      </a>

      <a
        href="#contact"
        className="block px-6 py-4 border-b"
        onClick={() => setMenuOpen(false)}
      >
        Contact
      </a>

      <a
        href="/lookbook"
        className="block px-6 py-4"
        onClick={() => setMenuOpen(false)}
      >
        Lookbook
      </a>

    </div>
  )}

</nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-amber-600 text-sm mb-4">
              Oraeon Group
            </p>

            <div className="flex items-center gap-3 sm:gap-4 mb-2">
  <img
    src="/logo.jpg"
    alt="Liorre Logo"
    className="h-12 sm:h-16 w-auto"
  />
  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
    LIORRE
  </h1>
</div>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Premium oversized, round neck and polo t-shirts crafted for
              comfort, confidence and modern fashion.
            </p>

            
          </div>

          <div>
      <img
  src="/hero_instead.png"
  alt="Liorre Premium Oversized T-Shirt"
  className="rounded-3xl w-full h-auto max-h-[600px] object-contain shadow-xl"
/>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-gray-50 py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
<img
  src="/About_pot.png"
  alt="Minimal Luxury"
  className="rounded-3xl w-full h-auto max-h-[600px] object-contain shadow-xl"
/>

            <div>
              <p className="uppercase tracking-[0.3em] text-amber-600 text-sm mb-4">
                About Liorre
              </p>

              <h2 className="text-4xl font-bold">
                Premium Identity.
                <br />
                Minimal Luxury.
              </h2>

              <p className="mt-6 text-gray-600">
                Liorre is a premium clothing brand under Oraeon Group focused on
                quality fabrics, timeless style and modern fits.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white p-6 rounded-2xl shadow">
                  <h3 className="text-3xl font-bold">10K+</h3>
                  <p className="text-gray-500">Customers</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                  <h3 className="text-3xl font-bold">24/7</h3>
                  <p className="text-gray-500">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="py-12 sm:py-16 lg:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="text-center">
      <p className="uppercase tracking-[0.3em] text-amber-600 text-sm mb-4">
        Collections
      </p>

      <h2 className="text-3xl sm:text-4xl font-bold">
        Designed To Stand Out
      </h2>
    </div>


    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-12">

      {collections.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition"
        >

          <div className="w-full h-72 sm:h-80 lg:h-96 bg-gray-50 flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          </div>


          <div className="p-5 sm:p-6">

            <h3 className="text-xl sm:text-2xl font-semibold">
              {item.title}
            </h3>


            <p className="text-gray-600 mt-3">
              {item.description}
            </p>

          </div>

        </div>
      ))}

    </div>

  </div>
</section>

      {/* CTA / Contact */}
      <section id="contact" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
  <div className="max-w-5xl mx-auto text-center bg-gray-100 rounded-3xl p-6 sm:p-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Wear Confidence With Liorre
          </h2>

          <p className="mt-6 text-gray-600">
            Premium apparel crafted for modern everyday fashion.
          </p>

          <a
  href="mailto:Oraeongroup@gmail.com?subject=Liorre Inquiry&body=Hello Liorre Team,%0D%0A%0D%0AI would like to know more about your products."
  className="mt-8 inline-block bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition"
>
  Contact Us
</a>

          <p className="mt-4 text-gray-500">
            📧{" "}
            <a
              href="mailto:oraeongroup@gmail.com"
              className="text-amber-600 hover:underline"
            >
              oraeongroup@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Liorre Logo" className="h-8 w-auto" />
            <p className="text-gray-500">
              © 2026 Liorre — Powered by Oraeon Group
            </p>
          </div>

          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a
              href="mailto:oraeongroup@gmail.com"
              className="text-gray-600 hover:text-black transition"
            >
              oraeongroup@gmail.com
            </a>
            <a
  href="https://www.instagram.com/liorre2026?utm_source=qr&igsh=amVyYzh5MDJhbW55/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-600 hover:text-black transition"
>
  Instagram
</a>
            <a href="#" className="text-gray-600 hover:text-black transition">Facebook</a>
            <a href="#" className="text-gray-600 hover:text-black transition">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

