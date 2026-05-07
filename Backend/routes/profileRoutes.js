const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
console.log("USING FILE:", require.resolve("../controllers/profileController"));
module.exports = router;