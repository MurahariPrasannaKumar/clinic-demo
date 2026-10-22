import type { Metadata, Viewport } from "next";
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

const description =
  "Alder Clinic is an independent, physician-owned practice in Portland offering primary care, pediatrics, cardiology, dermatology, behavioral health, and physical therapy with unhurried, thirty-minute visits.";

export const metadata: Metadata = {
  metadataBase: new URL("https://alderclinic.com"),
  title: {
    default: "Alder Clinic — Independent Primary & Specialty Care",
    template: "%s — Alder Clinic",
  },
  description,
  keywords: [
    "Alder Clinic",
    "Portland primary care",
    "independent physician practice",
    "pediatrics Portland",
    "cardiology Portland",
    "dermatology Portland",
    "behavioral health Portland",
  ],
  openGraph: {
    title: "Alder Clinic — Independent Primary & Specialty Care",
    description,
    siteName: "Alder Clinic",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alder Clinic — Independent Primary & Specialty Care",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0e6b4c",
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
