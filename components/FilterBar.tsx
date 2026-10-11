import Link from "next/link";
import { FILTERS, SORTS, shopHref, type FilterKey, type SortKey } from "@/lib/filters";

// Filter + price-sort chips. On the home page nothing is active and each chip opens the shop.
export default function FilterBar({
  filter = "all",
  sort = null,
  showAll = true,
}: {
  filter?: FilterKey;
  sort?: SortKey | null;
  showAll?: boolean;
}) {
  const chip = (active: boolean) =>
    `shrink-0 px-5 py-2 rounded-full border text-sm sm:text-base transition ${
      active ? "bg-black text-white border-black" : "bg-white border-gray-300 hover:border-black"
    }`;

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center -mx-4 px-4">
      {FILTERS.filter((f) => showAll || f.key !== "all").map((f) => (
        <Link key={f.key} href={shopHref(f.key, sort)} scroll={false} className={chip(filter === f.key)}>
          {f.label}
        </Link>
      ))}
      <span className="shrink-0 w-px bg-gray-200 mx-1" aria-hidden />
      {SORTS.map((s) => (
        <Link
          key={s.key}
          href={shopHref(filter, sort === s.key ? null : s.key)}
          scroll={false}
          className={chip(sort === s.key)}
        >
          {s.label}
        </Link>
      ))}
    </div>
  );
}
