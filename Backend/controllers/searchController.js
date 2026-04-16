const { fetchRedditPosts } = require("../services/redditService");
const { fetchYouTubeCourses } = require("../services/youtubeService");

const discoverContent = async (req, res) => {
  try {
    //We take search keyword from URL
    const { q } = req.query;
    //We fetch Reddit posts and YouTube courses at the same time
    //Promise.all-Both load together (fast)
    const [community, courses] = await Promise.all([
      fetchRedditPosts(q),
      fetchYouTubeCourses(q),
    ]);

    res.json({
      community: community.length ? community : [
        {
          title: "Community insights not available (network restricted)",
          url: "#",
          subreddit: "info",
        },
      ],
      courses,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  discoverContent,
};