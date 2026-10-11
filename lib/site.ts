// Central contact settings — edit here and the whole site updates.

export const SITE = {
  name: "LIORRE",
  url: "https://liorre.in",
  parent: "Oraeon Group",
  email: "oraeongroup@gmail.com",
  instagramHandle: "liorre.in",
  instagramUrl: "https://www.instagram.com/liorre.in/",
  // Opens a DM thread with the brand account.
  instagramDmUrl: "https://ig.me/m/liorre.in",
  facebookUrl: "https://www.facebook.com/share/18Cxb1V344/?mibextid=wwXIfr",
  // Order WhatsApp number: country code + number, digits only.
  // If emptied, checkout falls back to Instagram only.
  whatsappNumber: "918749090305",
  // Optional Google Form for reviews; when set, a button to it appears in the reviews section.
  reviewFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeEd-lIC9h36cC0Ka5IIYGHJvD6t1PZkT_ZuCgs1TwRr3cTTA/viewform",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
