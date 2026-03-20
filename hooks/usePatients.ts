"use client";

import { useState, useMemo } from "react";
import { MOCK_PATIENTS } from "@/lib/mock-data";
import { VitalStatus } from "@/lib/types";

export function usePatients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<VitalStatus | 'all'>('all');

  const filteredPatients = useMemo(() => {
    return MOCK_PATIENTS.filter(patient => {
      // фильтр по рискам
      const matchesFilter = activeFilter === 'all' || patient.risk_level === activeFilter;
      
      // поиск по фио и фильтрам
      const query = searchTerm.toLowerCase();
      const matchesSearch = patient.full_name.toLowerCase().includes(query) || 
                          patient.diagnoses.join(" ").toLowerCase().includes(query) || 
                          patient.id.includes(query);
      
      return matchesFilter && matchesSearch;
    });
  }, [searchTerm, activeFilter]);

  return { 
    patients: MOCK_PATIENTS,
    filteredPatients,      
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    findPatientById: (id: string) => MOCK_PATIENTS.find(p => p.id === id),
  };
}

