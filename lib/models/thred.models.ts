import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  images: {
    type:String, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Array to store user IDs who liked the thread
     
    },
  ],
  likeCount: {
    type: Number, // Count of likes for efficiency
    default: 0,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ThreadComment",
    },
  ],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);
export default Thread;
