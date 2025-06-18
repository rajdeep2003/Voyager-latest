 
const { User } = require("../models/UserSchema");
const bcrypt = require("bcrypt");


exports.updateUserProfile = async (req, res) => {
  const { userId } = req.user;
  const { name, email, phone, password } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    // Update fields if present
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    const updatedUser = await User.save();
    console.log(updatedUser)

    res.json({
      message: "Profile updated successfully",
      user: {
        id:  updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
      },
       message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


