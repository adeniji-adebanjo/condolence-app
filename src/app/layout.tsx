import type { Metadata } from "next";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </body>
    </html>
  );
}
