"use client";

import Image from "next/image";
import { useState } from "react";
import DiscountBadge from "./DiscountBadge";
import ImageViewer from "./ImageViewer";

export default function ProductGallery({
  images,
  alt,
  discountPercent,
}: {
  images: string[];
  alt: string;
  discountPercent?: number;
}) {
  const [active, setActive] = useState(0);
  // Desktop hover magnifier: cursor position over the photo, in %.
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);
  const [viewer, setViewer] = useState(false);

  function moveLens(e: React.PointerEvent<HTMLButtonElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setLens({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }

  return (
    <div className="min-w-0">
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
        <button
          type="button"
          onClick={() => setViewer(true)}
          onPointerMove={moveLens}
          onPointerLeave={() => setLens(null)}
          aria-label="Zoom in on photo"
          className="absolute inset-0 cursor-zoom-in"
        >
          <Image
            src={images[active]}
            alt={alt}
            fill
            preload
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain"
          />
          {lens && (
            <Image
              src={images[active]}
              alt=""
              fill
              unoptimized
              className="object-contain bg-gray-100 pointer-events-none"
              style={{ transform: "scale(2.5)", transformOrigin: `${lens.x}% ${lens.y}%` }}
            />
          )}
        </button>
        {discountPercent && (
          <DiscountBadge percent={discountPercent} className="absolute top-2 left-2 w-14 h-14 sm:w-16 sm:h-16 pointer-events-none" />
        )}
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold shadow pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4M11 8v6M8 11h6" />
          </svg>
          <span className="hidden sm:inline">Hover or click to zoom</span>
          <span className="sm:hidden">Tap to zoom</span>
        </span>
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={`relative w-20 h-20 shrink-0 bg-gray-100 rounded-xl overflow-hidden border-2 transition ${
                i === active ? "border-black" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-contain" />
            </button>
          ))}
        </div>
      )}

      {viewer && <ImageViewer images={images} alt={alt} start={active} onClose={() => setViewer(false)} />}
    </div>
  );
}
