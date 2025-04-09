const mongoose = require("mongoose");


const userEmailVerificationSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    VerifyId: {
      type: String,
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
const userEmailVerificationModel = mongoose.model("userEmailVerification", userEmailVerificationSchema);
module.exports = userEmailVerificationModel;