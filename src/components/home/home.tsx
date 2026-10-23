"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollExpand from "@/components/ScrollExpand";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  Heart,
  Leaf,
  Phone,
  ShieldCheck,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import CircularCarousel, { type CircularCarouselHandle } from "@/components/CircularCarousel";
import { Container } from "@/components/ui/container";
import { SafeImage } from "@/components/ui/safe-image";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import { CtaBand } from "@/components/ui/cta-band";
import { Faq } from "@/components/home/faq";
import { type DayPeriod } from "@/lib/time-period";
import {
  doctors,
  insurancePlans,
  process,
  services,
  site,
  specialties,
  stats,
  testimonial,
  testimonials,
} from "@/lib/content";

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1631248055158-edec7a3c072b?w=900&q=80&fit=crop",
    alt: "A bright, plant-filled clinic waiting area",
    title: "Waiting Area",
    subtitle: "Calm, considered spaces",
    headline: "Attentive care, unhurried by design.",
    emphasis: "unhurried",
    description:
      "Alder is an independent, physician-owned practice in Portland. Every visit is at least thirty minutes, every chart is shared across your care team, and every physician still carries a full patient panel — including the ones who founded the place.",
  },
  {
    src: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=900&q=80&fit=crop",
    alt: "A clean, modern exam room",
    title: "Exam Suite",
    subtitle: "Modern & private",
    headline: "Modern, private exam rooms.",
    emphasis: "private",
    description:
      "Every exam room is equipped for same-day diagnostics and built for unhurried, thorough visits — designed around your comfort, not the clock.",
  },
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80&fit=crop",
    alt: "The clinic's reception desk",
    title: "Reception",
    subtitle: "A warm welcome",
    headline: "A warm welcome, every visit.",
    emphasis: "warm",
    description:
      "From the moment you arrive, our front desk team coordinates your visit so you're seen on time and know exactly what's next.",
  },
  {
    src: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=900&q=80&fit=crop",
    alt: "An X-ray displayed on a radiology monitor",
    title: "Diagnostics",
    subtitle: "On-site imaging",
    headline: "On-site imaging, same-day answers.",
    emphasis: "same-day",
    description:
      "Skip the referral runaround. On-site diagnostic imaging means faster answers, read by the physician who already knows your chart.",
  },
  {
    src: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=900&q=80&fit=crop",
    alt: "A comfortable, private patient room",
    title: "Patient Rooms",
    subtitle: "Comfort-first design",
    headline: "Comfort-first, from check-in to checkout.",
    emphasis: "Comfort-first",
    description:
      "Private, well-appointed rooms designed to put you at ease — because attentive care starts with feeling safe and unhurried.",
  },
];

function renderHeadline(text: string, emphasis: string) {
  const index = text.indexOf(emphasis);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <span className="italic text-green-text">{emphasis}</span>
      {text.slice(index + emphasis.length)}
    </>
  );
}

const HERO_STATS = [
  { icon: Clock, value: "30+ min", label: "per visit" },
  { icon: Users, value: "Care team", label: "that knows you" },
  { icon: Heart, value: "Independent", label: "since 2011" },
];

const SERVICE_HIGHLIGHTS = [
  { icon: Stethoscope, label: "Comprehensive Care", detail: "For every stage of life" },
  { icon: Users, label: "Expert Physicians", detail: "A dedicated care team" },
  { icon: Heart, label: "Patient First", detail: "Compassion in every visit" },
];

const SERVICE_VISUALS: Record<string, { image: string; tags: string[] }> = {
  "primary-care": {
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&q=80&fit=crop",
    tags: ["Preventive Care", "Annual Checkups", "Chronic Care"],
  },
  pediatrics: {
    image: "https://images.unsplash.com/photo-1758691463331-2ac00e6f676f?w=400&q=80&fit=crop",
    tags: ["Well-Child Visits", "Vaccinations", "Sick Care"],
  },
  cardiology: {
    image: "https://images.unsplash.com/photo-1530026341218-8e3d0b803ca6?w=400&q=80&fit=crop",
    tags: ["Heart Health", "Diagnostics", "Ongoing Care"],
  },
  dermatology: {
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=400&q=80&fit=crop",
    tags: ["Skin Checks", "Acne Treatment", "Cosmetic Care"],
  },
  "behavioral-health": {
    image: "https://images.unsplash.com/photo-1746021513193-a314945d15c4?w=400&q=80&fit=crop",
    tags: ["Anxiety & Depression", "Life Transitions", "Ongoing Support"],
  },
  "physical-therapy": {
    image: "https://images.unsplash.com/photo-1649751361457-01d3a696c7e6?w=400&q=80&fit=crop",
    tags: ["Injury Recovery", "Post-Surgical Care", "Pain Management"],
  },
};

