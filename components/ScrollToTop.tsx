"use client";

import { useEffect } from "react";

// Back/forward navigations should restore the previous scroll position, so remember them.
let cameFromHistory = false;
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    cameFromHistory = true;
  });
}

// Rendered from app/template.tsx, which remounts on every navigation: open each new
// page at the very top so the running images / Back button aren't hidden under the
// sticky navbar. Section links (/#reviews) keep scrolling to their section.
export default function ScrollToTop() {
  useEffect(() => {
    if (cameFromHistory) {
      cameFromHistory = false;
      return;
    }
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);
  return null;
}
