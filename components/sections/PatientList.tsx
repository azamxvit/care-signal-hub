"use client";

import * as React from "react";
import Link from "next/link";
import { Activity, Heart, Droplet } from "lucide-react";
import { Avatar, AvatarFallback, getInitials } from "@/components/shared/avatar";
import { StatusBadge, StatusDot } from "@/components/shared/status-dot";
import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import { usePatients } from "@/hooks/usePatients";

export function PatientList() {
  const { patients } = usePatients();
  const previewPatients = patients.slice(0, 3); // пока только 3

  return (
    <Card className="flex h-full flex-col overflow-hidden border-[var(--border)] bg-[var(--background)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] p-4 bg-[var(--surface)]">
        <h3 className="font-semibold text-[var(--foreground)]">Пациенты под наблюдением</h3>
        <Link href="/dashboard/patients">
          <Button variant="outline" size="sm">Смотреть всех</Button>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto p-0">
        <div className="flex flex-col divide-y divide-[var(--border)]">
          {previewPatients.map((patient) => (
            <Link 
              key={patient.id} 
              href={`/dashboard/patients/${patient.id}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-[var(--surface-2)] transition-colors gap-4 cursor-pointer"
            >
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>{getInitials(patient.full_name)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-[var(--background)]">
                    <StatusDot status={patient.risk_level} size="sm" animated={patient.risk_level === 'danger'} />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{patient.full_name}</h4>
                  <p className="text-xs opacity-60 truncate max-w-[150px]">{patient.diagnoses.join(", ")}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5" title="Пульс (уд/мин)">
                  <Heart className={`h-4 w-4 ${patient.risk_level === "danger" ? "text-[var(--status-danger)] animate-pulse" : "text-[var(--status-danger)]"}`} />
                  <span className="font-medium">{patient.latest_reading?.heart_rate || "--"}</span>
                </div>
                <div className="flex items-center gap-1.5" title="Давление">
                  <Activity className="h-4 w-4 text-[var(--primary-500)]" />
                  <span className="font-medium">{patient.latest_reading?.systolic_bp || "--"}/{patient.latest_reading?.diastolic_bp || "--"}</span>
                </div>
                <div className="flex items-center gap-1.5" title="SpO2 (%)">
                  <Droplet className="h-4 w-4 text-[#0ea5e9]" />
                  <span className="font-medium">{patient.latest_reading?.spo2 || "--"}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 min-w-[140px]">
                <StatusBadge status={patient.risk_level} />
              </div>

            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}