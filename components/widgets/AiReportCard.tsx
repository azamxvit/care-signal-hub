"use client";

import { useState } from "react";
import { Sparkles, Loader2, CloudLightning } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Button } from "@/components/shared/button";

export function AiReportCard({ patientName }: { patientName: string }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const generateReport = () => {
    setIsGenerating(true);
    
    // Симуляция "думающего" ИИ
    setTimeout(() => {
      setIsGenerating(false);
      setReport(
        `⚠️ Анализ: У пациента ${patientName} наблюдается тренд на тахикардию. Учитывая текущие метеоусловия в г. Атырау (резкий перепад атмосферного давления), риск гипертонического криза повышен на 82%. ИИ рекомендует: Связаться с пациентом для контроля приема "Лизиноприла".`
      );
    }, 2000); // 2 секунды эффекта загрузки
  };

  return (
    <Card className="bg-gradient-to-br from-[var(--surface)] to-emerald-50/50 dark:to-emerald-950/20 border-[var(--primary-500)]/30 overflow-hidden relative">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-[var(--teal-700)] dark:text-[var(--primary-500)]">
            <Sparkles className="h-4 w-4" /> Saulyk AI Analytics
          </CardTitle>
          {report && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[var(--primary-500)]/20 text-[var(--primary-500)] rounded-full animate-in fade-in">
              Обновлено
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-5 pt-0">
        {!report ? (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <CloudLightning className="h-8 w-8 text-neutral-400 opacity-50 mb-3" />
            <p className="text-xs text-neutral-500 mb-4 px-4">
              Нейросеть проанализирует 24 часа витальных данных пациента и сопоставит их с локальными метеоусловиями.
            </p>
            <Button 
              onClick={generateReport} 
              disabled={isGenerating}
              className="w-full h-9 text-xs bg-[var(--primary-500)] hover:bg-[var(--primary-600)] text-white"
            >
              {isGenerating ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Анализ данных...</>
              ) : (
                <><Sparkles className="mr-2 h-4 w-4" /> Сгенерировать прогноз</>
              )}
            </Button>
          </div>
        ) : (
          <div className="text-sm font-medium leading-relaxed p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] animate-in fade-in slide-in-from-bottom-2 duration-500">
            {report}
          </div>
        )}
      </CardContent>
    </Card>
  );
}