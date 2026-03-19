"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, ShieldCheck, HeartPulse } from "lucide-react";

import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full bg-[var(--background)]">
      
      {/*  Брендинг */}
      <div className="relative hidden w-1/2 flex-col justify-between border-r border-[var(--border)] bg-[#09090b] p-10 lg:flex xl:p-16 overflow-hidden">
        
        <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#009973] opacity-10 blur-[100px] pointer-events-none"></div>

        {/* Логотип */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#009973] text-white shadow-lg">
            <Activity className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Saulyk</span>
        </div>

        {/* Центральный текст */}
        <div className="relative z-10 my-auto">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
            Национальная система <br />
            медицинского мониторинга
          </h1>
          <p className="mt-6 max-w-lg text-lg text-neutral-400">
            Обеспечиваем непрерывный контроль жизненно важных показателей пациентов по всей республике. Надежно. Безопасно. В реальном времени.
          </p>
          
          <div className="mt-10 flex items-center gap-6 text-sm font-medium text-neutral-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#009973]" />
              <span>Шифрование данных (AES-256)</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-[#009973]" />
              <span>IoT Интеграция</span>
            </div>
          </div>
        </div>

        {/* Футер левой панели */}
        <div className="relative z-10 text-sm text-neutral-500">
          © {new Date().getFullYear()} Министерство здравоохранения РК. Все права защищены.
        </div>
      </div>

      {/* Форма входа */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-[400px]">
          
          {/* Мобильный логотип */}
          <div className="mb-10 flex flex-col items-center justify-center lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#009973] text-white shadow-lg">
              <Activity className="h-7 w-7" />
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-[var(--foreground)]">Saulyk</h1>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Вход в систему</h2>
            <p className="text-sm opacity-60 mt-2">Доступ только для авторизованного медперсонала</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider opacity-70">
                Электронная почта / ИИН
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="doctor@saulyk.kz"
                className="h-12 bg-[var(--surface-2)] px-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider opacity-70">
                  Пароль
                </Label>
                <a href="#" className="text-xs font-medium text-[#009973] hover:underline">
                  Забыли пароль?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12 bg-[var(--surface-2)] px-4 text-lg tracking-widest"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="h-12 w-full text-base font-medium mt-4 bg-[#009973] hover:bg-[#007a5c] text-white shadow-lg shadow-[#009973]/20" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Activity className="h-5 w-5 animate-spin" /> Вход в систему...
                </span>
              ) : (
                "Войти в панель управления"
              )}
            </Button>
            
            <p className="mt-8 text-center text-xs opacity-40">
              При входе вы соглашаетесь с политикой обработки персональных данных (HIPAA / Закон РК).
            </p>
          </form>
        </div>
      </div>
      
    </div>
  );
}