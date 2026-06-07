import Container from "@/components/Container";

type LegalSection = {
  title: string;
  paragraphs: string[];
};

interface LegalPageContentProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export default function LegalPageContent({
  title,
  updated,
  intro,
  sections,
}: LegalPageContentProps) {
  return (
    <section className="w-full py-12 md:py-16 bg-brand-black">
      <Container>
        <div className="max-w-3xl mx-auto min-w-0">
          <p className="text-brand-blue text-xs font-semibold tracking-widest uppercase mb-3">
            Legal
          </p>
          <h1 className="text-brand-white text-3xl md:text-4xl font-bold mb-3">{title}</h1>
          <p className="text-brand-dim text-sm mb-8">Last updated: {updated}</p>
          <p className="text-brand-silver text-base leading-relaxed mb-10">{intro}</p>

          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-brand-white text-lg font-semibold mb-3">{section.title}</h2>
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-brand-silver text-sm md:text-base leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
