import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/kicker";
import { ContactForm } from "@/components/contact/contact-form";
import { site } from "@/lib/content";

export function Contact() {
  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32">
      <Container>
        <Kicker label="Contact" />
        <h1 className="mt-6 max-w-2xl text-balance font-display text-[2.5rem] leading-[1.06] tracking-tight text-ink xs:text-5xl md:text-6xl">
          Let&rsquo;s find you a time.
        </h1>

        <div className="mt-16 grid grid-cols-1 gap-16 md:mt-20 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="flex flex-col gap-9">
              <div className="flex gap-4">
                <MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-green" />
                <div className="text-[0.9375rem] leading-relaxed text-ink-soft">
                  <p>{site.address.line1}</p>
                  <p>{site.address.line2}</p>
                  <p>{site.address.cityStateZip}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-green" />
                <a
                  href={`tel:${site.phoneHref}`}
                  className="text-[0.9375rem] text-ink-soft transition-colors hover:text-green"
                >
                  {site.phone}
                </a>
              </div>
              <div className="flex gap-4">
                <Mail size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-green" />
                <a
                  href={`mailto:${site.email}`}
                  className="text-[0.9375rem] text-ink-soft transition-colors hover:text-green"
                >
                  {site.email}
                </a>
              </div>
              <div className="flex gap-4">
                <Clock size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-green" />
                <div className="flex w-full flex-col gap-2 text-[0.9375rem] text-ink-soft">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-6">
                      <span>{h.days}</span>
                      <span className="text-ink">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-line pt-8">
              <p className="text-[0.8125rem] leading-relaxed text-ink-soft">
                Existing patient with an urgent concern? Call the clinic directly &mdash; the form
                is monitored during business hours only.
              </p>
            </div>
          </div>

          <div className="border border-line bg-mist p-6 md:col-span-7 md:col-start-6 md:p-10">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
