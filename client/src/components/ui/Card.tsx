import type { PropsWithChildren } from "react";

interface CardProps {
  className?: string;
}

export default function Card({
  children,
  className = "",
}: PropsWithChildren<CardProps>) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-md p-6 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md ${className}`}
    >
      {children}
    </section>
  );
}
