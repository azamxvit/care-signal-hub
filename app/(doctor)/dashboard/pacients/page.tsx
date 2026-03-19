"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Filter, Plus, Heart, Activity, Droplet } from "lucide-react";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import { Avatar, AvatarFallback, getInitials } from "@/components/shared/avatar";
import { StatusBadge, StatusDot } from "@/components/shared/status-dot";
import { usePatients } from "@/hooks/usePatients";

export default function PatientsDirectoryPage() {
  const { patients } = usePatients();

  return (
    <div className="flex flex-col gap-6">
      
      {/* Шапка страницы */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">База пациентов</h1>
          <p className="text-sm opacity-60 mt-1">Всего под наблюдением: {patients.length} человек</p>
        </div>
      </div>

      {/* Таблица/Список пациентов */}
      <Card className="overflow-hidden border-[var(--border)]">
        <div className="flex flex-col divide-y divide-[var(--border)]">
          {patients.map((patient) => (
            <Link 
              key={patient.id} 
              href={`/dashboard/patients/${patient.id}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-[var(--surface-2)] transition-colors gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3 w-full sm:w-[30%]">
                <Avatar><AvatarFallback>{getInitials(patient.name)}</AvatarFallback></Avatar>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--foreground)]">{patient.name}</h4>
                  <p className="text-xs opacity-60">{patient.diagnosis}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm w-full sm:w-[40%]">
                <div className="flex items-center gap-1.5 w-16">
                  <Heart className="h-4 w-4 text-[var(--status-danger)]" /> {patient.vitals.hr}
                </div>
                <div className="flex items-center gap-1.5 w-20">
                  <Activity className="h-4 w-4 text-[var(--primary-500)]" /> {patient.vitals.bp}
                </div>
                <div className="flex items-center gap-1.5 w-16">
                  <Droplet className="h-4 w-4 text-[#0ea5e9]" /> {patient.vitals.spo2}%
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 w-full sm:w-[30%]">
                <StatusBadge status={patient.status} />
              </div>
            </Link>
          ))}
        </div>
      </Card>
      
    </div>
  );
}