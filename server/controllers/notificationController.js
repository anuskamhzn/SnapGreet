import Notification from "../models/notificationModel.js";
import Birthday from "../models/birthdayModel.js";
import mongoose from "mongoose";

// Fetch Notifications for the Authenticated User
export const getNotificationsController = async (req, res) => {
    try {
        const { userID } = req.params;

        // Validate the userID
        if (!mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(400).send({ error: 'Invalid user ID' });
        }

        // Fetch notifications and birthday IDs in a single query
        const notifications = await Notification.find({ postedBy: userID }).lean();
        const birthdayIds = notifications.map(notification => notification.birthdayModelId);

        // Fetch all birthdays in a single query
        const birthdays = await Birthday.find({ _id: { $in: birthdayIds } }).lean();
        const birthdayMap = birthdays.reduce((map, birthday) => {
            map[birthday._id] = birthday.name;
            return map;
        }, {});

        // Update notifications with birthday names
        const updatedNotifications = notifications.map(notification => ({
            ...notification,
            message: `Your template for ${birthdayMap[notification.birthdayModelId] || 'Unknown'} is ready`
        }));

        res.status(200).json({
            success: true,
            data: updatedNotifications,
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
