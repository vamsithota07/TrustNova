import type { ReactNode } from "react";

export const containerClass =
  "w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 min-w-0 ultra-wide-container";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
}

export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={`${containerClass}${className ? ` ${className}` : ""}`}>
      {children}
    </Tag>
  );
}
