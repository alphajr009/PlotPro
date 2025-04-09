const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const userVerificationSchema = require("../models/userVerification");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pasindurandika35@gmail.com",
    pass: "szxt shqt oehw jjej",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else console.log("Server is ready to take messages");
});

const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: "kanishkazoysa1234@gmail.com",
    to: email,
    subject: "Your OTP Code",
    html: `Your OTP code is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return otp;
};

router.post("/otp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const userOtp = await userVerificationSchema.findOne({ email });
    console.log("userOtp", userOtp);

    if (userOtp) {
      console.log("userOtpljioij", userOtp);
      await userVerificationSchema.findOneAndDelete({ email });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    sendOtpEmail(email, otp);
    const createdAt = new Date();
    const expiredAt = new Date(createdAt.getTime() + 5 * 60000);
    const newUser = new userVerificationSchema({
      email,
      otp,
      createdAt,
      expiredAt,
    });
    await newUser.save();
    console.log(otp);

    res.status(200).send({
      otp: otp,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { email, enteredOTP } = req.body;
    console.log(email, enteredOTP);
    const user = await userVerificationSchema.findOne({ email, enteredOTP });
    if (!user) {
      return res.status(400).json({ error: "OTP expired or invalid" });
    }
    if (enteredOTP != user.otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    const currentTime = new Date();
    if (currentTime > user.expiredAt) {
      await userVerificationSchema.findOneAndDelete({ email });
      return res.status(400).json({ error: "OTP has expired" });
    }
    console.log("OTP is valid");

    await userVerificationSchema.findOneAndDelete({ email });
    res.status(200).json({ message: "OTP is valid" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
