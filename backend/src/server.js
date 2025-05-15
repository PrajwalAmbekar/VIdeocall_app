import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import chatRouter from './routes/chat.route.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/user',userRouter);
app.use('./api/chat', chatRouter);


app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
  connectDB();
});