export default function SectionSeparator() {
  return (
    <div className="w-full bg-brand-black py-1" aria-hidden>
      <div className="mx-auto max-w-editorial px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-rule to-transparent" />
      </div>
    </div>
  );
}
