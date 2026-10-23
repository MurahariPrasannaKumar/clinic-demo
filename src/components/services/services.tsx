import { type ComponentType } from "react";
import { Activity, ArrowRight, Baby, Brain, HeartPulse, Sparkles, Stethoscope } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import { CtaBand } from "@/components/ui/cta-band";
import { SafeImage } from "@/components/ui/safe-image";
import { doctors, services, type Service } from "@/lib/content";

const groups: Service["group"][] = ["Primary Care", "Specialty Care", "Therapies & Support"];
const medicalDirector = doctors.find((d) => d.id === "elena-marsh")!;

const SERVICE_ICONS: Record<string, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  "primary-care": Stethoscope,
  pediatrics: Baby,
  cardiology: HeartPulse,
  dermatology: Sparkles,
  "behavioral-health": Brain,
  "physical-therapy": Activity,
};

export function Services() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-20">
        <div
          className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-green-mist/60 blur-3xl"
          aria-hidden
        />

        <Container>
          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <Kicker label="Services" />
              <h1 className="mt-6 text-balance font-display text-[2.5rem] leading-[1.06] tracking-tight text-ink xs:text-5xl md:text-6xl">
                Care organized around you, not around departments.
              </h1>
            </div>
            <div className="md:col-span-5 md:self-end">
              <p className="text-pretty text-[1.0625rem] leading-relaxed text-ink-soft">
                Six practice areas, one shared chart. Whichever physician you see first, the rest
                of the team already knows why you&rsquo;re here.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {groups.map((group, gi) => {
        const groupServices = services.filter((s) => s.group === group);
        return (
          <section
            key={group}
            className={gi % 2 === 1 ? "border-y border-line bg-mist py-20 md:py-24" : "py-20 md:py-24"}
          >
            <Container>
              <Kicker index={`0${gi + 1}`} label={group} />
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                {groupServices.map((service) => {
                  const Icon = SERVICE_ICONS[service.id] ?? Stethoscope;
                  return (
                    <div
                      key={service.id}
                      id={service.id}
                      className="group scroll-mt-28 rounded-2xl border border-line bg-surface p-7 shadow-[0_1px_2px_rgba(12,15,13,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-green/40 hover:shadow-[0_24px_48px_-28px_rgba(12,15,13,0.25)] md:p-8"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-mist text-green-text">
                            <Icon size={20} strokeWidth={1.75} />
                          </span>
                          <div>
                            <span className="text-[0.75rem] font-medium text-green-text">
                              {service.index}
                            </span>
                            <h3 className="font-display text-2xl tracking-tight text-ink md:text-[1.75rem]">
                              {service.name}
                            </h3>
                          </div>
                        </div>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-mist text-green-text opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <ArrowRight size={16} strokeWidth={1.75} />
                        </span>
                      </div>
                      <p className="mt-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-soft">
                        {service.detail}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                        <span className="rounded-full border border-line bg-mist px-3 py-1 text-[0.75rem] text-ink-soft">
                          {service.duration}
                        </span>
                        <span className="rounded-full border border-line bg-mist px-3 py-1 text-[0.75rem] text-ink-soft">
                          {service.bestFor}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-[16px_140px_140px_16px] bg-mist shadow-[0_30px_60px_-30px_rgba(12,15,13,0.25)]">
                <SafeImage
                  src={medicalDirector.image}
                  alt="Dr. Elena Marsh, Alder Clinic medical director"
                  sizes="(min-width: 768px) 38vw, 90vw"
                  className="object-cover"
                  fallbackIconSize={48}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-mist font-display text-xl text-green-text">
                &ldquo;
              </span>
              <p className="mt-6 text-balance font-display text-3xl italic leading-snug text-ink md:text-4xl">
                We don&rsquo;t refer patients out unless we have to. Keeping specialties
                in-house means your cardiologist and your primary physician are reading the same
                note, not waiting on a fax from each other.
              </p>
              <p className="mt-6 text-[0.75rem] font-medium tracking-[0.14em] text-ink-soft uppercase">
                Dr. Elena Marsh &middot; Medical Director
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        kicker="Need Guidance"
        title="Not sure which physician to start with?"
        titleEmphasis="start with?"
      >
        <Button href="/contact" variant="inverse">
          Talk to our care team
        </Button>
      </CtaBand>
    </>
  );
}
