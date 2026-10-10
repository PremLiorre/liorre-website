import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-6 justify-between items-center text-center md:text-left">
        <div className="flex items-center gap-3">
          <Image src="/logo-sm.jpg" alt="Liorre Logo" width={32} height={32} className="h-8 w-auto" />
          <p className="text-gray-500">© 2026 Liorre — Powered by {SITE.parent}</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
          <Link href="/shop" className="text-gray-600 hover:text-black transition">
            Shop
          </Link>
          <a href={`mailto:${SITE.email}`} className="text-gray-600 hover:text-black transition">
            {SITE.email}
          </a>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition"
          >
            Instagram
          </a>
          <a
            href={SITE.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
