import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  message: {
    type: String,
  },
  templateType: {
    type: String, // Reference the templateType from birthdayModel
    required: true,
  },
  birthdayModelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Birthday", // Reference to the Birthday model
    required: true,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
