import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    id: {type: String,required: true},
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    bio: {
      type: String,
      default: "",
    },
    threads:  [{ type: Schema.Types.ObjectId, ref: 'Thread' }],
  }
  , {
    timestamps: true, // Auto-generate createdAt and updatedAt fields
  });
  
const User = mongoose.models.User || mongoose.model("User",userSchema);
export default User;