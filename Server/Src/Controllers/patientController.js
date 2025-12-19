import aiAgent from '../AI/agent.js';



export const analyzePatient = async (req, res) => {
  try {
    const result = await aiAgent.analyzePatient(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('analyzePatient error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getPatient = async (req, res) => {
  res.json({ message: `Get patient ${req.params.patientId}` });
};

export const getAllPatients = async (req, res) => {
  res.json({ message: 'Get all patients' });
};

export const getReport = async (req, res) => {
  res.json({ message: `Get report for ${req.params.patientId}` });
};
