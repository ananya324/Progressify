const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getMyStats } = require("../controllers/statsController");

const router = express.Router();

router.get("/", protect, getMyStats);

module.exports = router;