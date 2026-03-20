"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart, Activity, Watch, Droplet, Clock, Thermometer, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { StatusBadge } from "@/components/shared/status-dot";
import { usePatients } from "@/hooks/usePatients";
import { VitalsChart } from "@/components/widgets/VitalsChart";

interface PatientDetailPageProps {
  params: { id: string };
}

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  const { findPatientById } = usePatients();
  const patient = findPatientById(params.id);

  if (!patient) notFound();

  // расчет возраста для ui
  const birthYear = new Date(patient.birth_date).getFullYear();
  const age = new Date().getFullYear() - birthYear;

  const isDangerHr = (patient.latest_reading?.heart_rate ?? 0) >= 100;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Нав и Шапка */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/patients">
            <Button variant="outline" size="icon" className="h-9 w-9 bg-[var(--surface)]"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] flex items-center gap-3">
              {patient.full_name}
              <StatusBadge status={patient.risk_level} animated={patient.risk_level === 'danger'} />
            </h1>
            <p className="text-sm opacity-60 mt-0.5">
              {age} года • {patient.district}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-[var(--surface)]"><MapPin className="h-4 w-4" /> {patient.village}</Button>
          <Button variant="sos" className="gap-2"><Phone className="h-4 w-4" /> Связаться</Button>
        </div>
      </div>

      {/* Инфо об устройстве и диагнозе */}
      <Card className="bg-[var(--surface-2)]">
        <CardContent className="p-4 flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-sm opacity-70">Диагнозы</CardTitle>
            <p className="font-semibold text-base mt-0.5">{patient.diagnoses.join(", ")}</p>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--background)] border border-[var(--border)]">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${!patient.device_online ? 'bg-neutral-500' : 'bg-[var(--primary-500)]'}`}>
              <Watch className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">ID: {patient.device_id || "Нет устройства"}</p>
              <p className="text-xs mt-0.5 flex items-center gap-1">
                <span className={`h-2 w-2 rounded-full ${patient.device_online ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {patient.device_online ? "Онлайн" : "Офлайн"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Текущие показатели */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className={isDangerHr ? "border-[var(--status-danger)]/50 bg-[var(--danger-bg)]/40" : ""}>
          <CardContent className="p-5 flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <Heart className={`h-5 w-5 ${isDangerHr ? "text-[var(--status-danger)] animate-pulse" : "text-[var(--status-danger)]"}`} />
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium"><Clock className="h-3.5 w-3.5" /> Только что</div>
            </div>
            <div className="mt-2">
              <span className={`text-3xl font-bold ${isDangerHr ? "text-[var(--status-danger)]" : "text-[var(--foreground)]"}`}>{patient.latest_reading?.heart_rate || "--"}</span>
              <span className="text-sm opacity-60 ml-1">уд/мин</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex flex-col gap-2">
            <Activity className="h-5 w-5 text-[var(--primary-500)]" />
            <div className="mt-2">
              <span className="text-3xl font-bold text-[var(--foreground)]">{patient.latest_reading?.systolic_bp || "--"}/{patient.latest_reading?.diastolic_bp || "--"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex flex-col gap-2">
            <Droplet className="h-5 w-5 text-[#0ea5e9]" />
            <div className="mt-2">
              <span className="text-3xl font-bold text-[var(--foreground)]">{patient.latest_reading?.spo2 || "--"}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex flex-col gap-2">
            <Thermometer className="h-5 w-5 text-[var(--status-warn)]" />
            <div className="mt-2">
              <span className="text-3xl font-bold text-[var(--foreground)]">{patient.latest_reading?.temperature || "--"}</span>
              <span className="text-sm opacity-60 ml-1">°C</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-lg font-semibold mt-4">Динамика за 24 часа</h2>
      <div className="h-auto">
        <VitalsChart data={patient.vitals_history} />
      </div>

    </div>
  );
}