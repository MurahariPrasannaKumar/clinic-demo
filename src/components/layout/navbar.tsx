"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Phone, Sun, Sunrise, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/lib/content";
import {
  formatClock,
  getPeriodOverride,
  resolveDayPeriod,
  setPeriodOverride,
  type DayPeriod,
} from "@/lib/time-period";

const PERIOD_OPTIONS: { period: DayPeriod; label: string; Icon: typeof Sun }[] = [
  { period: "morning", label: "Morning", Icon: Sunrise },
  { period: "afternoon", label: "Afternoon", Icon: Sun },
  { period: "evening", label: "Evening", Icon: Moon },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [period, setPeriod] = useState<DayPeriod | null>(null);

  useEffect(() => {
    const tick = () => {
      const current = new Date();
      const resolved = resolveDayPeriod(current);
      setNow(current);
      setPeriod(resolved);
      document.documentElement.setAttribute("data-period", resolved);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const pickPeriod = (choice: DayPeriod) => {
    // Clicking the already-active, manually-picked theme resumes the real clock.
    const next = getPeriodOverride() === choice ? null : choice;
    setPeriodOverride(next);
    const resolved = resolveDayPeriod();
    setPeriod(resolved);
    document.documentElement.setAttribute("data-period", resolved);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-saturate-150 transition-all duration-500 ${
        scrolled
          ? "border-b border-line/70 bg-surface/75 shadow-[0_16px_40px_-28px_rgba(12,15,13,0.55)] backdrop-blur-xl"
          : "border-b border-surface/40 bg-surface/40 shadow-none backdrop-blur-lg"
      }`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/70 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <Container>
        <div className="flex h-[4.5rem] items-center justify-between md:h-20">
          <Link href="/" className="flex items-center gap-2.5 text-ink">
            <span className="relative flex h-8 w-8 items-center justify-center bg-linear-to-br from-green to-green-deep text-[0.6875rem] font-medium tracking-[0.08em] text-white shadow-[0_4px_14px_-4px_rgba(14,107,76,0.65)] ring-1 ring-inset ring-white/25">
              A
            </span>
            <span className="font-display text-[1.625rem] leading-none tracking-tight">
              {site.short}
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-[0.75rem] font-medium tracking-[0.12em] uppercase transition-colors ${
                    active ? "text-green-text" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-green shadow-[0_0_8px_rgba(14,107,76,0.6)]"
                      aria-hidden
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div
            className="flex shrink-0 items-center gap-2 rounded-full border border-line/70 bg-mist px-3 py-1.5 text-[0.6875rem] font-medium whitespace-nowrap tracking-wide text-ink-soft tabular-nums transition-colors duration-700 sm:text-[0.75rem]"
            aria-label={now ? `Current time ${formatClock(now)}` : undefined}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-text opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-text" />
            </span>
            {now ? formatClock(now) : "--:--"}
          </div>

          <div
            role="group"
            aria-label="Preview a different time of day"
            className="hidden shrink-0 items-center gap-1 rounded-full border border-line/70 bg-mist p-1 transition-colors duration-700 md:flex"
          >
            {PERIOD_OPTIONS.map(({ period: option, label, Icon }) => (
              <button
                key={option}
                type="button"
                onClick={() => pickPeriod(option)}
                aria-pressed={period === option}
                aria-label={`Preview the ${label.toLowerCase()} theme`}
                title={`Preview the ${label.toLowerCase()} theme`}
                className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                  period === option
                    ? "bg-green-mist text-green-text"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                <Icon size={14} strokeWidth={1.75} />
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-6 md:flex">
            {/* <a
              href={`tel:${site.phoneHref}`}
              className="flex items-center gap-2 text-[0.8125rem] text-ink-soft transition-colors hover:text-green-text"
            >
              <Phone size={14} strokeWidth={1.75} />
              {site.phone}
            </a> */}
            <span className="h-5 w-px bg-line" aria-hidden />
            <Button href="/contact" showArrow={false}>
              Book a visit
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex items-center justify-center p-2 text-ink md:hidden"
          >
            {open ? (
              <X size={24} strokeWidth={1.5} />
            ) : (
              <Menu size={24} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </Container>

      <div
        className={`fixed inset-x-0 top-[4.5rem] z-40 h-[calc(100dvh-4.5rem)] bg-surface/90 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <Container className="flex h-full flex-col justify-between py-10">
          <nav className="flex flex-col">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line py-5 font-display text-4xl tracking-tight text-ink xs:text-5xl"
              >
                <span className="font-sans text-xs tracking-[0.16em] text-green-text">
                  0{i + 1}
                </span>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-5">
            {/* <a
              href={`tel:${site.phoneHref}`}
              className="flex items-center gap-2 text-ink-soft"
            >
              <Phone size={16} strokeWidth={1.75} />
              {site.phone}
            </a> */}
            <div
              role="group"
              aria-label="Preview a different time of day"
              className="flex items-center justify-between gap-2 rounded-full border border-line bg-mist p-1.5 transition-colors duration-700"
            >
              {PERIOD_OPTIONS.map(({ period: option, label, Icon }) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => pickPeriod(option)}
                  aria-pressed={period === option}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2 text-[0.75rem] font-medium tracking-wide transition-colors ${
                    period === option
                      ? "bg-green-mist text-green-text"
                      : "text-ink-soft"
                  }`}
                >
                  <Icon size={14} strokeWidth={1.75} />
                  {label}
                </button>
              ))}
            </div>
            <Button
              href="/contact"
              variant="primary"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Book a visit
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
