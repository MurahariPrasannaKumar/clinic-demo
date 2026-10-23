import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/kicker";
import { SafeImageBlock } from "@/components/ui/safe-image";
import { galleryImages } from "@/lib/content";

export function Gallery() {
  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32">
      <Container>
        <Kicker label="Gallery" />
        <h1 className="mt-6 max-w-2xl text-balance font-display text-[2.5rem] leading-[1.06] tracking-tight text-ink xs:text-5xl md:text-6xl">
          A look inside Alder.
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-ink-soft">
          Our waiting areas, exam rooms, and care spaces &mdash; designed for calm, unhurried
          visits from the moment you walk in.
        </p>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          {galleryImages.map((image) => (
            <figure
              key={image.id}
              className="group relative mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-line bg-mist transition-colors duration-700"
            >
              <SafeImageBlock
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 90vw"
                className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                fallbackIconSize={28}
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-[0.8125rem] font-medium text-white">{image.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
