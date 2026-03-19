import { cn } from "@/lib/utils";
import type { VitalStatus } from "@/lib/types";

const dotColor: Record<VitalStatus, string> = {
  ok:      "bg-[var(--status-ok)]",
  warning: "bg-[var(--status-warn)]",
  danger:  "bg-[var(--status-danger)]",
  offline: "bg-[var(--status-offline)]",
};

const badgeStyle: Record<VitalStatus, string> = {
  ok:      "bg-[var(--teal-50)]    text-[var(--teal-700)]    border-[var(--teal-100)]",
  warning: "bg-[var(--warn-bg)]    text-[var(--warn-text)]   border-[var(--warn-bg)]",
  danger:  "bg-[var(--danger-bg)]  text-[var(--danger-text)] border-[var(--danger-bg)]",
  offline: "bg-[var(--surface-2)]  text-[var(--foreground)]  border-[var(--border)] opacity-60",
};

const labelMap: Record<VitalStatus, string> = {
  ok:      "Норма",
  warning: "Внимание",
  danger:  "Критично",
  offline: "Нет связи",
};

interface StatusDotProps {
  status: VitalStatus;
  animated?: boolean;
  size?: "sm" | "md";
}

export function StatusDot({ status, animated = true, size = "sm" }: StatusDotProps) {
  const color = dotColor[status];
  const sizeClass = size === "sm" ? "h-2 w-2" : "h-3 w-3";
  const shouldAnimate = animated && (status === "danger" || status === "warning");

  return (
    <span className="relative inline-flex">
      <span className={cn("rounded-full", color, sizeClass)} />
      {shouldAnimate && (
        <span className={cn("absolute inline-flex rounded-full opacity-75 animate-ping", color, sizeClass)} />
      )}
    </span>
  );
}

export function StatusBadge({ status }: { status: VitalStatus }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", badgeStyle[status])}>
      <StatusDot status={status} size="sm" />
      {labelMap[status]}
    </span>
  );
}