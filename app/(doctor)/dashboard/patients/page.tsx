"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Heart, Activity, Droplet } from "lucide-react";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import { Avatar, AvatarFallback, getInitials } from "@/components/shared/avatar";
import { StatusBadge, StatusDot } from "@/components/shared/status-dot";
import { usePatients } from "@/hooks/usePatients";
import { VitalStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const filterButtons: { label: string; value: VitalStatus | 'all' }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Критично', value: 'danger' },
  { label: 'Внимание', value: 'warning' },
  { label: 'Норма', value: 'ok' },
  { label: 'Нет связи', value: 'offline' },
];

export default function PatientsDirectoryPage() {
  const { filteredPatients, searchTerm, setSearchTerm, activeFilter, setActiveFilter } = usePatients();

  return (
    <div className="flex flex-col gap-6 p-4 md:p-0">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">База пациентов</h1>
          <p className="text-sm opacity-60 mt-1">Всего найдено: {filteredPatients.length} человек</p>
        </div>
      </div>

      <Card className="p-4 bg-[var(--surface)] border-[var(--border)]">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--foreground)] opacity-40" />
            <Input 
              placeholder="Поиск по ИИН, ФИО или диагнозу..." 
              className="pl-9 bg-[var(--background)] h-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-4 px-4 md:-mx-0 md:px-0">
            {filterButtons.map(btn => (
              <Button 
                key={btn.value} 
                variant={activeFilter === btn.value ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "h-9 px-3 text-xs whitespace-nowrap",
                  activeFilter === btn.value && btn.value === 'danger' && "bg-[var(--danger-bg)] text-[var(--status-danger)] hover:bg-[var(--danger-bg)]/80",
                )}
                onClick={() => setActiveFilter(btn.value)}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="overflow-hidden border-[var(--border)] md:border-none md:bg-transparent">
        <div className="grid grid-cols-1 md:divide-y md:divide-[var(--border)] gap-4 md:gap-0">
          
          {filteredPatients.length === 0 ? (
            <Card className="md:bg-[var(--background)]">
              <div className="p-16 text-center text-sm opacity-50 flex flex-col items-center justify-center gap-3">
                <Search className="h-8 w-8 opacity-20" /> Ничего не найдено
              </div>
            </Card>
          ) : (
            filteredPatients.map((patient) => (
              <Link key={patient.id} href={`/dashboard/patients/${patient.id}`}>
                
                {/* МОБИЛЬНАЯ КАРТОЧКА */}
                <Card className="p-4 flex flex-col gap-4 md:hidden border border-[var(--border)] bg-[var(--surface)]">
                  <div className="flex items-center gap-3">
                    <Avatar><AvatarFallback>{getInitials(patient.full_name)}</AvatarFallback></Avatar>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">{patient.full_name}</h4>
                      <p className="text-xs opacity-60 truncate">{patient.diagnoses.join(", ")}</p>
                    </div>
                    <StatusDot status={patient.risk_level} size="sm" animated={patient.risk_level === 'danger'} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs p-3 bg-[var(--surface-2)] rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <Heart className={`h-4 w-4 ${patient.risk_level === "danger" ? "text-[var(--status-danger)] animate-pulse" : "text-[var(--status-danger)]"}`} />
                      Пульс: <span className="font-semibold">{patient.latest_reading?.heart_rate || "--"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Activity className="h-4 w-4 text-[var(--primary-500)]" />
                      АД: <span className="font-semibold">{patient.latest_reading?.systolic_bp || "--"}/{patient.latest_reading?.diastolic_bp || "--"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Droplet className="h-4 w-4 text-[#0ea5e9]" />
                      SpO₂: <span className="font-semibold">{patient.latest_reading?.spo2 || "--"}%</span>
                    </div>
                    <div className="text-right flex items-center justify-end">
                      <StatusBadge status={patient.risk_level} />
                    </div>
                  </div>
                </Card>

                {/* ДЕСКТОПНАЯ СТРОКА */}
                <div className="hidden md:flex flex-row md:items-center justify-between p-4 bg-[var(--surface)] hover:bg-[var(--surface-2)] transition-colors gap-4 cursor-pointer">
                  <div className="flex items-center gap-3 w-full md:w-[30%]">
                    <div className="relative">
                      <Avatar><AvatarFallback>{getInitials(patient.full_name)}</AvatarFallback></Avatar>
                      <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-[var(--background)]">
                        <StatusDot status={patient.risk_level} size="sm" animated={patient.risk_level === 'danger'} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--foreground)]">{patient.full_name}</h4>
                      <p className="text-xs opacity-60 truncate max-w-[200px]">{patient.diagnoses.join(", ")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm w-full md:w-[40%]">
                    <div className="flex items-center gap-1.5 w-16">
                      <Heart className={`h-4 w-4 ${patient.risk_level === "danger" ? "text-[var(--status-danger)] animate-pulse" : "text-[var(--status-danger)]"}`} />
                      <span className="font-medium text-[var(--status-danger)]">{patient.latest_reading?.heart_rate || "--"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 w-20">
                      <Activity className="h-4 w-4 text-[var(--primary-500)]" />
                      <span className="font-medium">{patient.latest_reading?.systolic_bp || "--"}/{patient.latest_reading?.diastolic_bp || "--"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 w-16">
                      <Droplet className="h-4 w-4 text-[#0ea5e9]" />
                      <span className="font-medium">{patient.latest_reading?.spo2 || "--"}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end gap-3 w-full md:w-[30%]">
                    <StatusBadge status={patient.risk_level} />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}