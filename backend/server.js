import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js'
// import userAccessRoutes from './routes/userAccessRoutes.js';
import './config/db.js'; // This will run the db.connect() on import

dotenv.config();
const app = express();

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json());  // Body parser for JSON data

// Routes
app.use('/admin', adminRoutes);  // Admin routes
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


