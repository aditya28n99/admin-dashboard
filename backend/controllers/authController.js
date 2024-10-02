import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';

// Signup function
export const signupAdmin = async (req, res) => {
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
        
        // Return token in response
        res.status(201).json({
          message: 'Admin created successfully',
          token: token,  // Send token to the frontend
        });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  });
};

// Login function
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Check if the admin exists in the database
  const checkQuery = 'SELECT * FROM admin WHERE email = ?';
  db.query(checkQuery, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    
    if (results.length === 0) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    const admin = results[0];

    try {
      // Compare the entered password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Return token in response
      return res.status(200).json({
        message: 'Login successful',
        token: token,  // Send token to the frontend
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  });
};
