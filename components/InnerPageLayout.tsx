interface InnerPageLayoutProps {
  children: React.ReactNode;
}

export default function InnerPageLayout({ children }: InnerPageLayoutProps) {
  return (
    <main className="pt-28 sm:pt-32 md:pt-36 min-w-0 w-full overflow-x-hidden bg-brand-black">
      {children}
    </main>
  );
}
