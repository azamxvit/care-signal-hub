"use client";

import * as React from "react";
import { Activity, Heart, Droplet } from "lucide-react";
import { Avatar, AvatarFallback, getInitials } from "@/components/shared/avatar";
import { StatusBadge, StatusDot } from "@/components/shared/status-dot";
import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import { VitalStatus } from "@/lib/types";
import Link from "next/link";

// Временные данные для визуала (потом заменим на данные из Supabase)
const mockPatients = [
  {
    id: "1",
    name: "Ахметов Серик",
    diagnosis: "Гипертония 2 ст.",
    status: "danger" as VitalStatus,
    vitals: { hr: 115, bp: "160/95", spo2: 96 },
    time: "Только что"
  },
  {
    id: "2",
    name: "Иванова Елена",
    diagnosis: "ИБС, Стенокардия",
    status: "warning" as VitalStatus,
    vitals: { hr: 88, bp: "135/85", spo2: 94 },
    time: "5 мин назад"
  },
  {
    id: "3",
    name: "Оспанов Тимур",
    diagnosis: "Здоров, мониторинг",
    status: "ok" as VitalStatus,
    vitals: { hr: 72, bp: "120/80", spo2: 99 },
    time: "12 мин назад"
  }
];

export function PatientList() {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-[var(--border)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] p-4 bg-[var(--surface)]">
        <h3 className="font-semibold text-[var(--foreground)]">Пациенты под наблюдением</h3>
        <Button variant="outline" size="sm">Смотреть всех</Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-0">
        <div className="flex flex-col divide-y divide-[var(--border)]">
          {mockPatients.map((patient) => (
            <Link 
              key={patient.id} 
              href={`/dashboard/patients/${patient.id}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-[var(--surface-2)] transition-colors gap-4 cursor-pointer"
            >  
              {/* Левая часть: Профиль */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-[var(--background)]">
                    <StatusDot status={patient.status} size="sm" animated />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{patient.name}</h4>
                  <p className="text-xs opacity-60">{patient.diagnosis}</p>
                </div>
              </div>

              {/* Центральная часть: Витальные показатели */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5" title="Пульс (уд/мин)">
                  <Heart className={patient.status === "danger" ? "h-4 w-4 text-[var(--status-danger)] animate-pulse" : "h-4 w-4 text-[var(--status-danger)]"} />
                  <span className="font-medium">{patient.vitals.hr}</span>
                </div>
                <div className="flex items-center gap-1.5" title="Давление">
                  <Activity className="h-4 w-4 text-[var(--primary-500)]" />
                  <span className="font-medium">{patient.vitals.bp}</span>
                </div>
                <div className="flex items-center gap-1.5" title="SpO2 (%)">
                  <Droplet className="h-4 w-4 text-[#0ea5e9]" />
                  <span className="font-medium">{patient.vitals.spo2}%</span>
                </div>
              </div>

              {/* Правая часть: Статус и кнопка */}
              <div className="flex items-center justify-between sm:justify-end gap-3 min-w-[140px]">
                <div className="hidden lg:block text-xs opacity-50">{patient.time}</div>
                <StatusBadge status={patient.status} />
              </div>

            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}