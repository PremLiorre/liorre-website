import Image from "next/image";
import Link from "next/link";

type Item = { src: string; alt: string; href?: string };

// Continuously scrolling strip of images. The list is rendered twice so the
// CSS animation (see .marquee-track in globals.css) loops seamlessly.
export default function Marquee({
  items,
  height = "h-64 sm:h-80",
  duration = 40,
  sizes = "480px",
}: {
  items: Item[];
  height?: string;
  duration?: number;
  sizes?: string;
}) {
  return (
    <div className="marquee overflow-hidden">
      <div className="marquee-track flex w-max gap-4" style={{ animationDuration: `${duration}s` }}>
        {[...items, ...items].map((item, i) => {
          const img = (
            <div className={`${height} rounded-2xl overflow-hidden bg-gray-100 shrink-0`}>
              {/* width/height 0 + auto width keeps each photo's own shape */}
              <Image
                src={item.src}
                alt={item.alt}
                width={0}
                height={0}
                sizes={sizes}
                className="h-full w-auto"
              />
            </div>
          );
          return (
            <div key={i} aria-hidden={i >= items.length}>
              {item.href ? (
                <Link href={item.href} tabIndex={i >= items.length ? -1 : undefined}>
                  {img}
                </Link>
              ) : (
                img
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
