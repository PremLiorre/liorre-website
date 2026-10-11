import { products, type Product } from "./products";
import { ratingFor } from "./reviews";

export type SearchResult = {
  products: Product[];
  // Short human-readable notes about how the query was understood (shown above results).
  notes: string[];
};

// Words that describe "a T-shirt" in general and shouldn't narrow the search.
const STOPWORDS = new Set([
  "t", "shirt", "shirts", "tshirt", "tshirts", "tee", "tees", "tees.", "top", "tops",
  "a", "an", "the", "for", "with", "in", "on", "and", "or", "of", "to", "me", "show", "find",
  "i", "want", "need", "all", "any", "some", "liorre", "products", "product", "item", "items",
  "men", "mens", "women", "womens", "unisex", "colour", "color", "colours", "colors", "price",
  "prices", "by", "design", "designs", "style", "styles", "please", "buy", "shop",
]);

// Colour words customers may type → words that appear in product colours.
const COLOURS: Record<string, string[]> = {
  black: ["black"],
  white: ["white"],
  beige: ["beige"],
  cream: ["beige"],
  offwhite: ["beige", "white"],
  maroon: ["maroon"],
  red: ["maroon"],
  burgundy: ["maroon"],
  green: ["green"],
  olive: ["green"],
  bottle: ["green"],
  sage: ["sage"],
  wine: ["wine"],
  grape: ["grape"],
  purple: ["grape"],
  brown: ["grape"],
  navy: ["navy"],
  blue: ["navy"],
  grey: ["lava", "black"],
  gray: ["lava", "black"],
  lava: ["lava"],
};

// Single-word intents.
const KEYWORDS = [
  "oversized", "oversize", "baggy", "loose", "regular", "round", "neck", "crew", "polo", "collar",
  "acid", "wash", "washed", "offer", "offers", "discount", "discounts", "sale", "deal", "deals",
  "launch", "new", "latest", "arrival", "arrivals", "rated", "rating", "ratings", "best", "top",
  "popular", "cheap", "cheapest", "affordable", "expensive", "premium", "under", "below", "above",
  "over", "low", "high", "lowest", "highest", "instock", "available",
];

function levenshtein(a: string, b: string) {
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[b.length];
}

// What a product is (name, colour, design, fabric) — not styling tips like "pair with jeans".
const haystack = (p: Product) =>
  [
    p.name,
    p.fit,
    p.color,
    p.intro,
    ...p.highlights.filter((h) => h.label === "Style" || h.label === "Look").map((h) => h.value),
    ...p.specs.filter((s) => s.label !== "Care").map((s) => s.value),
  ]
    .join(" ")
    .toLowerCase();

const vocabulary = Array.from(
  new Set([
    ...KEYWORDS,
    ...Object.keys(COLOURS),
    ...products.flatMap((p) => haystack(p).split(/[^a-z0-9]+/)).filter((w) => w.length >= 3),
  ]),
);

// Fix small typos ("ovsersized" → "oversized") against words the site knows.
function correct(word: string) {
  if (word.length < 4 || vocabulary.includes(word) || STOPWORDS.has(word)) return word;
  const maxDistance = word.length >= 7 ? 2 : 1;
  let best = word;
  let bestDistance = maxDistance + 1;
  for (const v of vocabulary) {
    if (Math.abs(v.length - word.length) > maxDistance) continue;
    const d = levenshtein(word, v);
    if (d < bestDistance) {
      best = v;
      bestDistance = d;
    }
  }
  return best;
}

