export default function SectionSeparator() {
  return (
    <div className="flex items-center justify-center py-2 w-full bg-brand-black">
      <div className="h-px bg-brand-rule flex-1 max-w-[1400px]" />
      <div className="text-brand-blue mx-4 text-lg shrink-0">◆</div>
      <div className="h-px bg-brand-rule flex-1 max-w-[1400px]" />
    </div>
  );
}
