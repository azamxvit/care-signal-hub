"use client";

import { Bell, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback, getInitials } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";

export function Header() {
  // В будущем данные врача будем получать из Supabase
  const doctorName = "Др. Смагулов";

  return (
    <div className="flex w-full items-center justify-between gap-4">
      {/* Мобильная кнопка меню (показывается только на маленьких экранах) */}
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" className="-ml-2">
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Поиск */}
      <div className="hidden max-w-md flex-1 md:flex relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--foreground)] opacity-40" />
        <Input 
          placeholder="Поиск пациента по имени или ИИН..." 
          className="pl-9 bg-[var(--surface)] border-transparent focus:border-[var(--teal-500)]"
        />
      </div>

      {/* Правая часть (Уведомления и Профиль) */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Колокольчик уведомлений */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 opacity-70" />
          {/* Индикатор новых уведомлений */}
          <span className="absolute right-2.5 top-2.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--status-danger)] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--status-danger)]"></span>
          </span>
        </Button>

        <div className="h-6 w-px bg-[var(--border)] hidden md:block" />

        {/* Профиль врача */}
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="hidden flex-col items-end md:flex">
            <span className="text-sm font-medium leading-none">{doctorName}</span>
            <span className="text-xs opacity-60 mt-1">Кардиолог</span>
          </div>
          <Avatar>
            <AvatarFallback>{getInitials(doctorName)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}