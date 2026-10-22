import { type ComponentType, type ReactNode } from "react";
import Image from "next/image";

type CtaFeature = {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
};

type CtaImage = {
  src: string;
  alt: string;
};

type CtaTheme = "dark" | "light";

function renderTitle(title: string, emphasis?: string, emphasisClass = "italic text-green-mist") {
  if (!emphasis) return title;
  const index = title.indexOf(emphasis);
  if (index === -1) return title;
  return (
    <>
      {title.slice(0, index)}
      <span className={emphasisClass}>{emphasis}</span>
      {title.slice(index + emphasis.length)}
    </>
  );
}

export function CtaBand({
  theme = "dark",
  kicker,
  title,
  titleEmphasis,
  description,
  features,
  image,
  children,
}: {
  theme?: CtaTheme;
  kicker?: string;
  title: string;
  titleEmphasis?: string;
  description?: string;
  features?: CtaFeature[];
  image?: CtaImage;
  children: ReactNode;
}) {
  const light = theme === "light";

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full px-6 md:px-10 xl:px-16">
        <div
          className={`relative grid grid-cols-1 items-stretch overflow-hidden rounded-[40px] md:grid-cols-12 ${
            light ? "border border-line bg-white text-ink" : "bg-green-deep text-white"
          }`}
        >
          <div
            className={`pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full blur-3xl ${
              light ? "bg-green-mist" : "bg-green/25"
            }`}
            aria-hidden
          />
          <div
            className={`pointer-events-none absolute -top-10 -right-10 h-56 w-56 rounded-full blur-3xl ${
              light ? "bg-green-mist/70" : "bg-white/5"
            }`}
            aria-hidden
          />
          <div
            className={`pointer-events-none absolute top-1/2 right-[18%] hidden h-[140%] w-[55%] -translate-y-1/2 rounded-full border md:block ${
              light ? "border-line" : "border-white/10"
            }`}
            aria-hidden
          />

          <div
            className={`relative flex flex-col justify-center px-8 py-14 md:py-20 md:pl-16 ${
              image ? "md:col-span-4 md:pr-8" : "md:col-span-8 md:pr-12"
            }`}
          >
            {kicker && (
              <div
                className={`flex items-center gap-2.5 text-[0.6875rem] font-medium tracking-[0.18em] uppercase ${
                  light ? "text-ink-soft" : "text-white/65"
                }`}
              >
                <span className={`h-px w-6 ${light ? "bg-line" : "bg-white/40"}`} aria-hidden />
                {kicker}
              </div>
            )}
            <h2
              className={`text-balance font-display text-4xl leading-[1.1] tracking-tight md:text-[2.75rem] ${
                kicker ? "mt-5" : ""
              }`}
            >
              {renderTitle(title, titleEmphasis, light ? "italic text-green" : "italic text-green-mist")}
            </h2>
            {description && (
              <p
                className={`mt-5 max-w-sm text-pretty text-[1.0625rem] leading-relaxed ${
                  light ? "text-ink-soft" : "text-white/75"
                }`}
              >
                {description}
              </p>
            )}
            {features && features.length > 0 && (
              <div className="mt-9 flex flex-wrap items-start gap-x-7 gap-y-5">
                {features.map((feature, i) => (
                  <div
                    key={feature.label}
                    className={`flex flex-col items-center gap-3 text-center ${
                      i > 0 ? (light ? "border-l border-line pl-7" : "border-l border-white/15 pl-7") : ""
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                        light ? "bg-green-mist text-green" : "bg-white/10 text-white"
                      }`}
                    >
                      <feature.icon size={18} strokeWidth={1.75} />
                    </span>
                    <span
                      className={`max-w-24 text-[0.875rem] leading-snug ${
                        light ? "text-ink" : "text-white/90"
                      }`}
                    >
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {image && (
            <div className="relative hidden md:col-span-4 md:block">
              <div className="absolute inset-x-6 inset-y-10 overflow-hidden rounded-t-[200px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]">
                <Image src={image.src} alt={image.alt} fill sizes="320px" className="object-cover" />
              </div>
            </div>
          )}

          <div
            className={`relative flex flex-col items-start gap-5 px-8 py-10 md:py-20 md:pr-16 ${
              image
                ? "md:col-span-4 md:items-center md:justify-center"
                : "md:col-span-4 md:items-end md:justify-center md:text-right"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
