import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import main from './Config/db.js';
// import redisClient from './Config/Redis.js';
import userRouter from './Routes/UserRoutes.js';
import patientRouter from './Routes/PatientRoutes.js';
const app = express();
dotenv.config();


app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/patient', patientRouter)



const InitializeConnection = async () => {
  try {
    await Promise.all([main()]);
    console.log('DB connected successfully.');

    app.listen(process.env.PORT, () => {
      console.log('Listening at PORT', process.env.PORT);
    });
  } catch (error) {
    console.log(error.message);
  }
};

InitializeConnection();
