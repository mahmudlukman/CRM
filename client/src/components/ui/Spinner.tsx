import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "cyan" | "blue" | "slate" | "white";
  className?: string;
}

const SIZE_MAP = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const BORDER_SIZE_MAP = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-3",
  xl: "w-16 h-16 border-4",
};

const COLOR_MAP = {
  cyan: "border-cyan-600 border-t-transparent text-cyan-600",
  blue: "border-blue-600 border-t-transparent text-blue-600",
  slate: "border-slate-600 border-t-transparent text-slate-600",
  white: "border-white border-t-transparent text-white",
};

export const Spinner = ({
  size = "md",
  color = "cyan",
  className = "",
}: SpinnerProps) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${BORDER_SIZE_MAP[size]} ${COLOR_MAP[color]} rounded-full animate-spin shrink-0 ${className}`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export const IconSpinner = ({
  size = "md",
  className = "",
}: Omit<SpinnerProps, "color">) => {
  return (
    <div className="flex justify-center items-center">
      <Loader2
        className={`${SIZE_MAP[size]} animate-spin text-cyan-600 shrink-0 ${className}`}
      />
    </div>
  );
};

export const ButtonSpinner = ({ className = "" }: { className?: string }) => {
  return <Loader2 className={`w-4 h-4 animate-spin shrink-0 ${className}`} />;
};
