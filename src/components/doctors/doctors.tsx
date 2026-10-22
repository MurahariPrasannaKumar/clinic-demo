import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import { CtaBand } from "@/components/ui/cta-band";
import { doctors } from "@/lib/content";

export function Doctors() {
  return (
    <>
      <section className="pt-16 pb-20 md:pt-24 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <Kicker label="Our physicians" />
              <h1 className="mt-6 text-balance font-display text-[2.5rem] leading-[1.06] tracking-tight text-ink xs:text-5xl md:text-6xl">
                Five physicians, each carrying their own full panel.
              </h1>
            </div>
            <div className="md:col-span-5 md:self-end">
              <p className="text-pretty text-[1.0625rem] leading-relaxed text-ink-soft">
                No one here sees patients on behalf of someone else. Every physician below is who
                you&rsquo;ll actually sit across from.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="border-t border-line">
            {doctors.map((doctor, i) => (
              <div
                key={doctor.id}
                className="grid grid-cols-1 gap-8 border-b border-line py-14 md:grid-cols-12 md:gap-10 md:py-16"
              >
                <div className={`md:col-span-4 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden bg-mist">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      sizes="(min-width: 768px) 28vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div
                  className={`flex flex-col justify-center md:col-span-7 ${
                    i % 2 === 1 ? "md:order-1 md:col-start-2" : "md:col-start-6"
                  }`}
                >
                  <span className="font-display text-base text-green">{doctor.index}</span>
                  <h2 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl">
                    {doctor.name}
                  </h2>
                  <p className="mt-2 text-[0.75rem] font-medium tracking-[0.14em] text-ink-soft uppercase">
                    {doctor.credentials} &middot; {doctor.specialty}
                  </p>
                  <p className="mt-6 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-ink-soft">
                    {doctor.bio}
                  </p>
                  <p className="mt-6 text-[0.75rem] tracking-[0.1em] text-green uppercase">
                    {doctor.focus.join(" · ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand kicker="Book Now" title="Choose a physician and book directly." titleEmphasis="book directly.">
        <Button href="/contact" variant="inverse">
          Book a visit
        </Button>
      </CtaBand>
    </>
  );
}
