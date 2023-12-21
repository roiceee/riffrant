import { timeStamp } from "console";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    creatorId: {
      type: String,
      required: true,
    },

    creatorName: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      maxLength: 40,
      trim: true,
    },

    body: {
      type: String,
      maxLength: 500,
      trim: true,
      default: "",
    },

    upvotes: {
      type: Array<String>,
      default: [],
    },

    downvotes: {
      type: Array<String>,
      default: [],
    },

    score: {
      type: Number,
      default: 0,
    },
    
  },
  { timestamps: true }
);

export const PostModel =
  mongoose.models.post || mongoose.model("post", postSchema);
