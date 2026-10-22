import Container from "@/components/Container";
import SectionHeader from "./SectionHeader";
import { testimonials } from "@/lib/testimonials";

/** What clients say, in their own words. Renders nothing until lib/testimonials.ts has a real quote. */
export default function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section className="relative w-full py-section bg-brand-black overflow-hidden">
      <Container>
        <SectionHeader eyebrow="Clients" heading="In Their Own Words" highlight="Own Words" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 min-w-0">
          {testimonials.map((t) => (
            <figure key={t.name} className="creative-card flex min-w-0 flex-col p-8">
              <blockquote className="editorial-body flex-1 text-base leading-[1.75]">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6">
                <span className="block font-display font-bold text-brand-white">{t.name}</span>
                <span className="text-sm text-brand-dim">{t.business}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
