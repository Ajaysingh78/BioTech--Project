import express from 'express';
import {
  analyzePatient,
  getPatient,
  getAllPatients,
  getReport
} from '../Controllers/patientController.js';

const patientRouter = express.Router();

patientRouter.post('/analyze', analyzePatient);
patientRouter.get('/', getAllPatients);
patientRouter.get('/:patientId', getPatient);
patientRouter.get('/:patientId/report', getReport);

export default patientRouter;
