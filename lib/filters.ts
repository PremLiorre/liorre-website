import type { Product } from "./products";

export const FILTERS = [
  { key: "all", label: "All" },
  { key: "oversized", label: "Oversized" },
  { key: "regular", label: "Regular Fit" },
  { key: "polo", label: "Polo" },
  { key: "offer", label: "Offers & Discounts" },
  { key: "new", label: "New Arrivals" },
] as const;

export const SORTS = [
  { key: "asc", label: "Price: Low to High" },
  { key: "desc", label: "Price: High to Low" },
] as const;

export type FilterKey = (typeof FILTERS)[number]["key"];
export type SortKey = (typeof SORTS)[number]["key"];

export function parseFilter(v: unknown): FilterKey {
  return FILTERS.some((f) => f.key === v) ? (v as FilterKey) : "all";
}

export function parseSort(v: unknown): SortKey | null {
  return SORTS.some((s) => s.key === v) ? (v as SortKey) : null;
}

export function applyFilters(list: Product[], filter: FilterKey, sort: SortKey | null) {
  let out = list.filter((p) => {
    if (filter === "new") return p.isNew;
    if (filter === "offer") return p.launchOffer;
    if (filter === "oversized") return p.fit === "Oversized";
    if (filter === "regular") return p.fit === "Regular Fit";
    if (filter === "polo") return p.fit === "Polo";
    return true;
  });
  if (sort) out = [...out].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
  return out;
}

export function shopHref(filter: FilterKey, sort: SortKey | null) {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("filter", filter);
  if (sort) params.set("sort", sort);
  const qs = params.toString();
  return qs ? `/shop?${qs}` : "/shop";
}
