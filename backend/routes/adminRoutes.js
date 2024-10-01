import express from 'express';
import { getAdmin, updateAdmin } from '../controllers/adminController.js';
const router = express.Router();

router.get('/', getAdmin);

router.put('/', updateAdmin);

export default router;
