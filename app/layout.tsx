import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/footer/Footer";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Providers } from "@/components/providers/Providers";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
   metadataBase: new URL(siteConfig.url),// placeholder — confirm domain
  title: {
    default: "Afaq Al Manzel Interiors | Interior Design & Turnkey Fit-Out in Dubai",
    template: "%s | Afaq Al Manzel Interiors",
  },
  description:
    "Dubai-based interior design and turnkey solutions for residential, commercial and hospitality spaces — from concept and technical design to fit-out, MEP, furnishing and handover.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${manrope.variable}`}>
      <body className="bg-background font-body text-foreground antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-background focus:px-5 focus:py-3 focus:text-sm focus:text-foreground"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}