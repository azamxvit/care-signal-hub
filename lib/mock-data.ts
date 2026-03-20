import { Patient, VitalDataPoint, Alert } from "./types";

// история в графе только 24 часа стоит, то есть сутки
const generateHistory = (): VitalDataPoint[] => {
  const history: VitalDataPoint[] = [];
  for (let i = 23; i >= 0; i--) {
    const time = new Date(Date.now() - i * 60 * 60 * 1000);
    history.push({
      time: time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      pulse: Math.floor(Math.random() * (110 - 65 + 1)) + 65,
      bp_sys: Math.floor(Math.random() * (160 - 110 + 1)) + 110,
      bp_dia: Math.floor(Math.random() * (95 - 70 + 1)) + 70,
      spo2: Math.floor(Math.random() * (100 - 92 + 1)) + 92,
    });
  }
  return history;
};

export const MOCK_PATIENTS: Patient[] = [
  { 
    id: "1", 
    full_name: "Ахметов Серик", 
    birth_date: "1960-05-12",
    village: "Махамбет", 
    district: "Махамбетский район",
    phone: "+7 701 555 12 34",
    diagnoses: ["Гипертония 2 ст.", "ИБС"], 
    risk_level: "danger", 
    device_id: "WATCH-S9-001",
    device_online: true,
    user_id: "user-1",
    latest_reading: {
      id: "r1", patient_id: "1", recorded_at: new Date().toISOString(),
      heart_rate: 115, systolic_bp: 160, diastolic_bp: 95, spo2: 96, steps: 3200, temperature: 36.8
    },
    vitals_history: generateHistory()
  },
  { 
    id: "2", full_name: "Иванова Елена", birth_date: "1966-08-21", village: "Атырау", district: "Городская зона", phone: "+7 777 123 45 67",
    diagnoses: ["Стенокардия"], risk_level: "warning", device_id: "GW6-992", device_online: true, user_id: "user-2",
    latest_reading: { id: "r2", patient_id: "2", recorded_at: new Date().toISOString(), heart_rate: 88, systolic_bp: 135, diastolic_bp: 85, spo2: 94, steps: 1500, temperature: 36.6 },
    vitals_history: generateHistory()
  },
  { 
    id: "3", full_name: "Оспанов Тимур", birth_date: "1993-02-15", village: "Индербор", district: "Индерский район", phone: "+7 702 987 65 43",
    diagnoses: ["Здоров", "Мониторинг"], risk_level: "ok", device_id: "MBAND-8", device_online: true, user_id: "user-3",
    latest_reading: { id: "r3", patient_id: "3", recorded_at: new Date().toISOString(), heart_rate: 72, systolic_bp: 120, diastolic_bp: 80, spo2: 99, steps: 8400, temperature: 36.7 },
    vitals_history: generateHistory()
  },
];

export const MOCK_ALERTS: Alert[] = [
  { 
    id: "1", 
    patient_id: "1", 
    patient_name: "Ахметов Серик", 
    type: "sos", 
    message: "Обнаружено падение / SOS", 
    created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(), 
    severity: "danger", 
    resolved: false 
  },
  { 
    id: "2", 
    patient_id: "2", 
    patient_name: "Иванова Елена", 
    type: "critical_hr", 
    message: "Критический пульс (135 уд/мин)", 
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), 
    severity: "danger", 
    resolved: false 
  },
  { 
    id: "3", 
    patient_id: "4", 
    patient_name: "Ким Александр", 
    type: "low_spo2", 
    message: "SpO2 упал до 91%", 
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), 
    severity: "warning", 
    resolved: false 
  },
  { 
    id: "4", 
    patient_id: "3", 
    patient_name: "Оспанов Тимур", 
    type: "offline", 
    message: "Потеря связи с устройством", 
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), 
    severity: "warning", 
    resolved: true 
  },
];