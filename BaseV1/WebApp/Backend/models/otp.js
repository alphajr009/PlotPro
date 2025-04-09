const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiredAt: {
    type: Date,
    expires: 0,
    default: () => new Date(Date.now() + 10 * 60 * 1000),
  },
});

otpSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });

const otpModel = mongoose.model("otps", otpSchema);

module.exports = otpModel;