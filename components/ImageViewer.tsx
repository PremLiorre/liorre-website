"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const MIN = 1;
const MAX = 4;
const TAP_ZOOM = 2.5;

type View = { s: number; x: number; y: number };

// Full-screen photo viewer for checking fabric texture up close.
// Tap / double-click to zoom in or out, pinch or scroll to zoom, drag to move around.
export default function ImageViewer({
  images,
  alt,
  start,
  onClose,
}: {
  images: string[];
  alt: string;
  start: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(start);
  const [view, setView] = useState<View>({ s: 1, x: 0, y: 0 });
  // No easing while a finger/mouse is moving the photo, so it tracks exactly.
  const [dragging, setDragging] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  // Photo aspect ratio (w / h), to keep panning inside the visible photo, not the letterbox.
  const ratio = useRef(1);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ view: View; dist: number; mid: { x: number; y: number }; moved: boolean; t: number } | null>(null);

  // Keep the photo from being dragged off screen.
  const clamp = useCallback((v: View): View => {
    const r = box.current?.getBoundingClientRect();
    const s = Math.min(MAX, Math.max(MIN, v.s));
    if (!r || s === 1) return { s, x: 0, y: 0 };
    const w = Math.min(r.width, r.height * ratio.current);
    const h = Math.min(r.height, r.width / ratio.current);
    const mx = Math.max(0, (s * w - r.width) / 2);
    const my = Math.max(0, (s * h - r.height) / 2);
    return { s, x: Math.min(mx, Math.max(-mx, v.x)), y: Math.min(my, Math.max(-my, v.y)) };
  }, []);

  // Zoom to `s`, keeping the point under (cx, cy) (screen coords) in place.
  const zoomAt = useCallback(
    (from: View, s: number, cx: number, cy: number) => {
      const r = box.current!.getBoundingClientRect();
      const px = cx - (r.left + r.width / 2);
      const py = cy - (r.top + r.height / 2);
      const lx = (px - from.x) / from.s;
      const ly = (py - from.y) / from.s;
      return clamp({ s, x: px - s * lx, y: py - s * ly });
    },
    [clamp],
  );

  const go = useCallback(
    (d: number) => {
      setIndex((i) => (i + d + images.length) % images.length);
      setView({ s: 1, x: 0, y: 0 });
    },
    [images.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  // Wheel needs a non-passive listener so the page doesn't scroll.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setView((v) => zoomAt(v, v.s * Math.exp(-e.deltaY * 0.002), e.clientX, e.clientY));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  function snapshot() {
    const pts = [...pointers.current.values()];
    const mid = pts.length === 2 ? { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 } : pts[0];
    const dist = pts.length === 2 ? Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) : 0;
    return { mid, dist };
  }

  function onPointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const { mid, dist } = snapshot();
    gesture.current = { view, dist, mid, moved: pointers.current.size > 1, t: Date.now() };
    setDragging(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!pointers.current.has(e.pointerId) || !gesture.current) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    const { mid, dist } = snapshot();
    if (Math.hypot(mid.x - g.mid.x, mid.y - g.mid.y) > 6) g.moved = true;
    let next = g.view;
    if (pointers.current.size === 2 && g.dist > 0) {
      next = zoomAt(g.view, g.view.s * (dist / g.dist), g.mid.x, g.mid.y);
    }
    setView(clamp({ ...next, x: next.x + mid.x - g.mid.x, y: next.y + mid.y - g.mid.y }));
  }

  function onPointerUp(e: React.PointerEvent) {
    const g = gesture.current;
    pointers.current.delete(e.pointerId);
    if (g && !g.moved && pointers.current.size === 0 && Date.now() - g.t < 400) {
      setView((v) => (v.s > 1 ? { s: 1, x: 0, y: 0 } : zoomAt(v, TAP_ZOOM, e.clientX, e.clientY)));
    }
    // Restart the gesture from the remaining finger (pinch → drag).
    const { mid, dist } = snapshot();
    gesture.current = pointers.current.size ? { view, dist, mid, moved: true, t: 0 } : null;
    setDragging(pointers.current.size > 0);
  }

  const btn = "w-11 h-11 rounded-full bg-white/90 shadow flex items-center justify-center text-xl hover:bg-white";
  const zoomBy = (f: number) => {
    const r = box.current!.getBoundingClientRect();
    setView((v) => zoomAt(v, v.s * f, r.left + r.width / 2, r.top + r.height / 2));
  };

  return (
    <div role="dialog" aria-modal="true" aria-label={`${alt} — zoom view`} className="fixed inset-0 z-[100] bg-gray-100 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm text-gray-500">
          {index + 1} / {images.length}
        </span>
        <span className="hidden sm:block text-sm text-gray-500">Scroll or click to zoom · drag to move</span>
        <span className="sm:hidden text-sm text-gray-500">Pinch or tap to zoom</span>
        <button type="button" onClick={onClose} aria-label="Close zoom view" className={btn}>
          ✕
        </button>
      </div>

      <div
        ref={box}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={`relative flex-1 overflow-hidden touch-none select-none ${view.s > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`,
            transition: dragging ? "none" : "transform 0.2s ease-out",
          }}
        >
          {/* Original file, not resized, so the fabric texture stays sharp when zoomed. */}
          <Image src={images[index]} alt={alt} fill unoptimized draggable={false} onLoad={(e) => (ratio.current = e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)} className="object-contain pointer-events-none" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 py-4">
        {images.length > 1 && (
          <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={btn}>
            ‹
          </button>
        )}
        <button type="button" onClick={() => zoomBy(1 / 1.5)} aria-label="Zoom out" disabled={view.s <= MIN} className={`${btn} disabled:opacity-40`}>
          −
        </button>
        <button type="button" onClick={() => zoomBy(1.5)} aria-label="Zoom in" disabled={view.s >= MAX} className={`${btn} disabled:opacity-40`}>
          +
        </button>
        {images.length > 1 && (
          <button type="button" onClick={() => go(1)} aria-label="Next image" className={btn}>
            ›
          </button>
        )}
      </div>
    </div>
  );
}
