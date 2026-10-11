import type { Metadata } from "next";
import { MailIcon } from "@/components/Icons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bulk Orders",
  description: "Bulk, wholesale and corporate T-shirt orders from Liorre.",
};

export default function BulkOrdersPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <p className="uppercase tracking-[0.3em] text-amber-600 text-sm mb-4">Wholesale &amp; Corporate</p>
      <h1 className="text-3xl sm:text-4xl font-bold">Bulk Orders</h1>

      <p className="mt-6 text-lg text-gray-700 leading-8">
        We surely do bulk / wholesale orders and ship with reputed courier services.
      </p>

      <div className="mt-8 rounded-3xl bg-gray-50 border border-gray-100 p-6 sm:p-8">
        <h2 className="text-xl font-bold">For Bulk Queries &amp; Corporate Orders</h2>
        <p className="mt-2 text-gray-700">Please write to us at</p>
        <a
          href={`mailto:${SITE.email}?subject=Bulk%20Order%20Enquiry`}
          className="mt-3 inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          <MailIcon /> {SITE.email}
        </a>

        <ul className="mt-6 space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="text-amber-600">•</span>
            You are requested to contact for bulk queries after you get a list of required items ready.
          </li>
          <li className="flex gap-3">
            <span className="text-amber-600">•</span>
            For samples required for FUTURE bulk orders, you are requested to place the orders on the website only.
          </li>
        </ul>
      </div>
    </main>
  );
}
