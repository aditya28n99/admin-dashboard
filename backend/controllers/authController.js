import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';

// Signup function
export const signupAdmin = (req, res) => {
  const { name, email, password } = req.body;

  // Check if the admin already exists
  const checkQuery = 'SELECT * FROM admin WHERE email = ?';
  db.query(checkQuery, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length > 0) return res.status(400).json({ message: 'Admin already exists' });

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new admin into the database
      const insertQuery = 'INSERT INTO admin (name, email, password) VALUES (?, ?, ?)';
      db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });

        // Generate JWT token
        const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'Admin created successfully', token });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  });
};

// Login function (add this later for the login functionality)
