import Notification from "../models/notificationModel.js";
import Birthday from "../models/birthdayModel.js"; // Import the birthdayModel
import mongoose from "mongoose";

// Fetch Notifications for the Authenticated User
export const getNotificationsController = async (req, res) => {
    try {
        const { userID } = req.params;

        // Validate the userID
        if (!mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(400).send({ error: 'Invalid user ID' });
        }

        const notifications = await Notification.find({ postedBy: userID });

        // Use Promise.all to fetch names for all notifications in parallel
        const updatedNotifications = await Promise.all(notifications.map(async (notification) => {
            try {
                const birthday = await Birthday.findById(notification.birthdayModelId); // Use birthdayModelId to fetch birthday
                const name = birthday ? birthday.name : 'Unknown'; // Handle case where birthday might not be found
                let message = `Your template for ${name} is ready`;

                // Check if the wish was rejected
                if (birthday && birthday.status === 'rejected') {
                    message = `Your birthday wish for ${name} was rejected.`;
                }

                return {
                    ...notification.toObject(),
                    message,
                };
            } catch (error) {
                console.error(`Error fetching birthday for notification ${notification._id}:`, error);
                return {
                    ...notification.toObject(),
                    message: 'Your template for Unknown is ready',
                };
            }
        }));

        res.status(200).json({
            success: true,
            data: updatedNotifications,
        }); // Return the updated notifications
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
