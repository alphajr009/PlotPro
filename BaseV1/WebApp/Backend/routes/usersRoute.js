const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Otp = require("../models/otp");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    const newUser = new User({ email, password });
    const user = await newUser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        const temp = {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id,
        };
        res.send(temp);
      } else {
        return res.status(400).json({ message: "Password incorrect" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.patch("/changeadmin", async (req, res) => {
  const { _id, isAdmin } = req.body;

  try {
    const user = await User.findById(_id);
    user.isAdmin = true;
    await user.save();
    res.send("Admin Status updated successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error updating Admin Status");
  }
});

router.post("/getuserbyid", async (req, res) => {
  const userid = req.body.userid;

  try {
    const user = await User.find({ _id: userid });
    res.send(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.patch("/update", async (req, res) => {
  const { name, email, _id } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    res.send(user);
  } catch (error) {
    return res.status(400).json({ error: "Unable to update profile" });
  }
});

router.post("/changepasswordOtp", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    await Otp.deleteOne({ email });

    res.send("Password changed successfully");
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).send("Failed to change password");
  }
});

module.exports = router;