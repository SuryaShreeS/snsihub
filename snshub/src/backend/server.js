// src/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./api/auth');
const cors = require('cors');

dotenv.config(); // Load environment variables
connectDB(); // Connect to the database

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
