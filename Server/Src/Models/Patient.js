import mongoose from 'mongoose'



const patientSchema = new mongoose.Schema({
  patientId: { type: String, required: true, unique: true },
  abha: {
    abhaId: String,
    abhaLinked: Boolean,
    consentStatus: String,
    consentPurpose: String,
    consentExpiry: Date
  },
  demographics: {
    name: String,
    age: Number,
    gender: String
  },
  hospitalContext: {
    hospitalId: String,
    ward: String,
    bedNo: String,
    admissionDate: Date
  },
  vitals: {
    temperatureC: Number,
    heartRate: Number,
    bloodPressure: String,
    oxygenSaturation: Number
  },
  labReport: {
    source: String,
    organism: String,
    antibioticResistance: [String],
    isMDR: Boolean
  },
  abhaHistory: {
    previousAdmissions: Number,
    pastInfections: [String],
    recentAntibiotics: [String],
    chronicConditions: [String]
  },
  contactLogs: [{
    contactWith: String,
    durationMinutes: Number,
    location: String
  }],
  aiAssessment: {
    riskScore: Number,
    riskLevel: String,
    predictedOutbreakWindow: String,
    predictionConfidence: String
  },
  analysisReport: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  infectionStatus: {
    type: String,
    enum: ['INFECTED', 'NOT_INFECTED', 'HIGH_RISK', 'MONITORING_REQUIRED'],
    default: null
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});



const Patient = mongoose.model('patient', patientSchema);