export type DayPeriod = "morning" | "afternoon" | "evening";

const OVERRIDE_KEY = "alder-period-override";
export const DAY_PERIODS: DayPeriod[] = ["morning", "afternoon", "evening"];
const PERIODS = DAY_PERIODS;

/**
 * 12am–12pm is "morning", 12pm–5pm is "afternoon", 5pm–midnight is "evening".
 * Keep this in sync with the inline no-flash script in layout.tsx.
 */
export function getDayPeriod(date: Date = new Date()): DayPeriod {
  const hour = date.getHours();
  if (hour >= 17) return "evening";
  if (hour >= 12) return "afternoon";
  return "morning";
}

export function formatClock(date: Date = new Date()): string {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

/**
 * Lets `?period=afternoon` (or a previously-set override) force a theme for
 * demos/QA without waiting for the clock to turn over. Falls back to the
 * real current period when no override is present.
 */
export function resolveDayPeriod(date: Date = new Date()): DayPeriod {
  if (typeof window !== "undefined") {
    const fromQuery = new URLSearchParams(window.location.search).get("period");
    if (fromQuery && isDayPeriod(fromQuery)) {
      window.sessionStorage.setItem(OVERRIDE_KEY, fromQuery);
      return fromQuery;
    }
    const stored = window.sessionStorage.getItem(OVERRIDE_KEY);
    if (stored && isDayPeriod(stored)) return stored;
  }
  return getDayPeriod(date);
}

function isDayPeriod(value: string): value is DayPeriod {
  return (PERIODS as string[]).includes(value);
}

/** The manually-picked period for this tab, if any (set by the navbar's preview icons). */
export function getPeriodOverride(): DayPeriod | null {
  if (typeof window === "undefined") return null;
  const stored = window.sessionStorage.getItem(OVERRIDE_KEY);
  return stored && isDayPeriod(stored) ? stored : null;
}

/** Force a theme for this tab (the navbar preview icons), or pass null to resume the real clock. */
export function setPeriodOverride(period: DayPeriod | null): void {
  if (typeof window === "undefined") return;
  if (period) {
    window.sessionStorage.setItem(OVERRIDE_KEY, period);
  } else {
    window.sessionStorage.removeItem(OVERRIDE_KEY);
  }
}
