"use client";

import * as React from "react";
import { AlertTriangle, Activity, BellRing, Check, MapPin, Filter } from "lucide-react";
import { Card } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";

const allAlerts = [
  { id: "1", patient: "Ахметов Серик", type: "sos", message: "Обнаружено падение / SOS", time: "2 мин назад", severity: "danger", status: "active" },
  { id: "2", patient: "Иванова Елена", type: "vitals", message: "Критический пульс (135 уд/мин)", time: "15 мин назад", severity: "danger", status: "active" },
  { id: "3", patient: "Ким Александр", type: "vitals", message: "SpO2 упал до 91%", time: "1 час назад", severity: "warning", status: "active" },
  { id: "4", patient: "Оспанов Тимур", type: "device", message: "Низкий заряд устройства (5%)", time: "3 часа назад", severity: "warning", status: "resolved" },
];

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Шапка */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">Журнал тревог</h1>
          <p className="text-sm opacity-60 mt-1">Управление экстренными событиями пациентов</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Фильтры
          </Button>
        </div>
      </div>

      {/* Таблица алертов */}
      <Card className="overflow-hidden border-[var(--border)]">
        <div className="flex flex-col divide-y divide-[var(--border)]">
          {allAlerts.map((alert) => (
            <div key={alert.id} className={cn(
              "flex flex-col md:flex-row md:items-center justify-between p-4 transition-colors hover:bg-[var(--surface-2)] gap-4",
              alert.status === "resolved" ? "opacity-60 grayscale-[50%]" : (alert.severity === "danger" ? "bg-[var(--danger-bg)]/30" : "")
            )}>
              
              <div className="flex items-start gap-4">
                {/* Иконка */}
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                  alert.severity === "danger" ? "bg-[var(--status-danger)]/10 text-[var(--status-danger)]" : "bg-[var(--status-warn)]/10 text-[var(--warn-text)]"
                )}>
                  {alert.type === "sos" ? <BellRing className="h-5 w-5" /> : alert.type === "vitals" ? <Activity className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                </div>
                
                {/* Инфо */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--foreground)]">{alert.patient}</h4>
                  <p className="text-sm font-medium mt-0.5">{alert.message}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs font-medium opacity-60">
                    <span>{alert.time}</span>
                    {alert.status === "resolved" && <span className="text-[var(--status-ok)] flex items-center gap-1"><Check className="h-3 w-3"/>Решено</span>}
                  </div>
                </div>
              </div>

              {/* Действия */}
              {alert.status === "active" && (
                <div className="flex items-center gap-2 md:self-end">
                  {alert.type === "sos" && (
                    <Button size="sm" variant="outline" className="h-8 gap-2">
                      <MapPin className="h-3 w-3" /> Геолокация
                    </Button>
                  )}
                  <Button size="sm" variant={alert.severity === "danger" ? "sos" : "default"} className="h-8 gap-2">
                    <Check className="h-3 w-3" /> Принять вызов
                  </Button>
                </div>
              )}
              
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}