"use client";

import * as React from "react";
import { User, Bell, Shield, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Separator } from "@/components/shared/separator";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">Настройки</h1>
        <p className="text-sm opacity-60 mt-1">Управление профилем и параметрами системы</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Боковое мини-меню */}
        <div className="flex flex-col gap-1 md:col-span-1">
          <Button variant="secondary" className="justify-start gap-3 bg-[var(--surface-2)]">
            <User className="h-4 w-4" /> Профиль
          </Button>
          <Button variant="ghost" className="justify-start gap-3 opacity-70">
            <Bell className="h-4 w-4" /> Уведомления
          </Button>
          <Button variant="ghost" className="justify-start gap-3 opacity-70">
            <Shield className="h-4 w-4" /> Безопасность
          </Button>
          <Button variant="ghost" className="justify-start gap-3 opacity-70">
            <Smartphone className="h-4 w-4" /> Устройства
          </Button>
        </div>

        {/* Основная панель */}
        <div className="md:col-span-3 flex flex-col gap-6">
          
          <Card>
            <CardHeader>
              <CardTitle>Личные данные</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input id="firstName" defaultValue="Др. Смагулов" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Специализация</Label>
                  <Input id="specialty" defaultValue="Кардиолог" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="doctor@saulyk.kz" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" defaultValue="+7 (701) 123-45-67" />
                </div>
              </div>
              <Button className="mt-4">Сохранить изменения</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Параметры уведомлений</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Экстренные вызовы (SOS)</h4>
                  <p className="text-xs opacity-60">Push-уведомления и звуковой сигнал</p>
                </div>
                <Button variant="outline" size="sm" className="bg-[var(--primary-50)] text-[var(--primary-700)] border-[var(--primary-500)]/30">Включено</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Ежедневный отчет</h4>
                  <p className="text-xs opacity-60">Email со сводкой за 24 часа</p>
                </div>
                <Button variant="ghost" size="sm" className="opacity-50">Выключено</Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

    </div>
  );
}