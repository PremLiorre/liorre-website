import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { FavouritesProvider } from "@/components/FavouritesContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Liorre by Oraeon Group — premium oversized, acid wash and regular fit graphic T-shirts. Shop online with Pan India delivery; order via WhatsApp or Instagram.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: "LIORRE",
  title: {
    default: "LIORRE — Premium Oversized & Regular Fit T-Shirts",
    template: "%s | LIORRE",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "LIORRE",
    url: "/",
    title: "LIORRE — Premium Oversized & Regular Fit T-Shirts",
    description: DESCRIPTION,
    images: [{ url: "/banners/oversized-acid-wash-stream.jpg", width: 1672, height: 941, alt: "LIORRE oversized acid wash T-shirt" }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "LIORRE — Premium Oversized & Regular Fit T-Shirts",
    description: DESCRIPTION,
    images: ["/banners/oversized-acid-wash-stream.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${SITE.url}/#organization`,
                name: "LIORRE",
                alternateName: "Liorre",
                url: SITE.url,
                logo: `${SITE.url}/icon.png`,
                email: SITE.email,
                parentOrganization: { "@type": "Organization", name: SITE.parent },
                sameAs: [SITE.instagramUrl, SITE.facebookUrl],
              },
              {
                "@type": "WebSite",
                "@id": `${SITE.url}/#website`,
                name: "LIORRE",
                alternateName: "Liorre",
                url: SITE.url,
                publisher: { "@id": `${SITE.url}/#organization` },
              },
            ],
          }}
        />
        <FavouritesProvider>
          <CartProvider>
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </FavouritesProvider>
      </body>
    </html>
  );
}
