import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
      unique: true,
    },
    name: {
      required: true,
      type: String,
    },
    lastname: {
      required: true,
      type: String,
    },
    mail: {
      required: true,
      type: String,
      unique: true,
    },
    phone: {
      required: true,
      type: String,
      unique: true,
    },
    location: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    gender: {
      required: true,
      type: String,
    },
    location: String,
    
    dislikes: [],
    like: [],
    gallery: [],
    profilePic: String,
    verificationToken: String,
    verified: {
      type: Boolean,
      default: false,
    },
    following:[{type:mongoose.Schema.Types.ObjectId, ref:'Users'}],
    followers:[{type:mongoose.Schema.Types.ObjectId, ref:'Users'}],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