const SERVICE_CARDS = services.map((service) => ({
  ...service,
  ...SERVICE_VISUALS[service.id],
}));

const DOCTOR_EXPERIENCE: Record<string, number> = {
  "elena-marsh": 12,
  "imran-qureshi": 10,
  "priya-nathan": 9,
  "marcus-webb": 8,
  "sofia-arden": 11,
};

const PHYSICIAN_STATS = [
  { value: "5", suffix: "", label: "Physicians" },
  { value: "1", suffix: "", label: "Shared Chart" },
  { value: "100", suffix: "%", label: "Patient Focused" },
];

const TESTIMONIAL_VISUALS: Record<string, { image: string; highlight: string }> = {
  "Dana R.": {
    image: "https://images.unsplash.com/photo-1508002366005-75a695ee2d17?w=600&q=80&fit=crop",
    highlight: "actually read my chart",
  },
  "Marcus T.": {
    image: "https://images.unsplash.com/photo-1534818113099-dbe2b2e800ae?w=600&q=80&fit=crop",
    highlight: "That continuity is worth more than any",
  },
  "Helen O.": {
    image: "https://images.unsplash.com/photo-1758691030490-fe1cb6c972ce?w=600&q=80&fit=crop",
    highlight: "talked to each other directly",
  },
};

function getTodayHours() {
  const day = new Date().getDay();
  if (day === 0) return site.hours[3];
  if (day === 6) return site.hours[2];
  if (day === 5) return site.hours[1];
  return site.hours[0];
}

const HERO_INTRO_STYLE: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "min(70vh, 640px)",
};

// Mirrors --color-mist per period in globals.css. The carousel paints its own
// edge-fade with a plain color (it can't read CSS variables), so it has to
// be kept in sync with the theme by hand.
const FADE_COLORS: Record<DayPeriod, string> = {
  morning: "#f4f6f5",
  afternoon: "#f1e6cf",
  evening: "#181c15",
};

