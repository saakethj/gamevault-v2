const express = require('express');
const cors = require('cors');
const sql = require('mssql');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database configuration
const dbConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
        trustedConnection: true  // Add this for Windows Authentication
    }
};

// ROOT ROUTE - This fixes the "Cannot GET /" error
app.get('/', (req, res) => {
    res.json({ 
        message: 'GameVault API Server is running!',
        endpoints: [
            'GET /api/test - Test endpoint',
            'GET /api/games - Get all games',
            'GET /api/dashboard - Dashboard data'
        ]
    });
});

// Test route
app.get('/api/test', async (req, res) => {
    try {
        // Test database connection
        await sql.connect(dbConfig);
        res.json({ 
            message: 'GameVault API is running!',
            database: 'Connected successfully'
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'API running but database connection failed',
            error: error.message 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 GameVault API Server running on http://localhost:${PORT}`);
    console.log(`📊 Database: ${process.env.DB_SERVER}\\${process.env.DB_DATABASE}`);
});