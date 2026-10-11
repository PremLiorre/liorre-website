// Home page banner slideshow (top of the page). Add a banner by dropping the image
// in public/banners/ (use a NEW filename each time) and adding one line here.
// Banners should be wide (about 16:9, e.g. 1672 × 941) with text designed into the image.

export type Banner = { src: string; alt: string; href: string };

export const banners: Banner[] = [
  {
    src: "/banners/oversized-acid-wash-stream.jpg",
    alt: "Liorre Oversized Acid Wash — Bolder look. Softer feel. Shop now.",
    href: "/product/built-different",
  },
  {
    src: "/banners/lost-in-kyoto-sakura.jpg",
    alt: "Liorre Lost in Kyoto — premium oversized T-shirt. Shop now.",
    href: "/product/lost-in-kyoto",
  },
  {
    src: "/banners/metro-state-of-mind.jpg",
    alt: "Liorre Metro State of Mind — Have Wine, Be Fine oversized acid wash T-shirt. Shop now.",
    href: "/product/have-wine-be-fine",
  },
  {
    src: "/banners/city-mood.jpg",
    alt: "Liorre City Mood — One Step At A Time oversized acid wash T-shirt. Shop now.",
    href: "/product/one-step-at-a-time",
  },
  {
    src: "/banners/focus-times-square.jpg",
    alt: "Liorre Focus — The Journey Begins Within oversized T-shirt. Shop now.",
    href: "/product/focus-panda",
  },
];
