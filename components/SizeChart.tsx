import Image from "next/image";
import type { Fit } from "@/lib/products";

const CHARTS: Partial<Record<Fit, { src: string; title: string }>> = {
  Oversized: { src: "/size-charts/oversized-size-chart.jpg", title: "Oversized T-Shirt Size Chart" },
  "Regular Fit": { src: "/size-charts/regular-fit-size-chart.jpg", title: "Regular Fit T-Shirt Size Chart" },
};

// Shown on product pages below Wash Care. Tap the chart to open it full size.
export default function SizeChart({ fit }: { fit: Fit }) {
  const chart = CHARTS[fit];
  if (!chart) return null;
  return (
    <section id="size-chart" className="mt-6">
      <h2 className="text-xl font-bold mb-3">Size Chart</h2>
      <a href={chart.src} target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden border border-gray-100">
        <Image
          src={chart.src}
          alt={`${chart.title} — chest, length, shoulder and sleeve measurements in inches for sizes XS to XXL`}
          width={1536}
          height={1024}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="w-full h-auto"
        />
      </a>
      <p className="mt-2 text-sm text-gray-500">Measurements in inches. Tap the chart to view it full size.</p>
    </section>
  );
}
