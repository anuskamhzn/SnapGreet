import express from 'express';
import formidable from "express-formidable";
import {requireSignIn} from '../middlewares/authMiddleware.js';

import {
    createUserController,
    getUserController,
    birthdayPhotoController,
    getTemplateController,
    requestController,
} from '../controllers/birthdayController.js';

const router = express.Router();

// Configure formidable
const formidableOptions = {
    multiples: true,  // Allow multiple files
    maxFileSize: 10 * 1024 * 1024, // Set max file size to 10MB
};

// Routes
router.post('/template', requireSignIn, formidable(formidableOptions), createUserController);
router.get('/user', getUserController);
router.get('/photo/:bid/:pid', birthdayPhotoController);
router.get('/template/:type/:id', getTemplateController);
router.get('/requests/:id', requestController);

export default router;
