import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { PatientList } from "@/components/sections/PatientList";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Заголовок страницы */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">Обзор пациентов</h1>
        <p className="text-sm opacity-60 mt-1">
          Мониторинг витальных показателей в реальном времени
        </p>
      </div>

      {/* Верхние карточки статистики */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-[var(--status-danger)]/20 bg-gradient-to-br from-[var(--danger-bg)] to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-[var(--danger-text)]">Критические алерты</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[var(--status-danger)]">3</div>
            <p className="text-xs opacity-60 mt-1">Требуют немедленного внимания</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Активные пациенты</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs opacity-60 mt-1">Сейчас онлайн: 18</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>AI Аналитика</CardTitle>
          </CardHeader>
          <CardContent>
            {/* И здесь обновили цвет на primary */}
            <div className="text-3xl font-bold text-[var(--primary-500)]">5</div>
            <p className="text-xs opacity-60 mt-1">Новых рекомендаций сформировано</p>
          </CardContent>
        </Card>
      </div>

      {/* Место под основной контент (список пациентов и рекомендации) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        <div className="lg:col-span-2">
          {/* 🔥 Вот здесь теперь наш реальный компонент вместо пунктирной карточки */}
          <PatientList />
        </div>
        <div className="lg:col-span-1">
          <Card className="h-full min-h-[400px] flex items-center justify-center border-dashed">
            <p className="text-sm opacity-50">Здесь будут AI-рекомендации</p>
          </Card>
        </div>
      </div>
      
    </div>
  );
}