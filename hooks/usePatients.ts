import { useState, useEffect } from "react";
import { MOCK_PATIENTS } from "@/lib/mock-data";

export function usePatients() {
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [isLoading, setIsLoading] = useState(false);

  // подключить Supabase:
  // useEffect(() => {
  //   const fetchPatients = async () => {
  //     setIsLoading(true);
  //     const { data } = await supabase.from('patients').select('*');
  //     setPatients(data);
  //     setIsLoading(false);
  //   };
  //   fetchPatients();
  // }, []);

  return { patients, isLoading };
}