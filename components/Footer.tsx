import Image from "next/image";
import Link from "next/link";
import { TruckIcon } from "./Icons";
import { SITE } from "@/lib/site";
import { publishedPolicies } from "@/lib/policies";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-6 justify-between items-center text-center md:text-left">
        <div className="flex items-center gap-3">
          <Image src="/logo-gold.jpg" alt="LIORRE" width={48} height={48} className="h-12 w-12 rounded-lg" />
          <p className="text-gray-500">© 2026 Liorre — Powered by {SITE.parent}</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
          <span className="inline-flex items-center gap-2 font-semibold text-gray-800">
            <TruckIcon className="text-amber-600" /> Pan India Delivery Available
          </span>
          <Link href="/shop" className="text-gray-600 hover:text-black transition">
            Shop
          </Link>
          <Link href="/bulk-orders" className="text-gray-600 hover:text-black transition">
            Bulk Orders
          </Link>
        </div>
      </div>

      {publishedPolicies.length > 0 && (
        <div className="bg-black">
          <nav
            aria-label="Policies"
            className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm"
          >
            {publishedPolicies.map((p) => (
              <Link key={p.slug} href={`/policies/${p.slug}`} className="text-gray-300 hover:text-white transition">
                {p.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </footer>
  );
}
