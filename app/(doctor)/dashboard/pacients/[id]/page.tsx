"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Activity, Watch, Droplet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { StatusBadge } from "@/components/shared/status-dot";

export default function PatientDetailPage() {
  const patient = { name: "Ахметов Серик", age: 64, status: "danger" as const, diagnosis: "Артериальная гипертензия", device: "Apple Watch" };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/patients"><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">{patient.name} <StatusBadge status={patient.status} /></h1>
          <p className="text-sm opacity-60">{patient.age} года • {patient.diagnosis}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-[var(--status-danger)]/30 bg-[var(--danger-bg)]/20">
          <CardContent className="p-5 flex flex-col gap-2">
            <Heart className="h-5 w-5 text-[var(--status-danger)] animate-pulse" />
            <div className="mt-2"><span className="text-3xl font-bold text-[var(--status-danger)]">115</span><span className="text-sm opacity-60 ml-1">уд/мин</span></div>
          </CardContent>
        </Card>
        <Card><CardContent className="p-5 flex flex-col gap-2"><Activity className="h-5 w-5 text-[var(--primary-500)]" /><div className="mt-2"><span className="text-3xl font-bold">160/95</span></div></CardContent></Card>
        <Card><CardContent className="p-5 flex flex-col gap-2"><Droplet className="h-5 w-5 text-[#0ea5e9]" /><div className="mt-2"><span className="text-3xl font-bold">96</span><span className="text-sm opacity-60 ml-1">%</span></div></CardContent></Card>
        <Card><CardContent className="p-5 flex flex-col gap-2"><Watch className="h-5 w-5 text-[var(--status-warn)]" /><div className="mt-2"><span className="text-3xl font-bold">84</span><span className="text-sm opacity-60 ml-1">% Заряд</span></div></CardContent></Card>
      </div>
    </div>
  );
}