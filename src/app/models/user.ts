import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
    maxlength: 16,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
