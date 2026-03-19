export type UserRole = "doctor" | "nurse" | "patient";

export type VitalStatus = "ok" | "warning" | "danger" | "offline";

export interface VitalReading {
  id: string;
  patient_id: string;
  recorded_at: string;
  heart_rate: number | null;
  systolic_bp: number | null;
  diastolic_bp: number | null;
  spo2: number | null;
  steps: number | null;
  temperature: number | null;
}

export interface Patient {
  id: string;
  full_name: string;
  birth_date: string;
  village: string;
  district: string;
  phone: string | null;
  diagnoses: string[];
  risk_level: VitalStatus;
  device_id: string | null;
  device_online: boolean;
  user_id: string | null;
  latest_reading: VitalReading | null;
}

export interface Alert {
  id: string;
  patient_id: string;
  patient_name: string;
  type: "critical_hr" | "high_bp" | "low_spo2" | "sos" | "offline" | "ai_risk";
  severity: "danger" | "warning" | "info";
  message: string;
  created_at: string;
  resolved: boolean;
}

export interface AIRecommendation {
  id: string;
  priority: "immediate" | "recommended" | "preventive";
  text: string;
}

export interface DoctorProfile {
  id: string;
  full_name: string;
  role: "doctor" | "nurse";
  facility: string;
  region: string;
}

export interface PatientSummary {
  total: number;
  critical: number;
  warning: number;
  stable: number;
  offline: number;
}