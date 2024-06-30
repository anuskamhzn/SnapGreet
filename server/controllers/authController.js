import userModel from "../models/userModel.js";
import birthdayModel from "../models/birthdayModel.js";
import {comparePassword, hashPassword} from "./../utils/authHelper.js"
import JWT from 'jsonwebtoken';
import fs from "fs";
import mongoose from "mongoose";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, confirmPass, phone } = req.body;
    const role = req.body.role; // Extract role from the request body

    // Validations
    if (!name || !email || !password || !confirmPass || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if password and confirmPass are the same
    if (password !== confirmPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists, please login instead" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Register the user
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      confirmPass: hashedPassword,
      role, // include the role as it's automatically filled by middleware
    }).save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in registration", error });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try{
        const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
    }catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in login",
          error,
        });
      }
}; 

//forgot password controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, phone, newpassword } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone Number is required" });
    }
    if (!newpassword) {
      return res.status(400).send({ message: "New Password is required" });
    }
    //check user and answer
    const user = await userModel.findOne({ email, phone });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newpassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    return res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


//test controller
export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };

//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.fields;
    const user = await userModel.findById(req.user._id);

    // Check if a photo was uploaded
    const photo = req.files ? req.files.photo : undefined;

    // password
    let hashedPassword = user.password;
    if (password && password.length >= 6) {
      hashedPassword = await hashPassword(password);
    } else if (password) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Update user information
    const updatedFields = {
      name: name || user.name,
      password: hashedPassword,
      confirmPass: confirmPass || user.confirmPass,
      phone: phone || user.phone,
    };

    // If a photo is uploaded, update user's photo
    if (photo) {
      updatedFields.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      updatedFields,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while updating profile",
      error: error.message,
    });
  }
};

// get all users
export const userController = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "All User List",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// get user photo
export const userPhotoController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId).select("photo");

    // Check if user or photo doesn't exist
    if (!user || !user.photo) {
      return res.status(404).send({ success: false, message: "User photo not found" });
    }

    // If photo exists, send it in the response
    res.set("Content-type", user.photo.contentType);
    return res.status(200).send(user.photo.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting user photo",
      error,
    });
  }
};

// Get user by ID
export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    // Find user by ID
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    res.status(200).json({ success: true, message: "User found", user });
  } catch (error) {
    console.error('Error fetching user:', error); // Log the error
    res.status(500).json({ success: false, message: "Error in fetching user", error });
  }
};

//delete controller
export const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.userId);
    res.status(200).send({
      success: true,
      message: "User Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting user",
      error,
    });
  }
};

// Get all templates used by a user
export const getTemplateController = async (req, res) => {
  try {
    const { userID } = req.params;

    // Validate the userID
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      console.error(`Invalid user ID: ${userID}`);
      return res.status(400).send({ error: 'Invalid user ID' });
    }

    // Fetch the templateType and other relevant fields of documents posted by the specific user
    const templates = await birthdayModel
      .find({ postedBy: userID, status: 'approved' })
      .select('templateType name _id'); // Use _id to match MongoDB's default ID field

    // Even if no templates are found, return an empty array with a 200 status
    res.status(200).send(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).send({ error: 'Server error' });
  }
};

