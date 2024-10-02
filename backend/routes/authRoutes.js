import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';

const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body; // Use email and plain text password
  const query = 'SELECT * FROM admin WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    // Check if user exists
    if (results.length === 0) {
      console.log('No user found with email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const admin = results[0];

    // Compare plain passwords
    if (admin.password !== password) {
      console.log('Incorrect password for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.json({ token });
  });
});

export default router;
