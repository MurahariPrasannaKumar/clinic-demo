import Image from "next/image";
import { Award, Clock, MessageSquare, Share2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import { CtaBand } from "@/components/ui/cta-band";
import { milestones, values } from "@/lib/content";

const VALUE_ICONS = [Clock, Share2, Award, MessageSquare];

export function About() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-green-mist/60 blur-3xl"
          aria-hidden
        />

        <Container>
          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-6">
              <Kicker label="About Alder" />
              <h1 className="mt-6 text-balance font-display text-[2.5rem] leading-[1.06] tracking-tight text-ink xs:text-5xl md:text-6xl">
                Founded by physicians who wanted their old jobs to work differently.
              </h1>
              <p className="mt-7 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-ink-soft">
                Alder Clinic opened in 2011 when two physicians left a hospital system that measured
                visits in minutes. Thirteen years later, the practice has grown to five physicians
                and a behavioral health team, under one roof, still privately owned by the people
                who see patients in it.
              </p>
            </div>
            <div className="md:col-span-6">
              <div className="relative aspect-16/11 w-full overflow-hidden rounded-3xl bg-mist shadow-[0_30px_60px_-30px_rgba(12,15,13,0.25)]">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=2000&q=80&fit=crop"
                  alt="The Alder Clinic care team reviewing a shared patient chart around a table"
                  fill
                  priority
                  sizes="(min-width: 768px) 46vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-mist py-24 md:py-28">
        <Container>
          <Kicker index="01" label="History" />
          <div className="relative mt-14">
            <div className="absolute top-2 bottom-2 left-1.75 w-px bg-line" aria-hidden />
            <div className="flex flex-col gap-12 md:gap-14">
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="relative grid grid-cols-1 gap-3 pl-8 md:grid-cols-12 md:gap-6 md:pl-10"
                >
                  <span
                    className="absolute top-1.5 left-0 h-3.75 w-3.75 rounded-full border-2 border-green bg-surface transition-colors duration-700"
                    aria-hidden
                  />
                  <span className="font-display text-3xl tracking-tight text-green-text md:col-span-2 md:text-4xl">
                    {m.year}
                  </span>
                  <p className="max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-ink-soft md:col-span-8 md:col-start-4">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <Kicker index="02" label="What stays fixed" />
          <h2 className="mt-5 max-w-xl text-balance font-display text-4xl leading-[1.1] tracking-tight text-ink md:text-[2.75rem]">
            Four things we haven&rsquo;t compromised on.
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {values.map((value, i) => {
              const Icon = VALUE_ICONS[i] ?? Clock;
              return (
                <div
                  key={value.index}
                  className="group rounded-2xl border border-line bg-surface p-8 shadow-[0_1px_2px_rgba(12,15,13,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-green/40 hover:shadow-[0_24px_48px_-28px_rgba(12,15,13,0.25)] md:p-10"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-mist text-green-text">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <span className="font-display text-3xl tracking-tight text-ink/15">
                      {value.index}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl tracking-tight text-ink md:text-[1.75rem]">
                    {value.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-ink-soft">
                    {value.body}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative aspect-21/9 max-h-90 w-full overflow-hidden bg-mist md:max-h-115">
        <Image
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?rect=3350,550,1650,2850&w=2400&q=80&fit=crop"
          alt="A bright, modern consultation room at Alder Clinic with natural light"
          fill
          sizes="100vw"
          style={{ objectPosition: "50% 65%" }}
          className="object-cover"
        />
        <div className="absolute bottom-6 left-6 rounded-2xl border border-line bg-surface/90 px-5 py-3 backdrop-blur-sm transition-colors duration-700 md:bottom-10 md:left-10">
          <p className="text-[0.8125rem] font-medium text-ink">Our consultation rooms</p>
          <p className="text-[0.75rem] text-ink-soft">Designed for unhurried conversations</p>
        </div>
      </section>

      <CtaBand kicker="Our Team" title="Meet the physicians behind it." titleEmphasis="behind it.">
        <Button href="/doctors" variant="inverse">
          View the team
        </Button>
      </CtaBand>
    </>
  );
}
