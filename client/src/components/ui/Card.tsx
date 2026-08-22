import type { PropsWithChildren } from "react";

interface CardProps {
  className?: string;
}

export default function Card({
  children,
  className = "",
}: PropsWithChildren<CardProps>) {
  return <section className={`card ${className}`}>{children}</section>;
}
