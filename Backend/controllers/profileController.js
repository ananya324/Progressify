const User = require("../models/User");

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("getProfile error:", err.message);
    }

    res.status(500).json({
      message: "Failed to get profile",
    });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        githubUsername: req.body.githubUsername,
        leetcodeUsername: req.body.leetcodeUsername,
        bio: req.body.bio,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(updatedUser);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("updateProfile error:", err.message);
    }

    res.status(500).json({
      message: "Update failed",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};