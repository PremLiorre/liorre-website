export type Fit = "Oversized" | "Regular Fit" | "Polo";

export type Product = {
  slug: string;
  name: string;
  fit: Fit;
  color: string;
  price: number;
  launchOffer?: boolean;
  images: string[];
  // Opening paragraph of the description.
  intro: string;
  // "Product Highlights" bullets (Fit, Style, Look, Versatility, Care).
  highlights: { label: string; value: string }[];
  isNew?: boolean;
  specs: { label: string; value: string }[];
  // Show the full Liorre wash-care list on the product page.
  showCare?: boolean;
};

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const DESCRIPTION_SIGNOFF = ["Style it your way. Wear your story.", "Liorre — Dreams Are Valid."];

export const CARE_INSTRUCTIONS = [
  "Machine wash cold (30°C maximum).",
  "Wash with similar colours.",
  "Turn inside out before washing.",
  "Do not bleach.",
  "Dry in shade.",
  "Iron on low heat inside out.",
  "Do not iron directly on prints.",
  "Avoid high-heat tumble drying.",
];
export const CARE_SIGNOFF = "Care for your Liorre. Wear it longer.";

const FABRIC = { label: "Fabric", value: "100% Cotton — bio washed, silicon washed" };
const SIZE_RANGE = { label: "Sizes", value: SIZES.join(", ") };

const oversizedSpecs = [
  { label: "Fit", value: "Oversized" },
  FABRIC,
  { label: "Weight", value: "260 GSM" },
  SIZE_RANGE,
];

const acidWashSpecs = [
  ...oversizedSpecs,
  { label: "Finish", value: "Acid wash — every piece is unique" },
];

const regularSpecs = [
  { label: "Fit", value: "Regular fit" },
  FABRIC,
  { label: "Weight", value: "220 GSM" },
  SIZE_RANGE,
];

const OVERSIZED_FIT = { label: "Fit", value: "Relaxed oversized silhouette" };
const REGULAR_FIT = { label: "Fit", value: "Classic regular fit" };
const CARE = { label: "Care", value: "Machine wash cold, inside out; dry in shade" };
const PAIRS_OVERSIZED = { label: "Versatility", value: "Easy to pair with jeans, cargos, or shorts" };
const PAIRS_REGULAR = { label: "Versatility", value: "Easy to pair with jeans, chinos, or cargos" };

