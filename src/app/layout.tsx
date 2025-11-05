import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { AnimatePresence } from "framer-motion";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grandma Priscilla Ofunneamaka Adubu-Olaniyan",
  description:
    "In Loving Memory of Priscilla Ofunneamaka Adubu-Olaniyan (13th March 1951 – 29th October 2025). Share your condolences, memories, and testimonies.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {/* Google Analytics (gtag.js) - measurement ID: G-S06N2MCEGK */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S06N2MCEGK"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S06N2MCEGK');`,
          }}
        />

        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </body>
    </html>
  );
}
