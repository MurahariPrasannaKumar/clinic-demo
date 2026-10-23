import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/content";

const CURRENT_YEAR = 2026;

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "#",
    path: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    path: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface transition-colors duration-700">
      <div className="overflow-hidden px-4 py-10 md:py-16">
        <Link href="/" className="block text-center" aria-label={`${site.name} home`}>
          <span className="footer-wordmark inline-block font-display text-[clamp(4rem,18vw,13rem)] leading-none tracking-tight">
            {site.short.toUpperCase()}
          </span>
        </Link>
      </div>

      <div className="border-t border-line px-6 py-6 md:px-10">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-4 text-[0.8125rem] text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {CURRENT_YEAR} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 transition-colors hover:text-ink"
            >
              <Mail size={14} strokeWidth={1.75} />
              {site.email}
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              className="flex items-center gap-2 transition-colors hover:text-ink"
            >
              <Phone size={14} strokeWidth={1.75} />
              {site.phone}
            </a>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-ink-soft transition-colors hover:text-green-text"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width={15}
                    height={15}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {social.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
