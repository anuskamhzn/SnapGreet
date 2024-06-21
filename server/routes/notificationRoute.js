import express from 'express';

import {
    getNotificationsController

} from '../controllers/notificationController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/notifications/:userID', requireSignIn, getNotificationsController);

export default router;