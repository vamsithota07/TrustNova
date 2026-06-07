import type { ReactNode } from "react";

export const containerClass =
  "w-full max-w-editorial mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 min-w-0";

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
