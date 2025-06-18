const { User } = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        sucess: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      points: 0,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { httpOnly: true });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//Get User Profile (After Login)
exports.getUserProfile = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Rewards Points
exports.updateRewards = async (req, res) => {
  const { userId, points } = req.body;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.rewardPoints += points;
    await user.save();

    res.json({ success: true, rewardPoints: user.rewardPoints });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

//  Logout User
exports.logoutUser = (req, res) => {
  res.clearCookie("token"); // If using cookies
  return res.json({ message: "Logged out successfully" });
};
