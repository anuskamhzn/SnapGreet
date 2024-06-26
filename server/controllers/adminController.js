import birthdayModel from "../models/birthdayModel.js";
import Notification from "../models/notificationModel.js";

// Get All Pending Birthday Wishes
export const getPendingWishesController = async (req, res) => {
    try {
        const pendingWishes = await birthdayModel.find({ status: 'pending' })
        .sort({ createdAt: -1 })
        .populate({
            path: 'postedBy',
            select: 'name phone photo'
        });
        res.status(200).send({
            success: true,
            message: "Pending birthday wishes retrieved successfully",
            pendingWishes,
        });
    } catch (error) {
        console.error("Error fetching pending birthday wishes:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};


// Approve Birthday Wish
export const approveWishController = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and update the birthday wish status
        const updatedWish = await birthdayModel.findByIdAndUpdate(
            id,
            { status: 'approved' },
            { new: true }
        );

        // Check if the wish exists
        if (!updatedWish) {
            return res.status(404).send({
                success: false,
                message: "Birthday wish not found",
            });
        }

        // Ensure 'postedBy' exists in updatedWish
        if (!updatedWish.postedBy) {
            return res.status(400).send({
                success: false,
                message: "PostedBy field is missing in the birthday wish",
            });
        }

        // Create a notification for the user
        const notificationMessage = "Your birthday wish has been approved.";
        const notification = new Notification({
            postedBy: updatedWish.postedBy,
            message: notificationMessage,
            templateType: updatedWish.templateType, // Assuming templateType is stored in birthdayModel
            birthdayModelId: updatedWish._id, // Store the _id of birthdayModel in the notification
        });
        await notification.save();

        // Send success response
        res.status(200).send({
            success: true,
            message: "Birthday wish approved successfully",
            data: {
                notification: notification,
            },
        });
    } catch (error) {
        console.error("Error approving birthday wish:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

