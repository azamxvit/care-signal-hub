import { useState } from "react";
import { MOCK_ALERTS } from "@/lib/mock-data";

export function useAlerts() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [isLoading, setIsLoading] = useState(false);

  const resolveAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => alert.id === id ? { ...alert, status: "resolved" } : alert)
    );
  };

  return { alerts, isLoading, resolveAlert };
}