import * as React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header"; // 🔥 Изменили импорт

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[var(--surface-2)] overflow-hidden">
      
      {/* 🖥️ Sidebar */}
      <aside className="hidden md:flex w-72 flex-col border-r border-[var(--border)] bg-[var(--background)]">
        <Sidebar />
      </aside>

      {/* 📱 Основная часть приложения */}
      <div className="flex flex-1 flex-col min-w-0">
        
        {/* 🔥 Используем Header вместо TopBar */}
        <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-[var(--border)] bg-[var(--background)] px-4 shrink-0 shadow-sm md:px-6">
          <Header /> 
        </header>

        {/* Область контента */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
          <div className="mx-auto w-full max-w-6xl">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}