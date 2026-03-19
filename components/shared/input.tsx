import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border bg-[var(--surface)] px-3 py-2 text-sm",
            "border-[var(--border)] placeholder:opacity-40",
            "outline-none transition-colors",
            "focus:border-[var(--teal-500)] focus:bg-[var(--background)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-[var(--status-danger)]",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-[11px] text-[var(--danger-text)]">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };