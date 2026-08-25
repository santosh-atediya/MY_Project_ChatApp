import express from 'express';
import "dotenv/config";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import path from 'path';

const app = express(); // Initialize an express app
const PORT = process.env.PORT || 2000; // Define the port
const __dirname = path.resolve(); // Get the current directory path
const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';

await connectDB(); // Establish a Connection to the database

// Middleware Setup
const allowedOrigins = [
  "https://my-project-chat-app-8iaq.vercel.app",
  "https://my-project-realtimechat.vercel.app",
  "https://my-project-chatapp.vercel.app",
  "http://localhost:5173",
  ...(process.env.FRONTEND_URL || "").split(",").map((origin) => origin.trim()).filter(Boolean)
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Cookie parser middleware to parse http cookies


// Define API routes
app.use('/api/auth', authRouter); // Use auth routes
app.use('/api/users', userRouter); // Use user routes
app.use('/api/chats', chatRouter); // Use chat routes

// For production: Serve static files from the React frontend app
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.use((req, res)=>{
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  })
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
