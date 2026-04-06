const express = require("express");
const { discoverContent } = require("../controllers/searchController");
const { getAISummary } = require("../controllers/aiController");


const router = express.Router();

router.get("/discover", discoverContent);
router.get("/ai-summary", getAISummary);

module.exports = router;