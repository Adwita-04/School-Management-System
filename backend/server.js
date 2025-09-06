const express = require('express');
const cors = require('cors');
const db = require('./config/database');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// Get all schools
app.get('/api/schools', (req, res) => {
    const query = 'SELECT * FROM schools ORDER BY id DESC';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching schools:', err);
            return res.status(500).json({ error: 'Failed to fetch schools' });
        }
        res.json(results);
    });
});

// Add new school
app.post('/api/schools', (req, res) => {
    const { name, address, city, state, contact, image, email_id } = req.body;
    
    // Validation
    if (!name || !address || !city || !state || !contact || !email_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_id)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Contact validation (10 digits)
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
        return res.status(400).json({ error: 'Contact must be 10 digits' });
    }
    
    const query = 'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [name, address, city, state, contact, image || '', email_id], (err, results) => {
        if (err) {
            console.error('Error adding school:', err);
            return res.status(500).json({ error: 'Failed to add school' });
        }
        res.status(201).json({ message: 'School added successfully', id: results.insertId });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
