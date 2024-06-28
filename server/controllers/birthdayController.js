import mongoose from 'mongoose';
import birthdayModel from "../models/birthdayModel.js";
import userModel from '../models/userModel.js';
import fs from "fs";
import slugify from "slugify";

// Create User Controller
export const createUserController = async (req, res) => {
  try {
      const { name, nickname, description1, description2, templateType } = req.fields;
      const { photos } = req.files;

      // Validation
      if (!name) return res.status(400).send({ error: "Name is required." });
      if (!description1) return res.status(400).send({ error: "Description 1 is required." });
      if (!nickname) return res.status(400).send({ error: "Nickname is required." });
      if (!description2) return res.status(400).send({ error: "Description 2 is required." });
      if (!templateType) return res.status(400).send({ error: "Choose a template." });
      if (!photos || (Array.isArray(photos) && photos.length === 0)) {
          return res.status(400).send({ error: "At least one photo is required." });
      }

        // Check the number of photos
        const photoArray = Array.isArray(photos) ? photos : [photos];
        if (photoArray.length !== 3) {
            return res.status(400).send({ error: "Exactly 3 photos are required." });
        }

      // Ensure user information is available
      if (!req.user || !req.user._id) {
          return res.status(401).send({ error: "Unauthorized: User information is missing." });
      }

      // Create new birthday wish
      const birthdayWish = new birthdayModel({
          name,
          nickname,
          description1,
          description2,
          templateType,
          slug: slugify(name),
          status: 'pending',
          postedBy: req.user._id,
      });

      if (photos) {
          birthdayWish.photos = photoArray.map(photo => ({
              data: fs.readFileSync(photo.path),
              contentType: photo.type
          }));
      }

      await birthdayWish.save();
      res.status(201).send({
          success: true,
          message: "Birthday wish created successfully.",
          birthdayWish: {
              templateType: birthdayWish.templateType,
              _id: birthdayWish._id,
              // other birthday wish details
          },
      });
  } catch (error) {
      console.error("Error creating birthday wish:", error);
      res.status(500).send({
          success: false,
          error,
          message: "Error in creating birthday wish.",
      });
  }
};
  
// Get All Birthday Wishes by User Controller
export const getUserController = async (req, res) => {
    try {
        const birthdayWishes = await birthdayModel.find({}).sort({ createdAt: -1 });

        const birthdayWishesWithPhotoURL = birthdayWishes.map(wish => ({
            ...wish._doc,
            photoURLs: wish.photos.map(photo => `/api/v1/wish/photo/${wish._id}/${photo._id}`) // URL to fetch each photo
        }));

        res.status(200).send({
            success: true,
            message: "Birthday wishes retrieved successfully",
            birthdayWishes: birthdayWishesWithPhotoURL,
        });
    } catch (error) {
        console.error("Error fetching birthday wishes by user:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};


// Get Template by templateType and ID
export const getTemplateController = async (req, res) => {
  const { type, id } = req.params;
  try {
    const template = await birthdayModel.findOne({ templateType: type, _id: id });
    if (!template) {
      return res.status(404).send({ message: 'Template not found' });
    }

    const templateWithPhotoURLs = {
      ...template._doc,
      photoURLs: template.photos.map(photo => `/api/v1/wish/photo/${template._id}/${photo._id}`) // URL to fetch each photo
    };

    res.send(templateWithPhotoURLs);
  } catch (error) {
    console.error('Error fetching template by type and ID:', error);
    res.status(500).send({ message: 'Server error' });
  }
}

// Get Photo Controller
export const birthdayPhotoController = async (req, res) => {
    try {
        const { bid, pid } = req.params;
        const birthdayWish = await birthdayModel.findById(bid);
        const photo = birthdayWish.photos.id(pid);
        if (photo && photo.data) {
            res.set("Content-type", photo.contentType);
            return res.status(200).send(photo.data);
        } else {
            res.status(404).send({ error: "Photo not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
};

// Request made by specific user's ID and status 'pending'
export const requestController = async (req, res) => {
    try {
      const { id: postedBy } = req.params;
  
      if (!postedBy) {
        return res.status(400).json({ error: 'Missing required parameter: id' });
      }
  
      const status = 'pending'; // Hardcoded status as 'pending'
      const requests = await birthdayModel.find({ status, postedBy });
      res.json(requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
