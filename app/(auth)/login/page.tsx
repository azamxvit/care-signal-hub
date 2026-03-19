"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Вызываем авторизацию Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Неверный email или пароль");
      setLoading(false);
    } else {
      // При успешном входе перекидываем на главную (которая сама решит, куда направить по роли)
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface-2)] p-4">
      <div className="w-full max-w-md">
        
        {/* Логотип над карточкой */}
        <div className="mb-8 flex flex-col items-center justify-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-500)] text-white shadow-lg shadow-[var(--primary-500)]/20">
            <Activity className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mt-2">
            Saulyk
          </h1>
          <p className="text-sm opacity-60">Система медицинского мониторинга</p>
        </div>

        {/* Карточка логина */}
        <Card className="border-[var(--border)] shadow-xl shadow-black/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center">Вход в систему</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@caresignal.kz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Пароль</Label>
                  <a href="#" className="text-xs text-[var(--primary-500)] hover:underline">
                    Забыли пароль?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Вывод ошибки */}
              {error && (
                <div className="text-sm text-[var(--status-danger)] bg-[var(--danger-bg)] p-3 rounded-md border border-[var(--status-danger)]/20">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full mt-2" 
                disabled={loading}
              >
                {loading ? "Вход..." : "Войти"}
              </Button>
              
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}