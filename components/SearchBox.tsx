"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBox({
  defaultValue = "",
  autoFocus = false,
  onSubmitted,
}: {
  defaultValue?: string;
  autoFocus?: boolean;
  onSubmitted?: () => void;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = value.trim();
        if (!q) return;
        router.push(`/search?q=${encodeURIComponent(q)}`);
        onSubmitted?.();
      }}
      className="flex items-center gap-2 rounded-full border border-gray-300 bg-white pl-5 pr-1.5 py-1.5 focus-within:border-black transition"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0" aria-hidden>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus={autoFocus}
        placeholder="Search oversized, acid wash, black, offers…"
        aria-label="Search T-shirts"
        className="flex-1 min-w-0 bg-transparent py-2 outline-none"
      />
      <button type="submit" className="bg-black text-white rounded-full px-5 py-2 text-sm font-semibold hover:bg-gray-800 transition">
        Search
      </button>
    </form>
  );
}
