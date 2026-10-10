"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string; title?: string; subtitle?: string; href?: string };

// Shows one image at a time and auto-advances; swipe/arrow/dot controls included.
export default function Slider({
  slides,
  interval = 4000,
  className = "aspect-[4/5] sm:aspect-[16/10]",
  preloadFirst = false,
}: {
  slides: Slide[];
  interval?: number;
  className?: string;
  preloadFirst?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [paused, slides.length, interval]);

  const go = (delta: number) => setIndex((i) => (i + delta + slides.length) % slides.length);

  return (
    <div
      className={`relative min-w-0 overflow-hidden rounded-3xl shadow-xl bg-gray-100 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        setTouchX(null);
      }}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => {
          const body = (
            <>
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                preload={preloadFirst && i === 0}
                className="object-contain"
              />
              {(s.title || s.subtitle) && (
                <div className="absolute inset-x-0 bottom-0 p-6 pb-12 bg-gradient-to-t from-black/70 to-transparent text-white">
                  {s.subtitle && <p className="text-xs uppercase tracking-[0.25em] text-amber-300">{s.subtitle}</p>}
                  {s.title && <p className="text-xl sm:text-2xl font-bold mt-1">{s.title}</p>}
                </div>
              )}
            </>
          );
          return (
            <div key={s.src} className="relative h-full w-full shrink-0" aria-hidden={i !== index}>
              {s.href ? (
                <Link href={s.href} tabIndex={i === index ? undefined : -1} className="block h-full">
                  {body}
                </Link>
              ) : (
                body
              )}
            </div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow"
          >
            ‹
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next image"
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow"
          >
            ›
          </button>
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.src}
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/60"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
