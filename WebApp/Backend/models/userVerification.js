const mongoose = require("mongoose");


const userVerificationSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    
    expiredAt: {
      type: Date,
      default: Date.now,
    },
    
    
  }
);
const userVerificationModel = mongoose.model("userVerification", userVerificationSchema);
module.exports = userVerificationModel;