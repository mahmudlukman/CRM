// src/components/common/Loaders/Spinner.tsx
interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  className?: string;
}

export const Spinner = ({
  size = "md",
  color = "blue-600",
  className = "",
}: SpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-4",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-${color} border-t-transparent rounded-full animate-spin ${className}`}
        style={{ borderColor: `var(--tw-border-${color})` }}
      />
    </div>
  );
};

export const ButtonSpinner = () => {
  return (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
};
