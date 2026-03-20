import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart, Activity, Watch, Droplet, Clock, Thermometer, Phone, MapPin, Contact, Ruler, Weight, FlaskConical, AlertCircle, Pill } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { StatusBadge } from "@/components/shared/status-dot";
import { usePatients } from "@/hooks/usePatients";
import { VitalsChart } from "@/components/widgets/VitalsChart";
import { Separator } from "@/components/shared/separator";

interface PatientDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
  const { id } = await params;
  
  
  const { MOCK_PATIENTS } = await import("@/lib/mock-data");
  const patient = MOCK_PATIENTS.find(p => p.id === id);

  if (!patient) notFound();

  // Расчет возраста
  const birthYear = new Date(patient.birth_date).getFullYear();
  const age = new Date().getFullYear() - birthYear;

  // Расчет ИМТ (BMI)
  const heightM = (patient.biometrics?.height_cm ?? 0) / 100;
  const weight = patient.biometrics?.weight_kg ?? 0;
  const bmi = heightM > 0 ? (weight / (heightM * heightM)).toFixed(1) : "--";

  const isDangerHr = (patient.latest_reading?.heart_rate ?? 0) >= 100;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Шапка */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/patients">
            <Button variant="outline" size="icon" className="h-10 w-10 bg-[var(--surface)] border-[var(--border)]"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] flex items-center gap-3">
              {patient.full_name}
              <StatusBadge status={patient.risk_level} />
            </h1>
            <p className="text-sm opacity-60 mt-1">
              {age} года • {patient.district} • ИИН: 600512300123
            </p>
          </div>
        </div>
        <div className="flex gap-3 Server">
          <Button variant="outline" className="gap-2.5 bg-[var(--surface)] border-[var(--border)] h-11"><MapPin className="h-4 w-4 text-[var(--primary-500)]" /> {patient.village}</Button>
            <Button variant="default" className="gap-2.5 h-11 px-6">
              <Phone className="h-4 w-4" /> Связаться
            </Button>
        </div>
      </div>

      {/* Центральный Блок */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Медицинский паспорт */}
        <Card className="xl:col-span-2 bg-[var(--surface)] border-[var(--border)]">
          <CardHeader className="p-5 pb-3 border-b border-[var(--border)]">
            <CardTitle className="text-lg font-semibold flex items-center gap-2.5 text-[var(--foreground)]">
              <Contact className="h-5 w-5 text-[var(--primary-500)]" />
              Медицинский паспорт пациента
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[var(--surface-2)]">
              <FlaskConical className="h-8 w-8 text-rose-500 opacity-80" />
              <div>
                <p className="text-xs text-neutral-500">Группа крови</p>
                <p className="font-bold text-lg mt-0.5">{patient.biometrics?.blood_type || "--"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[var(--surface-2)]">
              <Ruler className="h-8 w-8 text-sky-500 opacity-80" />
              <div>
                <p className="text-xs text-neutral-500">Рост</p>
                <p className="font-bold text-lg mt-0.5">{patient.biometrics?.height_cm || "--"} <span className="text-sm opacity-60">см</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[var(--surface-2)]">
              <Weight className="h-8 w-8 text-amber-500 opacity-80" />
              <div>
                <p className="text-xs text-neutral-500">Вес</p>
                <p className="font-bold text-lg mt-0.5">{patient.biometrics?.weight_kg || "--"} <span className="text-sm opacity-60">кг</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[var(--surface-2)]">
              <Activity className="h-8 w-8 text-emerald-500 opacity-80" />
              <div>
                <p className="text-xs text-neutral-500">ИМТ (BMI)</p>
                <p className="font-bold text-lg mt-0.5">{bmi}</p>
              </div>
            </div>
          </CardContent>
          
          <Separator className="bg-[var(--border)]" />
          
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm text-[var(--foreground)]">Аллергические реакции</p>
                {patient.biometrics?.allergies.length ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {patient.biometrics.allergies.map((allergy: string) => (
                      <span key={allergy} className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                        {allergy}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500 mt-1">Не зафиксированы</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Устройство и Статус */}
        <Card className="bg-[var(--surface)] border-[var(--border)] flex flex-col justify-center items-center p-6 text-center">
            <div className={`h-16 w-16 rounded-full flex items-center justify-center text-white mb-4 ${!patient.device_online ? 'bg-neutral-500' : 'bg-[var(--primary-500)]'}`}>
              <Watch className="h-8 w-8" />
            </div>
            <CardTitle className="text-lg font-semibold">{patient.device_id || "Нет устройства"}</CardTitle>
            <p className="text-sm mt-1.5 flex items-center gap-1.5 font-medium">
                <span className={`h-2.5 w-2.5 rounded-full ${patient.device_online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                {patient.device_online ? "Устройство в сети" : "Связь потеряна"}
            </p>
            <p className="text-xs opacity-60 mt-1">Последняя синхронизация: Только что</p>
        </Card>

      </div>

      {/* Текущие показатели */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Пульс */}
        <Card className={isDangerHr ? "border-[var(--status-danger)]/50 bg-[var(--danger-bg)]/40" : "bg-[var(--surface)] border-[var(--border)]"}>
          <CardContent className="p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs text-neutral-500 font-medium">

                <span className="flex items-center gap-2"><Heart className={`h-4 w-4 ${isDangerHr ? "text-[var(--status-danger)] animate-pulse" : "text-[var(--status-danger)]"}`} /> Пульс (ЧСС)</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Только что</span>
            </div>
            <div className="mt-1">
              <span className={`text-3xl font-bold ${isDangerHr ? "text-[var(--status-danger)]" : "text-[var(--foreground)]"}`}>{patient.latest_reading?.heart_rate || "--"}</span>
              <span className="text-sm opacity-60 ml-1.5">уд/мин</span>
              <span className="text-xs font-medium ml-3 text-red-600 px-2 py-0.5 bg-red-100 rounded dark:bg-red-950">Высокий</span>
            </div>
          </CardContent>
        </Card>

        {/* Давление */}
        <Card className="bg-[var(--surface)] border-[var(--border)]">
          <CardContent className="p-5 flex flex-col gap-3">
             <div className="flex justify-between items-center text-xs text-neutral-500 font-medium">

                <span className="flex items-center gap-2"><Activity className="h-4 w-4 text-[var(--primary-500)]" /> Кр. давление (АД)</span>
            </div>
            <div className="mt-1">
              <span className="text-3xl font-bold text-[var(--foreground)]">{patient.latest_reading?.systolic_bp || "--"}/{patient.latest_reading?.diastolic_bp || "--"}</span>
              <span className="text-sm opacity-60 ml-1.5">mmHg</span>
            </div>
          </CardContent>
        </Card>

        {/* Сатурация */}
        <Card className="bg-[var(--surface)] border-[var(--border)]">
          <CardContent className="p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs text-neutral-500 font-medium">
                {/* 🔥 Добавили текстовую подпись */}
                <span className="flex items-center gap-2"><Droplet className="h-4 w-4 text-[#0ea5e9]" /> Кислород (SpO₂)</span>
            </div>
            <div className="mt-1">
              <span className="text-3xl font-bold text-[var(--foreground)]">{patient.latest_reading?.spo2 || "--"}</span>
              <span className="text-sm opacity-60 ml-1.5">%</span>
              <span className="text-xs font-medium ml-3 text-green-600 px-2 py-0.5 bg-green-100 rounded dark:bg-green-950">Норма</span>
            </div>
          </CardContent>
        </Card>

        {/* Температура */}
        <Card className="bg-[var(--surface)] border-[var(--border)]">
          <CardContent className="p-5 flex flex-col gap-3">
             <div className="flex justify-between items-center text-xs text-neutral-500 font-medium">
                {/* 🔥 Добавили текстовую подпись */}
                <span className="flex items-center gap-2"><Thermometer className="h-4 w-4 text-[var(--status-warn)]" /> Температура</span>
            </div>
            <div className="mt-1">
              <span className="text-3xl font-bold text-[var(--foreground)]">{patient.latest_reading?.temperature || "--"}</span>
              <span className="text-sm opacity-60 ml-1.5">°C</span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Нижний Блок: Диагнозы, Лекарства и График */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-2">
        
        {/* График динамики - Теперь занимает 2/3 ширины */}
        <Card className="xl:col-span-2 bg-[var(--surface)] border-[var(--border)]">
            <CardHeader className="p-5 pb-1">
                <CardTitle className="text-lg font-semibold text-[var(--foreground)]">Динамика за 24 часа</CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[320px]">
                <VitalsChart data={patient.vitals_history} />
            </CardContent>
        </Card>

        {/* Диагнозы и Лекарства - Стилизовано под мобилку */}
        <div className="flex flex-col gap-6">
            {/* Диагнозы и Заметки */}
            <Card className="bg-[var(--surface)] border-[var(--border)]">
                <CardHeader className="p-5 pb-3">
                    <CardTitle className="text-sm opacity-70 text-[var(--foreground)]">Диагнозы и Хронические заболевания</CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                    <div className="flex flex-wrap gap-2">
                        {patient.diagnoses.map((d: string) => (
                            <span key={d} className="px-2.5 py-1 text-xs font-semibold rounded bg-[var(--primary-500)]/10 text-[var(--primary-500)]">{d}</span>
                        ))}
                    </div>
                    {patient.doctor_notes && (
                        <div className="mt-4 p-3 rounded-lg bg-[var(--surface-2)] text-sm italic opacity-80 border-l-4 border-[var(--primary-500)]">
                            "{patient.doctor_notes}"
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Принимаемые препараты (из мобилки) */}
            <Card className="bg-[var(--surface)] border-[var(--border)]">
                <CardHeader className="p-5 pb-3">
                    <CardTitle className="text-sm opacity-70 flex items-center gap-2 text-[var(--foreground)]"><Pill className="h-4 w-4 text-[var(--status-warn)]"/> Назначенные препараты</CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                    {patient.medications?.length ? (
                        <ul className="space-y-2.5 text-sm list-disc list-inside">
                            {patient.medications.map((med: string) => (
                                <li key={med} className="font-medium text-[var(--foreground)]">{med}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-neutral-500">Назначения отсутствуют</p>
                    )}
                </CardContent>
            </Card>
        </div>

      </div>

    </div>
  );
}