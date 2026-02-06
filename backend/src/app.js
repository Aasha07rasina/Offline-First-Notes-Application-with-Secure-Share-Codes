require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const shareRoutes = require('./routes/shareRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors()); // Allows frontend access
app.use(express.json({ limit: '1mb'})); // Allows backend to read JSON bodies

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, 
  message: { error: "Too many share attempts, try again later" }
});

// Routes
app.use('/api', limiter, shareRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));