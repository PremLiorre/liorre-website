"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { SIZES } from "@/lib/products";

export default function AddToCart({ slug }: { slug: string }) {
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);

  return (
    <div>
      <p className="font-semibold">Select Size</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {SIZES.map((s) => (
          <button
            key={s}
            onClick={() => {
              setSize(s);
              setError(false);
            }}
            aria-pressed={size === s}
            className={`min-w-12 h-12 px-3 rounded-xl border font-semibold transition ${
              size === s ? "bg-black text-white border-black" : "border-gray-300 hover:border-black"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">Please choose a size.</p>}

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
