import express from 'express';

import {
    getPendingWishesController,
    approveWishController,

} from '../controllers/adminController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();


// Admin routes
router.get('/pending-wishes', getPendingWishesController);
router.patch('/approve/:id', approveWishController);


export default router;