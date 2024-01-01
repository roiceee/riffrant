import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    creatorId: {
      type: String,
      required: true,
    },

    creatorName: {
      type: String,
      required: true,
    },

    postId: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      maxLength: 500,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

export const CommentModel =
  mongoose.models.comment || mongoose.model("comment", commentSchema);
