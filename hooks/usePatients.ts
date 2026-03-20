"use client";

import { useState, useMemo, useEffect } from "react";
import { MOCK_PATIENTS } from "@/lib/mock-data";
import { Patient, VitalStatus } from "@/lib/types";

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<VitalStatus | 'all'>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setPatients((prevPatients) => 
        prevPatients.map((patient) => {
          if (!patient.device_online || !patient.latest_reading) return patient;

          const pulseFluctuation = Math.floor(Math.random() * 5) - 2;
          const newHeartRate = Math.max(40, Math.min(200, patient.latest_reading.heart_rate! + pulseFluctuation));

          const bpFluctuation = Math.floor(Math.random() * 7) - 3;
          const newSysBp = Math.max(90, Math.min(220, patient.latest_reading.systolic_bp! + bpFluctuation));

          return {
            ...patient,
            latest_reading: {
              ...patient.latest_reading,
              heart_rate: newHeartRate,
              systolic_bp: newSysBp,
            }
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch = 
        patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.diagnoses.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesFilter = activeFilter === 'all' || patient.risk_level === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [patients, searchTerm, activeFilter]);

  const findPatientById = (id: string) => patients.find(p => p.id === id);

  return { 
    patients, 
    filteredPatients, 
    searchTerm, 
    setSearchTerm, 
    activeFilter, 
    setActiveFilter, 
    findPatientById 
  };
}