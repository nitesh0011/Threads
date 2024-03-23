import mongoose from "mongoose";

const threadCommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
  },
  authorImage: {
    type:String, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
});

const ThreadComment = mongoose.models.ThreadComment || mongoose.model("ThreadComment", threadCommentSchema);
export default ThreadComment;
