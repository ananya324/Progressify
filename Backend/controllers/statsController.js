const User = require("../models/User");

const { fetchLeetCodeStats } = require("../services/leetcode.service");
const { fetchGithubContributions } = require("../services/github.service");

const getMyStats = async (req, res) => {
  try {
    // Auth safety check
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await User.findById(req.user._id).select(
      "githubUsername leetcodeUsername"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // =========================
    // GitHub Data
    // =========================
    let githubData = [];

    if (user.githubUsername) {
      try {
        githubData = await fetchGithubContributions(
          user.githubUsername
        );
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("GitHub fetch error:", err.message);
        }

        githubData = [];
      }
    }

    // =========================
    // LeetCode Data
    // =========================
    let leetcodeData = {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      source: "default",
    };

    if (user.leetcodeUsername) {
      try {
        leetcodeData = await fetchLeetCodeStats(
          user.leetcodeUsername,
          user._id
        );
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("LeetCode fetch failed:", err.message);
        }

        leetcodeData = {
          totalSolved: 0,
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
          source: "fallback",
        };
      }
    }

    // Final response
    res.json({
      github: {
        contributions: githubData,
      },
      leetcode: leetcodeData,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("getMyStats error:", err.message);
    }

    res.status(500).json({
      message: "Stats failed",
    });
  }
};

module.exports = {
  getMyStats,
};