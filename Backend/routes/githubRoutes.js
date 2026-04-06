const express = require("express");
const router = express.Router();
const { getGithubData } = require("../controllers/githubController");

// 🔹 Fetch GitHub data
router.get("/", getGithubData);

module.exports = router;