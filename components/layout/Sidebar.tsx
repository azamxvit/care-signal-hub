"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Activity, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/button";

const navItems = [
  { name: "Обзор", href: "/dashboard", icon: LayoutDashboard },
  { name: "Пациенты", href: "/dashboard/patients", icon: Users },
  { name: "Алерты", href: "/dashboard/alerts", icon: Activity },
  { name: "Настройки", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between p-4">
      {/* Лого */}
      <div>
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--teal-500)] text-white">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">
            Saulyk
          </span>
        </div>

        {/* Нав */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <span
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[var(--teal-50)] text-[var(--teal-700)] dark:bg-[var(--teal-500)]/10 dark:text-[var(--teal-500)]"
                      : "text-[var(--foreground)] opacity-70 hover:bg-[var(--surface)] hover:opacity-100"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive && "text-[var(--teal-500)]")} />
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Кнопка выхода */}
      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-start gap-3 opacity-70 hover:opacity-100">
          <LogOut className="h-4 w-4" />
          Выйти
        </Button>
      </div>
    </div>
  );
}