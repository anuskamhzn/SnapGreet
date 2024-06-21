import express from "express";
import mongoose from 'mongoose';
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    userController,
    getUserByIdController,
    userPhotoController,
    deleteUserController,
    getTemplateController,
  } from "../controllers/authController.js";
  import { isAdmin,requireSignIn } from "../middlewares/authMiddleware.js";
  import formidable from "express-formidable";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post('/login',loginController);

//forgot password
router.post('/forgot-password', forgotPasswordController);

//test routes
router.get('/test',requireSignIn,testController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req,res) => {
  res.status(200).send({ok:true});
});
//protected admin route auth
router.get("/admin-auth", requireSignIn,isAdmin, (req,res) => {
  res.status(200).send({ok:true});
});

router.put('/profile', formidable(),requireSignIn, updateProfileController);

//getALl users
router.get("/get-users", userController);

//get user info
router.get("/user-info/:userId",getUserByIdController);

//get photo
router.get("/user-photo/:userId", userPhotoController);

//delete product
router.delete("/delete-user/:userId", deleteUserController);

//get templates used by user
router.get("/usertemp/:userID", getTemplateController);

export default router;