"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { useFavourites } from "./FavouritesContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/#new-arrivals", label: "New Arrivals" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#about", label: "About" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/#contact", label: "Contact" },
  { href: "/favourites", label: "Favourites" },
];

export default function Navbar() {
  const { count, open } = useCart();
  const { slugs } = useFavourites();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Home / logo: if already on the home page, just jump to the very top (and drop any #section).
  const onLinkClick = (href: string) => (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      window.history.replaceState(window.history.state, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={onLinkClick("/")}>
          <Image src="/logo-sm.jpg" alt="Liorre Logo" width={40} height={40} className="h-10 w-auto" />
          <span className="text-xl font-bold tracking-wide">LIORRE</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.filter((l) => l.href !== "/favourites").map((l) => (
            <Link key={l.href} href={l.href} onClick={onLinkClick(l.href)} className="text-gray-600 hover:text-black transition">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/favourites"
            aria-label={`Favourites, ${slugs.length} saved`}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
              <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z" />
            </svg>
            {slugs.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[11px] font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {slugs.length}
              </span>
            )}
          </Link>

          <button
            onClick={open}
            aria-label={`Open cart, ${count} items`}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            {/* Shopping trolley: handle, mesh basket, two wheels */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinejoin="round">
              <defs>
                <clipPath id="cart-basket">
                  <path d="M5 8h17l-2.4 8.5H7.2Z" />
                </clipPath>
              </defs>
              <path d="M1.5 4.5H4.5V8" strokeWidth="1.8" strokeLinecap="square" />
              <g clipPath="url(#cart-basket)" strokeWidth="0.9">
                <path d="M2 8l9 9M6 8l9 9M10 8l9 9M14 8l9 9M18 8l9 9" />
                <path d="M9 8l-9 9M13 8l-9 9M17 8l-9 9M21 8l-9 9M25 8l-9 9" />
              </g>
              <path d="M5 8h17l-2.4 8.5H7.2Z" strokeWidth="1.8" />
              <circle cx="9.3" cy="20" r="1.7" fill="currentColor" stroke="none" />
              <circle cx="17.6" cy="20" r="1.7" fill="currentColor" stroke="none" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-amber-600 text-white text-[11px] font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onLinkClick(l.href)}
              className="block px-6 py-4 border-b border-gray-50 text-gray-700 active:bg-gray-50"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
