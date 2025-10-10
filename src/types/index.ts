export type UserRole = 'admin' | 'infection_control' | 'doctor' | 'nurse' | 'lab_tech';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  hospitalId: string;
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  admissionId: string;
  room: string;
  currentWard: string;
  riskScore: number;
  status: 'stable' | 'monitoring' | 'critical';
}

export interface ContactEvent {
  id: string;
  sourceId: string;
  sourceName: string;
  sourceType: 'patient' | 'staff' | 'device';
  targetPatientId: string;
  startTime: string;
  endTime: string;
  durationSeconds: number;
  proximityScore: number;
  location: string;
}

export interface LabResult {
  id: string;
  patientId: string;
  specimenType: string;
  organism: string;
  resistanceFlags: string[];
  timestamp: string;
  status: 'pending' | 'completed' | 'flagged';
}

export interface Alert {
  id: string;
  type: 'mdr_detected' | 'high_risk_contact' | 'outbreak_suspected' | 'isolation_required';
  patientIds: string[];
  patientNames: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  status: 'new' | 'acknowledged' | 'resolved';
  assignedTo?: string;
  description: string;
  ward: string;
}

export interface RiskFactor {
  factor: string;
  weight: number;
}

export interface RiskScore {
  patientId: string;
  score: number;
  factors: RiskFactor[];
}

export interface Device {
  id: string;
  name: string;
  type: 'tag' | 'sensor' | 'monitor';
  battery: number;
  lastSeen: string;
  location: string;
  status: 'active' | 'idle' | 'offline';
}

export interface Ward {
  id: string;
  name: string;
  floor: number;
  capacity: number;
  currentOccupancy: number;
  riskLevel: 'low' | 'medium' | 'high';
  activeAlerts: number;
}
