"use client";

import { useEffect, useRef, useState } from "react";
import { FacebookIcon, WhatsAppIcon } from "./Icons";
import { SITE } from "@/lib/site";

function ShareIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" />
    </svg>
  );
}

// Phones get the native share sheet; everywhere else a small menu
// (WhatsApp, Facebook, Copy link) opens under the button.
export default function ShareButton({
  slug,
  name,
  withLabel = false,
  className = "",
}: {
  slug: string;
  name: string;
  withLabel?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const url = `${SITE.url}/product/${slug}`;
  const text = `Check out ${name} on LIORRE`;

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  async function share(e: React.MouseEvent) {
    // Cards are links; don't navigate when tapping share.
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
      try {
        await navigator.share({ title: `${name} | LIORRE`, text, url });
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
      }
    }
    setOpen((o) => !o);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link:", url);
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1500);
  }

  const item = "flex w-full items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-gray-50";

  return (
    <div ref={ref} className={`relative ${withLabel ? "w-full" : ""}`}>
      <button
        type="button"
        onClick={share}
        aria-label={`Share ${name}`}
        aria-expanded={open}
        className={`inline-flex items-center justify-center gap-2 transition ${className}`}
      >
        <ShareIcon />
        {withLabel && <span className="font-semibold">Share</span>}
      </button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 text-black shadow-xl"
        >
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${text}: ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={item}
          >
            <WhatsAppIcon size={18} className="text-green-600" /> WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={item}
          >
            <FacebookIcon size={18} className="text-blue-600" /> Facebook
          </a>
          <button type="button" onClick={copy} className={item}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
            </svg>
            {copied ? "Link copied!" : "Copy link"}
          </button>
        </div>
      )}
    </div>
  );
}
