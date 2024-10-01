import jwt from 'jsonwebtoken';

// JWT verification middleware
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;  // Attach admin ID to request object
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
