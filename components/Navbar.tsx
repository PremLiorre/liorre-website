"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { useFavourites } from "./FavouritesContext";
import SearchBox from "./SearchBox";
import FilterBar from "./FilterBar";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-[72px] sm:h-20 md:h-[88px] flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0" onClick={onLinkClick("/")}>
          <Image src="/logo-gold.jpg" alt="Liorre Logo" width={64} height={64} preload className="h-10 w-10 min-[360px]:h-11 min-[360px]:w-11 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-xl" />
          <span className="text-lg min-[360px]:text-xl sm:text-2xl md:text-[1.7rem] font-bold tracking-wide">LIORRE</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-7">
          {links.filter((l) => l.href !== "/favourites").map((l) => (
            <Link key={l.href} href={l.href} onClick={onLinkClick(l.href)} className="text-gray-600 hover:text-black transition">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-0 sm:gap-1">
          <button
            onClick={() => {
              setSearchOpen((v) => !v);
              setMenuOpen(false);
              setFilterOpen(false);
            }}
            aria-label="Search"
            aria-expanded={searchOpen}
            className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </button>

          <button
            onClick={() => {
              setFilterOpen((v) => !v);
              setSearchOpen(false);
              setMenuOpen(false);
            }}
            aria-label="Filter T-shirts"
            aria-expanded={filterOpen}
            className={`p-1.5 sm:p-2 rounded-full transition ${filterOpen ? "bg-gray-100" : "hover:bg-gray-100"}`}
          >
            {/* Funnel / sliders icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
          </button>

          <Link
            href="/favourites"
            aria-label={`Favourites, ${slugs.length} saved`}
            className="relative p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition"
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
            className="relative p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition"
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
            onClick={() => {
              setMenuOpen((v) => !v);
              setSearchOpen(false);
              setFilterOpen(false);
            }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="lg:hidden p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {filterOpen && (
        <div
          className="border-t border-gray-100 bg-white px-4 sm:px-6 py-4"
          // Close the panel once a filter is chosen.
          onClick={(e) => (e.target as HTMLElement).closest("a") && setFilterOpen(false)}
        >
          <p className="text-center text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">Filter & Sort</p>
          <FilterBar />
        </div>
      )}

      {searchOpen && (
        <div className="border-t border-gray-100 bg-white px-4 sm:px-6 py-3">
          <div className="max-w-2xl mx-auto">
            <SearchBox autoFocus onSubmitted={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
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
