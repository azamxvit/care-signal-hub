"use client";

import { useState } from "react";
import { MOCK_ALERTS } from "@/lib/mock-data";

export function useAlerts() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS);

  // меняю resolved на true
  const resolveAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => alert.id === id ? { ...alert, resolved: true } : alert)
    );
  };

  return { alerts, resolveAlert };
}