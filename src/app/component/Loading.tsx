import { Spinner } from "@heroui/react";

interface LoadingSpinnerProps {
  label?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fullScreen?: boolean;
  className?: string;
}

const LoadingSpinner = ({
  label = "লোড হচ্ছে...",
  size = "lg",
  fullScreen = false,
  className = "",
}: LoadingSpinnerProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? "min-h-[60vh] w-full" : "py-6"
      } ${className}`}
    >
      <Spinner color="success" size={size} />

      {label && (
        <span className="text-xs font-medium text-muted sm:text-sm">
          {label}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;
