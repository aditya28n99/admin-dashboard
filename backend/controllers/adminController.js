import { db } from '../config/db.js';

export const getAdmin = (req, res) => {
  const query = 'SELECT * FROM admin WHERE id = ?';
  const adminId = 1; // Assuming one admin for now
  db.query(query, [adminId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    return res.json(results[0]);
  });
};

export const updateAdmin = (req, res) => {
  const { username, email, password } = req.body;
  const query = 'UPDATE admin SET username = ?, email = ?, password = ? WHERE id = ?';
  const adminId = 1;

  db.query(query, [username, email, password, adminId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    return res.json({ message: 'Profile updated successfully' });
  });
};
