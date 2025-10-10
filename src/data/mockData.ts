import { Patient, ContactEvent, Alert, LabResult, Device, Ward } from '@/types';

export const mockPatients: Patient[] = [
  {
    id: 'P-10234',
    name: 'John Anderson',
    dob: '1965-03-15',
    admissionId: 'ADM-2024-10-01-001',
    room: '301A',
    currentWard: 'ICU-North',
    riskScore: 87,
    status: 'critical'
  },
  {
    id: 'P-10235',
    name: 'Sarah Mitchell',
    dob: '1978-07-22',
    admissionId: 'ADM-2024-10-03-042',
    room: '215B',
    currentWard: 'General-East',
    riskScore: 45,
    status: 'monitoring'
  },
  {
    id: 'P-10236',
    name: 'Robert Chen',
    dob: '1952-11-08',
    admissionId: 'ADM-2024-10-05-078',
    room: '302B',
    currentWard: 'ICU-North',
    riskScore: 72,
    status: 'critical'
  },
  {
    id: 'P-10237',
    name: 'Maria Garcia',
    dob: '1990-02-14',
    admissionId: 'ADM-2024-10-06-091',
    room: '118A',
    currentWard: 'General-West',
    riskScore: 23,
    status: 'stable'
  },
  {
    id: 'P-10238',
    name: 'James Wilson',
    dob: '1968-09-30',
    admissionId: 'ADM-2024-10-07-103',
    room: '303A',
    currentWard: 'ICU-South',
    riskScore: 91,
    status: 'critical'
  }
];

export const mockContacts: ContactEvent[] = [
  {
    id: 'C-001',
    sourceId: 'S-042',
    sourceName: 'Dr. Emily Roberts',
    sourceType: 'staff',
    targetPatientId: 'P-10234',
    startTime: '2025-10-09T08:15:00Z',
    endTime: '2025-10-09T08:45:00Z',
    durationSeconds: 1800,
    proximityScore: 95,
    location: 'Room 301A'
  },
  {
    id: 'C-002',
    sourceId: 'S-089',
    sourceName: 'Nurse Jennifer Smith',
    sourceType: 'staff',
    targetPatientId: 'P-10234',
    startTime: '2025-10-09T10:00:00Z',
    endTime: '2025-10-09T10:25:00Z',
    durationSeconds: 1500,
    proximityScore: 88,
    location: 'Room 301A'
  },
  {
    id: 'C-003',
    sourceId: 'P-10236',
    sourceName: 'Robert Chen',
    sourceType: 'patient',
    targetPatientId: 'P-10234',
    startTime: '2025-10-08T14:30:00Z',
    endTime: '2025-10-08T15:00:00Z',
    durationSeconds: 1800,
    proximityScore: 45,
    location: 'Corridor 3F'
  },
  {
    id: 'C-004',
    sourceId: 'D-007',
    sourceName: 'IV Pump #7',
    sourceType: 'device',
    targetPatientId: 'P-10234',
    startTime: '2025-10-09T06:00:00Z',
    endTime: '2025-10-09T18:00:00Z',
    durationSeconds: 43200,
    proximityScore: 100,
    location: 'Room 301A'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'A-001',
    type: 'mdr_detected',
    patientIds: ['P-10234'],
    patientNames: ['John Anderson'],
    severity: 'critical',
    createdAt: '2025-10-09T14:23:00Z',
    status: 'new',
    description: 'MRSA detected in blood culture. Immediate isolation required.',
    ward: 'ICU-North'
  },
  {
    id: 'A-002',
    type: 'high_risk_contact',
    patientIds: ['P-10236', 'P-10234'],
    patientNames: ['Robert Chen', 'John Anderson'],
    severity: 'high',
    createdAt: '2025-10-09T15:10:00Z',
    status: 'acknowledged',
    assignedTo: 'Dr. Emily Roberts',
    description: 'High-risk contact detected between MRSA-positive patient and adjacent room.',
    ward: 'ICU-North'
  },
  {
    id: 'A-003',
    type: 'outbreak_suspected',
    patientIds: ['P-10234', 'P-10236', 'P-10238'],
    patientNames: ['John Anderson', 'Robert Chen', 'James Wilson'],
    severity: 'critical',
    createdAt: '2025-10-09T16:45:00Z',
    status: 'new',
    description: 'Potential MRSA outbreak: 3 cases in ICU within 48 hours.',
    ward: 'ICU-North'
  },
  {
    id: 'A-004',
    type: 'isolation_required',
    patientIds: ['P-10238'],
    patientNames: ['James Wilson'],
    severity: 'high',
    createdAt: '2025-10-09T17:20:00Z',
    status: 'new',
    description: 'VRE detected in urine culture. Contact precautions initiated.',
    ward: 'ICU-South'
  }
];

