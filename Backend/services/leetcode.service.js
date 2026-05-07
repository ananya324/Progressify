const axios = require("axios");
const LeetcodeDaily = require("../models/LeetcodeDaily");

const fetchLeetCodeStats = async (username, userId) => {
  const query = {
    query: `
      query getUser($username: String!) {
        matchedUser(username: $username) {
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `,
    variables: {
      username,
    },
  };

  try {
    const res = await axios.post(
      "https://leetcode.com/graphql",
      query,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 8000,
      }
    );

    // Safe access
    const userData = res?.data?.data?.matchedUser;

    if (!userData) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "Invalid LeetCode username:",
          username
        );
      }

      return {
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        source: "invalid_user",
      };
    }

    const data = userData?.submitStats?.acSubmissionNum;

    // Validate response
    if (!Array.isArray(data)) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "Unexpected LeetCode response:",
          data
        );
      }

      return {
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        source: "bad_response",
      };
    }

    // Process stats
    const result = {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
    };

    data.forEach((item) => {
      if (item.difficulty === "All") {
        result.totalSolved = item.count;
      }

      if (item.difficulty === "Easy") {
        result.easySolved = item.count;
      }

      if (item.difficulty === "Medium") {
        result.mediumSolved = item.count;
      }

      if (item.difficulty === "Hard") {
        result.hardSolved = item.count;
      }
    });

    const today = new Date().toLocaleDateString("en-CA");

    // Save daily stats
    if (userId) {
      try {
        await LeetcodeDaily.findOneAndUpdate(
          {
            userId,
            date: today,
          },
          {
            userId,
            date: today,
            totalSolved: result.totalSolved,
          },
          {
            upsert: true,
            new: true,
          }
        );
      } catch (dbErr) {
        if (process.env.NODE_ENV === "development") {
          console.error(
            "LeetCode DB save failed:",
            dbErr.message
          );
        }
      }
    }

    return result;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "LeetCode GraphQL error:",
        err.message
      );
    }

    return {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      source: "fallback",
    };
  }
};

module.exports = {
  fetchLeetCodeStats,
};