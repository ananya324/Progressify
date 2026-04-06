const express = require("express");
const {
  getRecommendationsByCourse,
  getAllRecommendations,
} = require("../controllers/recommendationController");

const router = express.Router();

router.get("/", getAllRecommendations);        // NEW
router.get("/:courseId", getRecommendationsByCourse);

module.exports = router;