export const products: Product[] = [
  {
    slug: "lost-in-kyoto",
    name: "Lost in Kyoto",
    fit: "Oversized",
    color: "Black",
    price: 849,
    images: ["/products/lost-in-kyoto-1.jpg", "/products/lost-in-kyoto-2.jpg"],
    intro:
      "Inspired by the quiet beauty and timeless charm of Kyoto, this design brings together modern streetwear and artistic expression. The Lost in Kyoto T-shirt is made for those who appreciate distinctive graphics, effortless style, and a relaxed silhouette.",
    highlights: [
      OVERSIZED_FIT,
      { label: "Style", value: "Kyoto-inspired graphic design" },
      { label: "Look", value: "Contemporary, minimal streetwear" },
      PAIRS_OVERSIZED,
      CARE,
    ],
    isNew: true,
    specs: oversizedSpecs,
    showCare: true,
    launchOffer: true,
  },
  {
    slug: "focus-panda",
    name: "Focus — The Journey Begins Within",
    fit: "Oversized",
    color: "White",
    price: 849,
    images: ["/products/focus-panda-1.jpg", "/products/focus-panda-2.jpg"],
    intro:
      "Inspired by the calm strength of the panda and the balance of yin and yang, this design is a reminder that every great journey begins within. The Focus T-shirt pairs a clean white canvas with a bold back graphic, made for those who move with intention and wear their mindset with pride.",
    highlights: [
      OVERSIZED_FIT,
      { label: "Style", value: "Yin-yang Focus chest patch with Panda back print" },
      { label: "Look", value: "Clean, bold streetwear" },
      PAIRS_OVERSIZED,
      CARE,
    ],
    isNew: true,
    specs: oversizedSpecs,
    showCare: true,
    launchOffer: true,
  },
  {
    slug: "built-different",
    name: "Built Different",
    fit: "Oversized",
    color: "Lava Black Acid Wash",
    price: 849,
    images: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/products/built-different-lava-${n}.jpg`),
    intro:
      "Made for those who refuse to blend in, Built Different pairs a rugged lava-black acid wash with a raw, distressed back graphic. Every piece carries its own wash pattern, just like the person wearing it. The Built Different T-shirt is for those who set their own standards and back them with quiet confidence.",
    highlights: [
      OVERSIZED_FIT,
      { label: "Style", value: "Distressed Built Different back print with Liorre chest logo" },
      { label: "Look", value: "Washed, rugged streetwear" },
      PAIRS_OVERSIZED,
      CARE,
    ],
    isNew: true,
    specs: acidWashSpecs,
    showCare: true,
    launchOffer: true,
  },
  {
    slug: "shiki",
    name: "Shiki — Four Seasons",
    fit: "Oversized",
    color: "Beige",
    price: 799,
    images: [
      "/products/shiki-1.jpg",
      "/products/shiki-front.jpg",
      "/products/shiki-back.jpg",
      "/products/shiki-4.jpg",
    ],
    intro:
      "Shiki, the Japanese word for the four seasons, celebrates change, growth, and the beauty in every phase of life. A four-panel seasonal artwork on the front meets 四季一魂 — “four seasons, one soul” — calligraphy on the back. The Shiki T-shirt is made for those who stay true to themselves through every season.",
    highlights: [
      OVERSIZED_FIT,
      { label: "Style", value: "Four-seasons panel art with Japanese calligraphy back" },
      { label: "Look", value: "Soft, earthy minimal streetwear" },
      PAIRS_OVERSIZED,
      CARE,
    ],
    isNew: true,
    specs: oversizedSpecs,
    showCare: true,
    launchOffer: true,
  },
  {
    slug: "have-wine-be-fine",
    name: "Have Wine, Be Fine",
    fit: "Oversized",
    color: "Grape Wine Acid Wash",
    price: 799,
    images: [
      "/products/grape-wine-1.jpg",
      "/products/grape-wine-2.jpg",
      "/products/grape-wine-3.jpg",
    ],
    intro:
      "Made for slow evenings and good company, Have Wine, Be Fine brings a playful, vintage mood to everyday wear. A deep grape-wine acid wash sets the tone for a poster-style front graphic and a tall bottle print down the back. This T-shirt is for those who take life easy and wear their good vibes openly.",
    highlights: [
      OVERSIZED_FIT,
      { label: "Style", value: "Wine-glass poster front with bottle back print" },
      { label: "Look", value: "Vintage, washed streetwear" },
      PAIRS_OVERSIZED,
      CARE,
    ],
    isNew: true,
    specs: acidWashSpecs,
    showCare: true,
    launchOffer: true,
  },
  {
    slug: "one-step-at-a-time",
    name: "One Step At A Time",
    fit: "Oversized",
    color: "Bottle Green Acid Wash",
    price: 799,
    images: ["/products/one-step-model.jpg", "/products/one-step-2.jpg"],
    intro:
      "Progress is built one step at a time. Bold yellow typography on a bottle-green acid wash turns this T-shirt into a statement of patience, persistence, and quiet confidence. Made for those who keep moving forward, no matter the pace.",
    highlights: [
      OVERSIZED_FIT,
      { label: "Style", value: "One Step front and At A Time back graphic" },
      { label: "Look", value: "Bold, vintage-washed streetwear" },
      PAIRS_OVERSIZED,
      CARE,
    ],
    isNew: true,
    specs: acidWashSpecs,
    showCare: true,
    launchOffer: true,
  },
  {
    slug: "maroon-regular",
    name: "Maroon Line Art",
    fit: "Regular Fit",
    color: "Maroon",
    price: 799,
    images: ["/products/maroon-regular-1.jpg"],
    intro:
      "Clean lines and quiet emotion come together in this regular fit T-shirt. A fine line-art portrait on the front and vertical Japanese script on the back create a look that is subtle up close and striking from afar. Made for those who prefer their style understated but meaningful.",
    highlights: [
      REGULAR_FIT,
      { label: "Style", value: "Line-art portrait with Japanese script back" },
      { label: "Look", value: "Refined, artistic everyday wear" },
      PAIRS_REGULAR,
      CARE,
    ],
    isNew: true,
    specs: regularSpecs,
    showCare: true,
    launchOffer: true,
  },
  {
    slug: "nomad-culture",
    name: "Nomad Culture",
    fit: "Regular Fit",
    color: "Black",
    price: 799,
    images: ["/products/nomad-culture-1.jpg", "/products/nomad-culture-2.jpg"],
    intro:
      "Rooted in the spirit of wandering and ancient storytelling, Nomad Culture features a tribal-inspired graphic of figures and symbols that celebrate journeys, community, and heritage. The Nomad Culture T-shirt is made for explorers at heart who carry their roots wherever they go.",
    highlights: [
      REGULAR_FIT,
      { label: "Style", value: "Tribal-inspired Nomad Culture graphic" },
      { label: "Look", value: "Classic, timeless everyday wear" },
      PAIRS_REGULAR,
      CARE,
    ],
    isNew: true,
    specs: regularSpecs,
    showCare: true,
    launchOffer: true,
  },
  {
    slug: "polo-navy",
    name: "Polo — Navy Blue",
    fit: "Polo",
    color: "Navy Blue",
    price: 799,
    images: ["/polo-blue.jpg"],
    intro: "Premium polo t-shirt with embroidered Liorre branding.",
    highlights: [],
    specs: [
      { label: "Fit", value: "Regular fit polo" },
      { label: "Fabric", value: "Cotton blend pique" },
      { label: "Details", value: "Embroidered logo, ribbed collar" },
      { label: "Care", value: "Cold machine wash" },
    ],
  },
  {
    slug: "polo-sage",
    name: "Polo — Sage Green",
    fit: "Polo",
    color: "Sage Green",
    price: 799,
    images: ["/polo-green.jpg"],
    intro: "Modern premium polo crafted for everyday elegance and comfort.",
    highlights: [],
    specs: [
      { label: "Fit", value: "Regular fit polo" },
      { label: "Fabric", value: "Cotton blend pique" },
      { label: "Details", value: "Embroidered logo, ribbed collar" },
      { label: "Care", value: "Cold machine wash" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const newArrivals = products.filter((p) => p.isNew);