export function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<CircularCarouselHandle>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [stepsVisible, setStepsVisible] = useState(false);
  const activeItem = HERO_IMAGES[activeIndex] ?? HERO_IMAGES[0];
  const [todayHours, setTodayHours] = useState(site.hours[0]);
  const isOpenToday = !todayHours.time.toLowerCase().includes("closed");
  const [fadeColor, setFadeColor] = useState(FADE_COLORS.morning);

  useEffect(() => {
    const html = document.documentElement;
    const sync = () => {
      const period = html.getAttribute("data-period") as DayPeriod | null;
      setFadeColor(FADE_COLORS[period ?? "morning"]);
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(html, { attributes: true, attributeFilter: ["data-period"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Reads the client's current date, which must stay out of render so it
    // isn't baked into the prerendered HTML (see Next.js "unstable value" error).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayHours(getTodayHours());
  }, []);

  const [settled, setSettled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const [heroStyle, setHeroStyle] = useState<CSSProperties>(HERO_INTRO_STYLE);

  const settleHero = useCallback(() => {
    const section = sectionRef.current;
    const slot = slotRef.current;
    if (!section || !slot) return;
    const sectionRect = section.getBoundingClientRect();
    const slotRect = slot.getBoundingClientRect();
    setHeroStyle({
      position: "absolute",
      top: slotRect.top - sectionRect.top,
      left: slotRect.left - sectionRect.left,
      width: slotRect.width,
      height: slotRect.height,
    });
    setSettled(true);
  }, []);

  const handleIntroEnd = useCallback(() => {
    window.setTimeout(settleHero, 2200);
  }, [settleHero]);

  useLayoutEffect(() => {
    if (!settled) return;
    settleHero();
    window.addEventListener("resize", settleHero);
    return () => window.removeEventListener("resize", settleHero);
  }, [settled, settleHero]);

  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStepsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32"
      >
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-115 w-115 rounded-full bg-green/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-10 -bottom-40 h-80 w-80 rounded-full bg-green-mist blur-3xl"
          aria-hidden
        />

        <div
          className="absolute z-20 overflow-hidden rounded-[28px] bg-mist transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={heroStyle}
        >
          <div className="mx-auto h-full w-full max-w-2xl md:max-w-3xl">
            <CircularCarousel
              ref={carouselRef}
              items={HERO_IMAGES}
              preset="cylinder"
              intro="rise"
              cardWidth={260}
              aspectRatio={1}
              speed={settled ? 10 : 32}
              captions={false}
              gap={30}
              tilt={-5}
              curve={1}
              perspective={2800}
              autoplay="drift"
              direction="left"
              momentum={0.6}
              snap
              pauseOnHover
              focusOnClick
              draggable
              parallax={0.25}
              stretch={0.4}
              fadeColor={fadeColor}
              depthFade={0.5}
              innerShade={0.55}
              cornerRadius={28}
              onChange={setActiveIndex}
              onIntroEnd={handleIntroEnd}
            />
          </div>
        </div>

        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
            <div
              className={`flex flex-col justify-center md:col-span-6 md:pr-8 transition-opacity duration-500 ${
                settled ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Kicker label="Alder Clinic, est. 2011" />
              <h1
                key={`headline-${activeIndex}`}
                className="reveal mt-6 text-balance font-display text-[2.85rem] leading-[1.02] tracking-tight text-ink xs:text-6xl md:text-[3.85rem] lg:text-[4.5rem]"
              >
                {renderHeadline(activeItem.headline, activeItem.emphasis)}
              </h1>
              <p
                key={`description-${activeIndex}`}
                className="reveal mt-7 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-ink-soft"
              >
                {activeItem.description}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Button href="/contact">Book a visit</Button>
                <Button href="/services" variant="outline">
                  Explore services
                </Button>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-green-text transition-colors duration-700">
                      <stat.icon size={18} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-[0.875rem] font-medium text-ink">{stat.value}</p>
                      <p className="text-[0.8125rem] text-ink-soft">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="relative mx-auto aspect-6/5 w-full max-w-lg md:max-w-none">
                <div ref={slotRef} className="absolute inset-0 overflow-hidden rounded-[28px] bg-mist" />

                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => carouselRef.current?.prev()}
                  className={`absolute top-1/2 left-2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/95 text-ink shadow-[0_12px_32px_-16px_rgba(12,15,13,0.3)] backdrop-blur-sm transition-opacity duration-500 hover:bg-ink hover:text-ink-contrast md:-left-5 ${
                    settled ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <ChevronLeft size={20} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => carouselRef.current?.next()}
                  className={`absolute top-1/2 right-2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/95 text-ink shadow-[0_12px_32px_-16px_rgba(12,15,13,0.3)] backdrop-blur-sm transition-opacity duration-500 hover:bg-ink hover:text-ink-contrast md:-right-5 ${
                    settled ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <ChevronRight size={20} strokeWidth={1.75} />
                </button>

                <div
                  className={`absolute top-4 left-4 z-30 flex items-center gap-3 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-[0_12px_32px_-16px_rgba(12,15,13,0.25)] backdrop-blur-sm transition-opacity duration-500 md:top-6 md:left-6 ${
                    settled ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                        isOpenToday ? "bg-green" : "bg-ink-soft"
                      }`}
                    />
                    <span
                      className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                        isOpenToday ? "bg-green" : "bg-ink-soft"
                      }`}
                    />
                  </span>
                  <div>
                    <p className="text-[0.8125rem] font-medium text-ink">
                      {isOpenToday ? "Open Today" : "Closed Today"}
                    </p>
                    <p className="text-[0.75rem] text-ink-soft">{todayHours.time}</p>
                  </div>
                </div>

                <div
                  className={`absolute top-20 right-4 z-30 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-[0_12px_32px_-16px_rgba(12,15,13,0.25)] backdrop-blur-sm transition-opacity duration-500 md:top-24 md:right-6 ${
                    settled ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {doctors.slice(0, 3).map((doctor) => (
                        <span
                          key={doctor.id}
                          className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-surface"
                        >
                          <SafeImage
                            src={doctor.image}
                            alt=""
                            sizes="28px"
                            className="object-cover"
                            fallbackIconSize={14}
                          />
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-[0.8125rem] font-medium text-ink">
                      <Star size={13} strokeWidth={0} className="fill-amber-400" />
                      4.9/5
                    </span>
                  </div>
                  <p className="mt-2 text-[0.75rem] text-ink-soft">500+ happy patients</p>
                </div>

                <div
                  className={`absolute bottom-4 left-4 z-30 flex max-w-xs items-center justify-between gap-6 rounded-2xl border border-line bg-surface/95 px-5 py-4 shadow-[0_12px_32px_-16px_rgba(12,15,13,0.25)] backdrop-blur-sm transition-opacity duration-500 md:bottom-6 md:left-8 ${
                    settled ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <div>
                    <p className="text-[0.9375rem] font-medium text-ink">{activeItem.title}</p>
                    <p className="text-[0.8125rem] text-ink-soft">{activeItem.subtitle}</p>
                  </div>
                  <p className="shrink-0 text-[0.75rem] tracking-wide text-ink-soft">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(HERO_IMAGES.length).padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-6 text-center md:justify-between">
            {specialties.map((s) => (
              <span
                key={s}
                className="text-[0.6875rem] font-medium tracking-[0.18em] text-ink-soft uppercase"
              >
                {s}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l border-line pl-5 md:pl-6">
                <p className="font-display text-4xl tracking-tight text-ink xs:text-5xl md:text-[3.5rem]">
                  {stat.value}
                  <span className="text-2xl text-green-text md:text-3xl">{stat.suffix}</span>
                </p>
                <p className="mt-3 max-w-44 text-[0.8125rem] leading-snug text-ink-soft">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ScrollExpand
        src="/video.mp4"
        mediaType="video"
        title="We built the calendar before we built anything else."
        scrollHint="Scroll to see how"
        useWindowScroll
        startWidth={42}
        startHeight={58}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.35}
        scrollDistance={1.2}
        holdDistance={0.35}
        smoothing={0.1}
        overlayScrim={0.45}
      >
        <h3 className="font-display text-3xl italic leading-snug text-white md:text-4xl">
          Thirty minutes, no exceptions.
        </h3>
        <p className="mt-4 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-white/80">
          The one rule that shapes everything else about how we practice.
        </p>
      </ScrollExpand>

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <Kicker index="01" label="Philosophy" />
              <h2 className="mt-5 text-balance font-display text-4xl leading-[1.1] tracking-tight text-ink md:text-[2.75rem]">
                We built the calendar before we built anything else.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-pretty text-[1.0625rem] leading-relaxed text-ink-soft">
                Most clinics set visit length by what the schedule can absorb. We did the opposite:
                we decided what a visit needed to take, and built the rest of the practice to fit.
                That single decision &mdash; thirty minutes, no exceptions &mdash; shapes almost
                everything else here, from how many patients each physician sees, to why we stayed
                independent instead of joining a larger system.
              </p>
              <div className="mt-10 border-l border-green pl-6">
                <p className="font-display text-xl italic leading-snug text-ink xs:text-2xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-4 text-[0.75rem] tracking-[0.14em] text-ink-soft uppercase">
                  {testimonial.name} &middot; {testimonial.context}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-y border-line bg-mist py-24 md:py-32">
        <div
          className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-green/10 blur-3xl"
          aria-hidden
        />

        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:items-center md:gap-8">
            <div className="md:col-span-5">
              <Kicker index="02" label="Services" />
              <h2 className="mt-5 text-balance font-display text-4xl leading-[1.1] tracking-tight text-ink md:text-[2.75rem]">
                Care organized
                <br />
                <span className="italic text-green-text">around you.</span>
              </h2>
              <p className="mt-6 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-ink-soft">
                From everyday care to specialized treatment, our services are designed to keep
                you and your family healthy &mdash; at every stage of life.
              </p>
            </div>

            <div className="md:col-span-7">
              <div className="relative mx-auto max-w-xl md:mr-0 md:ml-auto">
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-[100px_28px_28px_100px] bg-mist shadow-[0_30px_60px_-30px_rgba(12,15,13,0.25)]">
                  <Image
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=80&fit=crop"
                    alt="The clinic's reception desk"
                    fill
                    sizes="(min-width: 768px) 50vw, 90vw"
                    className="object-cover"
                  />
                </div>

                <span
                  className="absolute top-1/2 -left-3 h-3 w-3 -translate-y-1/2 rounded-full bg-green md:-left-5"
                  aria-hidden
                />

                <div className="absolute top-6 -right-2 w-60 rounded-2xl border border-line bg-surface/95 p-5 shadow-[0_20px_50px_-24px_rgba(12,15,13,0.3)] backdrop-blur-sm sm:w-64 md:top-10 md:-right-10">
                  <div className="flex flex-col gap-4">
                    {SERVICE_HIGHLIGHTS.map((item) => (
                      <div key={item.label} className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-mist text-green-text">
                          <item.icon size={16} strokeWidth={1.75} />
                        </span>
                        <div>
                          <p className="text-[0.8125rem] font-medium text-ink">{item.label}</p>
                          <p className="text-[0.75rem] text-ink-soft">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {SERVICE_CARDS.map((service) => (
              <Link
                key={service.id}
                href={`/services#${service.id}`}
                className="group flex items-start gap-5 rounded-2xl border border-line bg-surface p-6 shadow-[0_1px_2px_rgba(12,15,13,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-green/40 hover:shadow-[0_24px_48px_-28px_rgba(12,15,13,0.25)]"
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-mist">
                  <Image src={service.image} alt="" fill sizes="112px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-mist font-display text-sm text-green-text">
                        {service.index}
                      </span>
                      <h3 className="font-display text-xl tracking-tight text-ink transition-colors group-hover:text-green-text md:text-2xl">
                        {service.name}
                      </h3>
                    </div>
                    <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-mist text-green-text transition-colors group-hover:bg-green group-hover:text-white sm:flex">
                      <ArrowRight size={16} strokeWidth={1.75} />
                    </span>
                  </div>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {service.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-mist px-3 py-1 text-[0.75rem] text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 flex items-center justify-center gap-6">
            <span className="h-px w-16 bg-line" aria-hidden />
            <Link
              href="/services"
              className="group inline-flex items-center gap-2.5 rounded-full bg-green-deep px-7 py-3.5 text-[0.75rem] font-medium whitespace-nowrap uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-green"
            >
              View all services
              <ArrowUpRight
                size={14}
                strokeWidth={1.75}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <span className="h-px w-16 bg-line" aria-hidden />
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <Kicker index="03" label="How it works" />
          <h2 className="mt-5 max-w-xl text-balance font-display text-4xl leading-[1.1] tracking-tight text-ink md:text-[2.75rem]">
            From first call to follow-up.
          </h2>

          <div ref={stepsRef} className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-6">
            {process.map((step, i) => (
              <div
                key={step.index}
                style={stepsVisible ? { animationDelay: `${i * 100}ms` } : undefined}
                className={`group border border-line bg-surface p-7 shadow-[0_1px_2px_rgba(12,15,13,0.04),0_18px_40px_-28px_rgba(12,15,13,0.18)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 hover:scale-[1.02] hover:border-green/50 hover:shadow-[0_24px_48px_-28px_rgba(12,15,13,0.28)] ${
                  stepsVisible ? "card-bounce-in" : "opacity-0"
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center border border-green/25 bg-green-mist font-display text-base text-green-text">
                  {step.index}
                </span>
                <h3 className="mt-5 font-display text-xl tracking-tight text-ink md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center md:gap-8">
            <div className="md:col-span-5">
              <Kicker index="04" label="Physicians" />
              <h2 className="mt-5 text-balance font-display text-4xl leading-[1.1] tracking-tight text-ink md:text-[2.75rem]">
                Five physicians.
                <br />
                <span className="italic text-green-text">One shared chart.</span>
              </h2>
              <p className="mt-6 max-w-sm text-pretty text-[1.0625rem] leading-relaxed text-ink-soft">
                Your primary physician, your care team, and your specialists all from the same
                place. It&rsquo;s the same support, built around you.
              </p>
              <Link
                href="/doctors"
                className="group mt-9 inline-flex items-center gap-2.5 bg-green-deep px-7 py-3.5 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-green"
              >
                Meet the physicians
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.75}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <div className="mt-12 flex items-center gap-6">
                {PHYSICIAN_STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={i > 0 ? "border-l border-line pl-6" : ""}
                  >
                    <p className="font-display text-3xl tracking-tight text-ink">
                      {stat.value}
                      {stat.suffix && <span className="text-green-text">{stat.suffix}</span>}
                    </p>
                    <p className="mt-1 text-[0.8125rem] text-ink-soft">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {doctors.slice(0, 3).map((doctor) => (
                  <Link key={doctor.id} href="/doctors" className="flip-card h-[27rem]">
                    <div className="flip-card-inner rounded-2xl shadow-[0_1px_2px_rgba(12,15,13,0.04),0_18px_40px_-28px_rgba(12,15,13,0.18)]">
                      <div className="flip-card-front flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-700">
                        <div className="relative h-28 overflow-hidden rounded-xl bg-mist md:h-32">
                          <SafeImage
                            src={doctor.image}
                            alt=""
                            sizes="(min-width: 768px) 22vw, 90vw"
                            className="object-cover"
                            fallbackIconSize={22}
                          />
                        </div>
                        <div className="mt-6">
                          <h3 className="font-display text-2xl tracking-tight text-ink">
                            {doctor.name}
                          </h3>
                          <p className="mt-2 text-[0.75rem] font-medium tracking-[0.12em] text-ink-soft uppercase">
                            {doctor.specialty}
                          </p>
                          <div className="mt-5 flex items-end justify-between border-t border-line pt-5">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-[0.8125rem] text-ink-soft">
                                <GraduationCap size={15} strokeWidth={1.75} className="shrink-0 text-green-text" />
                                {doctor.credentials}
                              </div>
                              <div className="flex items-center gap-2 text-[0.8125rem] text-ink-soft">
                                <Building2 size={15} strokeWidth={1.75} className="shrink-0 text-green-text" />
                                {DOCTOR_EXPERIENCE[doctor.id]}+ Years Experience
                              </div>
                            </div>
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-mist text-green-text">
                              <ArrowRight size={16} strokeWidth={1.75} />
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flip-card-back overflow-hidden rounded-2xl">
                        <SafeImage
                          src={doctor.image}
                          alt={doctor.name}
                          sizes="(min-width: 768px) 22vw, 90vw"
                          className="object-cover"
                          fallbackIconSize={32}
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-5">
                          <p className="font-display text-lg text-white">{doctor.name}</p>
                          <p className="text-[0.6875rem] tracking-[0.12em] text-white/80 uppercase">
                            {doctor.specialty}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Kicker index="05" label="Patients" />
              <h2 className="mt-5 max-w-xl text-balance font-display text-4xl leading-[1.1] tracking-tight text-ink md:text-[2.75rem]">
                What it sounds like
                <br />
                <span className="italic text-green-text">from the exam chair.</span>
              </h2>
              <p className="mt-6 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-ink-soft">
                Real stories from real patients &mdash; because the best measure of care is the
                people who experience it.
              </p>
            </div>

            <div className="hidden items-center gap-5 md:flex">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-soft">
                  <ArrowLeft size={16} strokeWidth={1.75} />
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-mist text-green-text">
                  <ArrowRight size={16} strokeWidth={1.75} />
                </span>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 border-b border-ink pb-0.5 text-[0.75rem] font-medium tracking-[0.12em] text-ink uppercase transition-colors hover:border-green hover:text-green-text"
              >
                View more stories
                <ArrowUpRight size={13} strokeWidth={1.75} />
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-6">
            {testimonials.map((t) => {
              const visual = TESTIMONIAL_VISUALS[t.name];
              return (
                <div
                  key={t.name}
                  className="flex h-full min-h-88 overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgba(12,15,13,0.04),0_18px_40px_-28px_rgba(12,15,13,0.18)] transition-colors duration-700"
                >
                  <div className="flex min-w-0 flex-1 flex-col p-6 md:p-7">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-mist">
                      <span className="font-display text-xl leading-none text-green-text">&ldquo;</span>
                    </span>
                    <p className="mt-4 flex-1 text-pretty font-display text-lg italic leading-snug text-ink">
                      {visual ? renderHeadline(t.quote, visual.highlight) : t.quote}
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                      {visual && (
                        <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-mist">
                          <Image src={visual.image} alt="" fill sizes="36px" className="object-cover" />
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-[0.875rem] font-medium text-ink">{t.name}</p>
                        <p className="truncate text-[0.6875rem] tracking-[0.14em] text-ink-soft uppercase">
                          {t.context}
                        </p>
                      </div>
                    </div>
                  </div>

                  {visual && (
                    <div className="relative hidden w-32 shrink-0 self-stretch sm:block md:w-36">
                      <Image
                        src={visual.image}
                        alt={t.name}
                        fill
                        sizes="144px"
                        className="object-cover object-[center_30%]"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-y border-line bg-mist py-24 md:py-32">
        <div
          className="pointer-events-none absolute -top-10 -left-32 h-80 w-80 rounded-full bg-surface/70 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-1/2 -right-24 hidden h-105 w-105 -translate-y-1/2 rounded-full border border-line md:block"
          aria-hidden
        />

        <Container>
          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <Kicker index="06" label="Insurance & pricing" />
              <h2 className="mt-5 text-balance font-display text-4xl leading-[1.1] tracking-tight text-ink md:text-[2.75rem]">
                Covered, or <span className="italic text-green-text">clearly</span> priced if not.
              </h2>
              <p className="mt-6 max-w-sm text-pretty text-[1.0625rem] leading-relaxed text-ink-soft">
                We&rsquo;re in-network with the major plans below. Self-pay patients are quoted a flat
                rate before the visit, not a surprise statement after it.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {insurancePlans.map((plan) => (
                  <div
                    key={plan}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-4 transition-colors duration-700"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-mist font-display text-base text-green-text">
                      {plan.charAt(0)}
                    </span>
                    <span className="text-[0.875rem] font-medium text-ink">{plan}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="group mt-10 inline-flex items-center gap-2.5 bg-green-deep px-7 py-3.5 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-green"
              >
                Confirm your plan
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.75}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <Kicker index="07" label="Questions" />
              <h2 className="mt-5 text-balance font-display text-4xl leading-[1.1] tracking-tight text-ink md:text-[2.75rem]">
                Before you <span className="italic text-green-text">book.</span>
              </h2>
              <p className="mt-6 max-w-sm text-pretty text-[1.0625rem] leading-relaxed text-ink-soft">
                Answers to common questions about appointments, insurance, and what to expect at
                Alder. We&rsquo;re here to make your visit as smooth and stress-free as possible.
              </p>

              <div className="relative mt-10 aspect-4/3 w-full max-w-sm overflow-hidden rounded-[16px_140px_140px_16px] bg-mist">
                <Image
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=80&fit=crop"
                  alt="The clinic's reception desk"
                  fill
                  sizes="(min-width: 768px) 32vw, 90vw"
                  className="object-cover"
                />
                <span className="absolute top-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-mist/90 text-green-text backdrop-blur-sm">
                  <Leaf size={22} strokeWidth={1.5} />
                </span>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-8 shrink-0 bg-line" aria-hidden />
                <p className="text-[0.6875rem] leading-relaxed font-medium tracking-[0.14em] text-ink-soft uppercase">
                  Compassionate answers
                  <br />
                  for a healthier tomorrow.
                </p>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-[28px] border border-line bg-surface px-6 md:px-10 transition-colors duration-700">
                <Faq />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        theme="light"
        kicker="Get Started"
        title="Ready when you are."
        titleEmphasis="when you are."
        description="Compassionate care, shorter wait times, and a team that knows you — for every stage of life."
        features={[
          { icon: Calendar, label: "Easy Scheduling" },
          { icon: Users, label: "Same Care Team" },
          { icon: ShieldCheck, label: "Personalized Care" },
        ]}
        image={{
          src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=80&fit=crop",
          alt: "The clinic's reception desk",
        }}
      >
        <Button href="/contact" variant="primary">
          Book your first visit
        </Button>
        <div className="flex w-full items-center gap-3 text-[0.6875rem] font-medium tracking-[0.14em] text-ink-soft/70 uppercase">
          <span className="h-px flex-1 bg-line" aria-hidden />
          Or
          <span className="h-px flex-1 bg-line" aria-hidden />
        </div>
        <a
          href={`tel:${site.phoneHref}`}
          className="flex items-center gap-3 text-ink-soft transition-colors hover:text-ink"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-mist text-green-text">
            <Phone size={16} strokeWidth={1.75} />
          </span>
          <span className="text-left">
            <span className="block text-sm font-medium text-ink">Call {site.phone}</span>
            <span className="block text-xs text-ink-soft">We&rsquo;re here to help.</span>
          </span>
        </a>
      </CtaBand>
    </>
  );
}
