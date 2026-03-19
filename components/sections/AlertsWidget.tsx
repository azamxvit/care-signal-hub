"use client";

import * as React from "react";
import { AlertTriangle, Activity, BellRing, Check } from "lucide-react";
import { Card } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";

// Моковые данные тревог (потом подключим к Supabase Realtime)
const mockAlerts = [
  {
    id: "1",
    patientName: "Ахметов Серик",
    type: "sos",
    message: "Нажата кнопка SOS",
    time: "Только что",
    severity: "danger",
  },
  {
    id: "2",
    patientName: "Иванова Елена",
    type: "vitals",
    message: "Критически высокий пульс (135 уд/мин)",
    time: "3 мин назад",
    severity: "danger",
  },
  {
    id: "3",
    patientName: "Оспанов Тимур",
    type: "device",
    message: "Браслет потерял связь",
    time: "15 мин назад",
    severity: "warning",
  },
];

export function AlertsWidget() {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-[var(--status-danger)]/20 shadow-sm shadow-[var(--status-danger)]/5">
      {/* Шапка виджета */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--danger-bg)]/50 p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--status-danger)] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--status-danger)]"></span>
          </div>
          <h3 className="font-semibold text-[var(--danger-text)]">Активные тревоги</h3>
        </div>
        <span className="rounded-full bg-[var(--status-danger)] px-2 py-0.5 text-xs font-bold text-white">
          {mockAlerts.length}
        </span>
      </div>

      {/* Список тревог */}
      <div className="flex-1 overflow-y-auto p-0">
        <div className="flex flex-col divide-y divide-[var(--border)]">
          {mockAlerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "flex flex-col gap-3 p-4 transition-colors hover:bg-[var(--surface-2)]",
                alert.severity === "danger" ? "bg-[var(--danger-bg)]/30" : ""
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  {/* Иконка типа тревоги */}
                  <div className={cn(
                    "mt-0.5 flex shrink-0 items-center justify-center rounded-full p-1.5",
                    alert.severity === "danger" ? "bg-[var(--status-danger)]/10 text-[var(--status-danger)]" : "bg-[var(--status-warn)]/10 text-[var(--warn-text)]"
                  )}>
                    {alert.type === "sos" ? <BellRing className="h-4 w-4" /> : alert.type === "vitals" ? <Activity className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  </div>
                  
                  {/* Текст тревоги */}
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--foreground)]">{alert.patientName}</h4>
                    <p className="text-xs font-medium opacity-80 mt-0.5">{alert.message}</p>
                    <span className="text-[11px] opacity-50 mt-1 block">{alert.time}</span>
                  </div>
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex items-center gap-2 pl-10">
                <Button size="sm" variant={alert.severity === "danger" ? "sos" : "default"} className="h-7 text-xs px-3">
                  Открыть карту
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-xs px-2 text-[var(--foreground)] opacity-70 hover:opacity-100">
                  <Check className="h-3 w-3 mr-1" />
                  Принять
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}