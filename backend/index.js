import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import todoRoutes from './src/routes/todo.routes.js';
dotenv.config();

const app = express();

// Middleware to parse incoming request bodies (Crucial for POST/PUT requests)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',      
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
const PORT = process.env.PORT || 3000;

connectDB();
// CORS
app.use(cors(corsOptions));
// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/todo',todoRoutes);
// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});