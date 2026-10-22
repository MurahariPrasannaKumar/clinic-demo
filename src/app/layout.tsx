import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Alder Clinic — Independent Primary & Specialty Care",
    template: "%s — Alder Clinic",
  },
  description:
    "Alder Clinic is an independent, physician-owned practice in Portland offering primary care, pediatrics, cardiology, dermatology, behavioral health, and physical therapy with unhurried, thirty-minute visits.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
