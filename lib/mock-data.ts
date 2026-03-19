import { VitalStatus } from "@/lib/types";

export const MOCK_PATIENTS = [
  { id: "1", name: "Ахметов Серик", diagnosis: "Гипертония 2 ст.", status: "danger" as VitalStatus, vitals: { hr: 115, bp: "160/95", spo2: 96 } },
  { id: "2", name: "Иванова Елена", diagnosis: "ИБС, Стенокардия", status: "warning" as VitalStatus, vitals: { hr: 88, bp: "135/85", spo2: 94 } },
  { id: "3", name: "Оспанов Тимур", diagnosis: "Здоров, мониторинг", status: "ok" as VitalStatus, vitals: { hr: 72, bp: "120/80", spo2: 99 } },
  { id: "4", name: "Ким Александр", diagnosis: "Тахикардия", status: "warning" as VitalStatus, vitals: { hr: 95, bp: "125/80", spo2: 98 } },
  { id: "5", name: "Сатпаева Амина", diagnosis: "Диабет 2 типа", status: "ok" as VitalStatus, vitals: { hr: 78, bp: "115/75", spo2: 98 } },
  { id: "6", name: "Муратов Данияр", diagnosis: "Астма", status: "offline" as VitalStatus, vitals: { hr: "--", bp: "--", spo2: "--" } },
];

export const MOCK_ALERTS = [
  { id: "1", patient: "Ахметов Серик", type: "sos", message: "Обнаружено падение / SOS", time: "2 мин назад", severity: "danger", status: "active" },
  { id: "2", patient: "Иванова Елена", type: "vitals", message: "Критический пульс (135 уд/мин)", time: "15 мин назад", severity: "danger", status: "active" },
  { id: "3", patient: "Ким Александр", type: "vitals", message: "SpO2 упал до 91%", time: "1 час назад", severity: "warning", status: "active" },
  { id: "4", patient: "Оспанов Тимур", type: "device", message: "Низкий заряд устройства (5%)", time: "3 часа назад", severity: "warning", status: "resolved" },
];