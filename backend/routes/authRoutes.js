import express from 'express';
import { signupAdmin } from '../controllers/authController.js';

const router = express.Router();

// Route for signup
router.post('/signup', signupAdmin);

export default router;
