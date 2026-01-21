import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Grandma Priscilla Ofunneamaka Adubu-Olaniyan",
  description:
    "In Loving Memory of Priscilla Ofunneamaka Adubu-Olaniyan (13th March 1951 – 29th October 2025). Share your condolences, memories, and testimonies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
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
      <body>{children}</body>
    </html>
  );
}
