import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String,
    required: true
  }
});

const birthdaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photos: [photoSchema],
  nickname: {
    type: String,
    required: true
  },
  description1: {
    type: String,
    required: true
  },
  description2: {
    type: String,
    required: true
  },
  templateType: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId, // New field
    ref: "users", // Reference to User or Shelter collection
    required: true,
  },
});

export default mongoose.model("Birthday", birthdaySchema);