export function searchProducts(rawQuery: string): SearchResult {
  const notes: string[] = [];
  let q = ` ${rawQuery.toLowerCase().replace(/[₹,]/g, " ").replace(/t-shirts?/g, " ").replace(/\s+/g, " ")} `;

  // --- Sort intents (phrases first) ---
  let sort: "asc" | "desc" | "rating" | null = null;
  if (/\b(low to high|lowest|cheapest|cheap|affordable|budget|price asc)\b/.test(q)) sort = "asc";
  if (/\b(high to low|highest|expensive|costly|price desc)\b/.test(q)) sort = "desc";
  if (/\b(highly rated|top rated|best rated|best|rated|rating|ratings|popular|top)\b/.test(q)) sort = "rating";
  q = q.replace(/\b(low to high|high to low|highly rated|top rated|best rated)\b/g, " ");

  // --- Price limits: "under 800", "below ₹850", "above 800" ---
  let maxPrice: number | null = null;
  let minPrice: number | null = null;
  q = q.replace(/\b(under|below|less than|upto|up to|within)\s*(\d{2,5})\b/g, (_, __, n) => {
    maxPrice = Number(n);
    return " ";
  });
  q = q.replace(/\b(above|over|more than)\s*(\d{2,5})\b/g, (_, __, n) => {
    minPrice = Number(n);
    return " ";
  });

  // --- Phrases ---
  const phrase = (re: RegExp) => {
    const hit = re.test(q);
    if (hit) q = q.replace(re, " ");
    return hit;
  };
  let acidWash = phrase(/\bacid\s*wash(ed)?\b/g);
  let roundNeck = phrase(/\b(round|crew)\s*neck\b/g);
  let regular = phrase(/\bregular\s*fit\b/g);
  let isNewOnly = phrase(/\bnew\s*arrivals?\b/g);

  // --- Words ---
  let fit: Product["fit"] | null = null;
  let offerOnly = false;
  const colourTargets: string[] = [];
  const textTerms: string[] = [];

  for (const raw of q.split(/[^a-z0-9]+/).filter(Boolean)) {
    if (STOPWORDS.has(raw) || /^\d+$/.test(raw)) continue;
    const w = correct(raw);
    if (["oversized", "oversize", "baggy", "loose"].includes(w)) fit = "Oversized";
    else if (w === "regular") regular = true;
    else if (["round", "neck", "crew"].includes(w)) roundNeck = true;
    else if (["polo", "polos", "collar"].includes(w)) fit = "Polo";
    else if (["acid", "wash", "washed"].includes(w)) acidWash = true;
    else if (["offer", "offers", "discount", "discounts", "sale", "deal", "deals", "launch"].includes(w)) offerOnly = true;
    else if (["new", "latest", "arrival", "arrivals"].includes(w)) isNewOnly = true;
    else if (COLOURS[w]) colourTargets.push(...COLOURS[w]);
    else if (["instock", "available"].includes(w)) continue;
    else if (KEYWORDS.includes(w)) continue; // sort/price words already handled
    else textTerms.push(w);
  }

  if (regular) fit = "Regular Fit";

  let list = products.filter((p) => {
    const color = p.color.toLowerCase();
    if (fit && p.fit !== fit) return false;
    if (roundNeck && p.fit === "Polo") return false;
    if (acidWash && !color.includes("acid wash")) return false;
    if (offerOnly && !p.launchOffer) return false;
    if (isNewOnly && !p.isNew) return false;
    if (colourTargets.length && !colourTargets.some((c) => color.includes(c))) return false;
    if (maxPrice !== null && p.price > maxPrice) return false;
    if (minPrice !== null && p.price < minPrice) return false;
    const text = haystack(p);
    return textTerms.every((t) => text.includes(t));
  });

  if (sort === "asc") {
    list = [...list].sort((a, b) => a.price - b.price);
    notes.push("Price: low to high");
  } else if (sort === "desc") {
    list = [...list].sort((a, b) => b.price - a.price);
    notes.push("Price: high to low");
  } else if (sort === "rating") {
    const score = (p: Product) => ratingFor(p.slug)?.average ?? 0;
    list = [...list].sort((a, b) => score(b) - score(a));
    if (list.every((p) => !ratingFor(p.slug))) notes.push("Ratings are coming soon — showing all matching styles");
    else notes.push("Highest rated first");
  }

  // Sold-out items go last.
  list = [...list].sort((a, b) => Number(a.outOfStock ?? false) - Number(b.outOfStock ?? false));

  return { products: list, notes };
}
