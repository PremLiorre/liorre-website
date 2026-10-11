"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="min-w-0">
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
        <Image
          src={images[active]}
          alt={alt}
          fill
          preload
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain"
        />
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
    </div>
  );
}
