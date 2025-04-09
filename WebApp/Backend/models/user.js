const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: false,
    },
    lname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

