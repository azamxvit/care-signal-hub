"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine, Line, LineChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { VitalDataPoint } from "@/lib/types";
import { Activity } from "lucide-react"; // иконку для заглушки

interface VitalsChartProps {
  data: VitalDataPoint[] | undefined;
}

export function VitalsChart({ data }: VitalsChartProps) {
  // Если данных нет, показываем красивую ЗАГЛУШКУУУУ
  if (!data || data.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center bg-[var(--surface)] text-center h-[260px] p-8 text-neutral-500 border-dashed border-[var(--border)]">
        <Activity className="h-8 w-8 opacity-20 mb-3" />
        <h3 className="font-semibold opacity-70">Динамика недоступна</h3>
        <p className="text-sm opacity-50 mt-1">Недостаточно исторических данных с устройства пациента.</p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      
      {/* График Пульса */}
      <Card className="flex-1 bg-[var(--surface)] border-[var(--border)] overflow-hidden">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold opacity-80 text-[var(--status-danger)] flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--status-danger)] animate-pulse"></span>
            Динамика ЧСС (Пульс)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                {/* Градиент для заливки пульса */}
                <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--status-danger)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--status-danger)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} interval={4} fontSize={10} tick={{ fill: 'var(--foreground)', opacity: 0.6 }} />
              <YAxis axisLine={false} tickLine={false} fontSize={10} domain={[40, 140]} tick={{ fill: 'var(--foreground)', opacity: 0.6 }} />
              <ReferenceLine y={100} stroke="var(--status-danger)" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Тахикардия', fill: 'var(--status-danger)', fontSize: 10, fontWeight: 'bold' }} />
              
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '12px', color: 'var(--foreground)' }}
                itemStyle={{ color: 'var(--status-danger)', fontWeight: 'bold' }}
                labelStyle={{ color: 'var(--foreground)', opacity: 0.6, marginBottom: '4px' }}
              />
              
              <Area 
                type="monotone" 
                dataKey="pulse" 
                name="Пульс"
                stroke="var(--status-danger)" 
                fillOpacity={1} 
                fill="url(#colorPulse)" 
                strokeWidth={2}
                activeDot={{ r: 5, stroke: 'var(--background)', strokeWidth: 2, fill: 'var(--status-danger)' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* График Давления */}
      <Card className="flex-1 bg-[var(--surface)] border-[var(--border)] overflow-hidden">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold opacity-80 text-[var(--primary-500)] flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--primary-500)]"></span>
            Артериальное давление
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} interval={4} fontSize={10} tick={{ fill: 'var(--foreground)', opacity: 0.6 }} />
              <YAxis axisLine={false} tickLine={false} fontSize={10} domain={[50, 200]} tick={{ fill: 'var(--foreground)', opacity: 0.6 }} />
              <ReferenceLine y={140} stroke="var(--status-danger)" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Криз (140+)', fill: 'var(--status-danger)', fontSize: 10 }} opacity={0.5} />
              
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '12px' }}
                labelStyle={{ color: 'var(--foreground)', opacity: 0.6, marginBottom: '4px' }}
              />
              
              <Line type="monotone" dataKey="bp_sys" name="Сист. давление" stroke="var(--primary-500)" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="bp_dia" name="Диаст. давление" stroke="#38bdf8" strokeWidth={2} dot={false} strokeDasharray="3 3" activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
}