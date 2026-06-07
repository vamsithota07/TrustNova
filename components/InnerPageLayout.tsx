interface InnerPageLayoutProps {
  children: React.ReactNode;
}

export default function InnerPageLayout({ children }: InnerPageLayoutProps) {
  return (
    <main className="pt-20 sm:pt-24 md:pt-28 lg:pt-36 min-w-0 w-full overflow-x-hidden">
      {children}
    </main>
  );
}
