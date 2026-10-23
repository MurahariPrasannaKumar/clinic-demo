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

// Keep this logic in sync with getDayPeriod()/resolveDayPeriod() in
// @/lib/time-period. It runs synchronously before paint so the time-of-day
// theme (and a `?period=` override, used for demos/QA) is correct on first
// render instead of flashing the default morning theme first.
const NO_FLASH_THEME_SCRIPT = `(function () {
  try {
    var params = new URLSearchParams(window.location.search);
    var override = params.get("period");
    var valid = ["morning", "afternoon", "evening"];
    if (override && valid.indexOf(override) !== -1) {
      window.sessionStorage.setItem("alder-period-override", override);
    } else {
      override = window.sessionStorage.getItem("alder-period-override");
    }
    var period = valid.indexOf(override) !== -1 ? override : null;
    if (!period) {
      var hour = new Date().getHours();
      period = hour >= 17 ? "evening" : hour >= 12 ? "afternoon" : "morning";
    }
    document.documentElement.setAttribute("data-period", period);
  } catch (e) {}
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${inter.variable} h-full antialiased`}
      // The no-flash script below sets data-period on this element before
      // React hydrates, which legitimately differs from the server-rendered
      // markup (the server can't know the visitor's local time). That's the
      // one attribute this is scoped to suppress — not a blanket opt-out.
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-surface text-ink">
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
