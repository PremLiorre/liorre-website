"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { SIZES, getProduct } from "@/lib/products";

export default function AddToCart({ slug }: { slug: string }) {
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const [soldOutMsg, setSoldOutMsg] = useState<string | null>(null);
  const soldOut = getProduct(slug)?.soldOutSizes ?? [];

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-semibold">Select Size</p>
        {getProduct(slug)?.fit !== "Polo" && (
          <a href="#size-chart" className="text-sm font-semibold text-amber-700 hover:underline">
            Size Chart
          </a>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {SIZES.map((s) => {
          const isSoldOut = soldOut.includes(s);
          return (
            <button
              key={s}
              onClick={() => {
                if (isSoldOut) {
                  setSoldOutMsg(`Sorry, size ${s} is out of stock. Please choose another size.`);
                  setSize(null);
                  return;
                }
                setSize(s);
                setError(false);
                setSoldOutMsg(null);
              }}
              aria-pressed={size === s}
              aria-label={isSoldOut ? `${s} — out of stock` : s}
              title={isSoldOut ? "Out of stock" : undefined}
              className={`min-w-12 h-12 px-3 rounded-xl border font-semibold transition ${
                isSoldOut
                  ? "border-gray-200 text-gray-300 line-through bg-gray-50 cursor-not-allowed"
                  : size === s
                    ? "bg-black text-white border-black"
                    : "border-gray-300 hover:border-black"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>
      {soldOutMsg && (
        <p role="alert" className="mt-2 text-sm font-semibold text-red-600">
          {soldOutMsg}
        </p>
      )}
      {error && !soldOutMsg && <p className="mt-2 text-sm text-red-600">Please choose a size.</p>}

      <div className="mt-6 flex gap-3">
        <div className="flex items-center border border-gray-300 rounded-xl">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 h-14" aria-label="Decrease quantity">
            −
          </button>
          <span className="w-8 text-center font-semibold">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="px-4 h-14" aria-label="Increase quantity">
            +
          </button>
        </div>
        <button
          onClick={() => (size ? add(slug, size, qty) : setError(true))}
          className="flex-1 h-14 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