export const mockLabResults: LabResult[] = [
  {
    id: 'L-001',
    patientId: 'P-10234',
    specimenType: 'Blood Culture',
    organism: 'Staphylococcus aureus',
    resistanceFlags: ['MRSA', 'Vancomycin-resistant'],
    timestamp: '2025-10-09T12:30:00Z',
    status: 'flagged'
  },
  {
    id: 'L-002',
    patientId: 'P-10236',
    specimenType: 'Sputum Culture',
    organism: 'Pseudomonas aeruginosa',
    resistanceFlags: ['Carbapenem-resistant'],
    timestamp: '2025-10-09T11:15:00Z',
    status: 'flagged'
  },
  {
    id: 'L-003',
    patientId: 'P-10238',
    specimenType: 'Urine Culture',
    organism: 'Enterococcus faecium',
    resistanceFlags: ['VRE'],
    timestamp: '2025-10-09T16:00:00Z',
    status: 'flagged'
  }
];

export const mockDevices: Device[] = [
  {
    id: 'D-001',
    name: 'RFID Tag - Staff #042',
    type: 'tag',
    battery: 87,
    lastSeen: '2025-10-09T18:30:00Z',
    location: 'ICU-North, Room 302',
    status: 'active'
  },
  {
    id: 'D-007',
    name: 'IV Pump #7',
    type: 'monitor',
    battery: 100,
    lastSeen: '2025-10-09T18:25:00Z',
    location: 'ICU-North, Room 301A',
    status: 'active'
  },
  {
    id: 'D-012',
    name: 'Environmental Sensor - ICU-N',
    type: 'sensor',
    battery: 65,
    lastSeen: '2025-10-09T18:28:00Z',
    location: 'ICU-North, Central',
    status: 'active'
  }
];

export const mockWards: Ward[] = [
  {
    id: 'W-001',
    name: 'ICU-North',
    floor: 3,
    capacity: 12,
    currentOccupancy: 10,
    riskLevel: 'high',
    activeAlerts: 3
  },
  {
    id: 'W-002',
    name: 'ICU-South',
    floor: 3,
    capacity: 12,
    currentOccupancy: 8,
    riskLevel: 'high',
    activeAlerts: 1
  },
  {
    id: 'W-003',
    name: 'General-East',
    floor: 2,
    capacity: 24,
    currentOccupancy: 18,
    riskLevel: 'medium',
    activeAlerts: 0
  },
  {
    id: 'W-004',
    name: 'General-West',
    floor: 1,
    capacity: 24,
    currentOccupancy: 15,
    riskLevel: 'low',
    activeAlerts: 0
  }
];

export const dailyExposureData = [
  { date: '09/25', exposures: 12 },
  { date: '09/26', exposures: 15 },
  { date: '09/27', exposures: 10 },
  { date: '09/28', exposures: 18 },
  { date: '09/29', exposures: 22 },
  { date: '09/30', exposures: 19 },
  { date: '10/01', exposures: 25 },
  { date: '10/02', exposures: 28 },
  { date: '10/03', exposures: 23 },
  { date: '10/04', exposures: 31 },
  { date: '10/05', exposures: 35 },
  { date: '10/06', exposures: 29 },
  { date: '10/07', exposures: 38 },
  { date: '10/08', exposures: 42 },
  { date: '10/09', exposures: 45 }
];
