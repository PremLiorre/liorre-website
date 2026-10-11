export type Review = {
  name: string;
  city?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  productSlug?: string;
};

// Add real customer reviews here (from the feedback emails you receive).
// Ratings on product cards and the reviews section are calculated from this list.
// Example:
// { name: "Arjun", city: "Bengaluru", rating: 5, text: "Fabric is super soft.", productSlug: "lost-in-kyoto" },
export const reviews: Review[] = [];

// What customers have told us offline (no individual ratings) — shown as highlights.
export const lovedFor = ["Softness", "Comfort", "Quality", "Long Life"];

export function ratingFor(productSlug?: string) {
  const list = productSlug
    ? reviews.filter((r) => r.productSlug === productSlug)
    : reviews;
  if (list.length === 0) return null;
  const avg = list.reduce((sum, r) => sum + r.rating, 0) / list.length;
  return { average: Math.round(avg * 10) / 10, count: list.length };
}
