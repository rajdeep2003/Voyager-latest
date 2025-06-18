const express = require("express");
const { registerUser, loginUser, getUserProfile, updateRewards, logoutUser } = require("../controller/Auth");
const authMiddleware = require("../middleware/AuthMiddleware");
const { getUserReview, createReview } = require("../controller/reviewController");
const { uploadavater } = require("../controller/handleuploadavater");
const { createCommunityPost } = require("../controller/communityController");
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.post("/update-rewards", authMiddleware, updateRewards);
router.get("/logout", logoutUser);
router.post("/avater" , authMiddleware,uploadavater);
router.post("/community", authMiddleware , createCommunityPost);
router.post("/testing", authMiddleware, (req, res) => {
    res.json({ message: "Testing route is working!" });
});
//review
router.post("/createReview", authMiddleware, createReview);
module.exports = router;