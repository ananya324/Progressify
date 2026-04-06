const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  logActivity,
  getActivity,
} = require("../controllers/activity.controller");


router.post("/", protect, logActivity);
router.get("/", protect, getActivity);

module.exports = router;