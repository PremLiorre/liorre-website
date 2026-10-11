"use client";

import { usePathname, useRouter } from "next/navigation";

// Shown at the top of every page except Home.
export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/") return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4">
      <button
        onClick={() => (window.history.length > 1 ? router.back() : router.push("/"))}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition py-2"
      >
        <span aria-hidden className="text-xl leading-none">←</span> Back
      </button>
    </div>
  );
}
