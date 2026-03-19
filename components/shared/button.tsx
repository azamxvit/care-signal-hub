"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:     "bg-[var(--teal-700)] text-white hover:bg-[var(--teal-900)] active:scale-[0.98]",
        destructive: "bg-[#E24B4A] text-white hover:bg-[#A32D2D] active:scale-[0.98]",
        outline:     "border border-[var(--border-strong)] bg-transparent hover:bg-[var(--surface)] active:scale-[0.98]",
        ghost:       "bg-transparent hover:bg-[var(--surface)] active:scale-[0.98]",
        secondary:   "bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-2)] active:scale-[0.98]",
        sos:         "bg-[#E24B4A] text-white hover:bg-[#A32D2D] active:scale-[0.97] font-semibold tracking-wide",
      },
      size: {
        sm:      "h-8 px-3 text-xs",
        default: "h-10 px-4",
        lg:      "h-12 px-6 text-base",
        icon:    "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };