require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const shareRoutes = require('./routes/shareRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors()); // Allows frontend access
app.use(express.json()); // Allows backend to read JSON bodies

// Routes
app.use('/api', shareRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));