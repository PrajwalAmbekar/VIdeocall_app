import express from 'express';
import dotenv from 'dotenv';
import router from './routes/auth.route.js';
import connectDB from './lib/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/auth', router);


app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
  connectDB();
});