"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { getProduct } from "@/lib/products";
import { SITE, formatPrice, whatsappLink } from "@/lib/site";

export default function CartDrawer() {
  const { items, total, isOpen, close, setQty, remove } = useCart();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const orderMessage = [
    "Hi Liorre! I'd like to order:",
    "",
    ...items.map((i, n) => {
      const p = getProduct(i.slug)!;
      return `${n + 1}. ${p.name} (${p.fit}, ${p.color}) — Size ${i.size} × ${i.qty} = ${formatPrice(p.price * i.qty)}`;
    }),
    "",
    `Total: ${formatPrice(total)}`,
  ].join("\n");

  // Instagram can't prefill a DM, so copy the order first for the customer to paste.
  const orderOnInstagram = async () => {
    try {
      await navigator.clipboard.writeText(orderMessage);
      setCopied(true);
    } catch {}
    window.open(SITE.instagramDmUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={close} aria-label="Close cart" className="text-2xl leading-none p-2 -m-2">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <p className="text-gray-500">Your cart is empty.</p>
            <Link
              href="/shop"
              onClick={close}
              className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-gray-100 px-6">
              {items.map((i) => {
                const p = getProduct(i.slug)!;
                return (
                  <li key={`${i.slug}-${i.size}`} className="py-4 flex gap-4">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      width={80}
                      height={96}
                      className="w-20 h-24 object-contain rounded-xl bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{p.name}</p>
                      <p className="text-sm text-gray-500">
                        {p.fit} · Size {i.size}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() => setQty(i.slug, i.size, i.qty - 1)}
                            className="px-3 py-1"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-6 text-center">{i.qty}</span>
                          <button
                            onClick={() => setQty(i.slug, i.size, i.qty + 1)}
                            className="px-3 py-1"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => remove(i.slug, i.size)}
                          className="text-sm text-gray-400 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="font-semibold">{formatPrice(p.price * i.qty)}</p>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-gray-100 px-6 py-5 space-y-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-gray-500">
                Orders are confirmed over chat. Our team will share payment and
                delivery details.
              </p>

              {SITE.whatsappNumber && (
                <a
                  href={whatsappLink(orderMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[#25D366] text-white font-semibold py-3 rounded-xl hover:brightness-95 transition"
                >
                  Order on WhatsApp
                </a>
              )}
              <button
                onClick={orderOnInstagram}
                className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Order on Instagram
              </button>
              {copied && (
                <p className="text-xs text-green-700 text-center">
                  Order copied — paste it in the Instagram chat.
                </p>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
