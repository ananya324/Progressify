const axios = require("axios");

const getGithubData = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }

    // 🔹 User profile
    const userRes = await axios.get(
      `https://api.github.com/users/${username}`
    );

    // 🔹 Recent activity
    const eventsRes = await axios.get(
      `https://api.github.com/users/${username}/events`
    );

    const data = {
      repos: userRes.data.public_repos,
      followers: userRes.data.followers,
      activity: eventsRes.data.slice(0, 5), // latest 5 events
    };

    res.json(data);
  } catch (err) {
    console.error("GitHub Error:", err.message);
    res.status(500).json({ message: "GitHub fetch failed" });
  }
};

module.exports = { getGithubData };