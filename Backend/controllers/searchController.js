const { fetchRedditPosts } = require("../services/redditService");
const { fetchYouTubeContent } = require("../services/youtubeService");

const discoverContent = async (req, res) => {
  try {
    // Take search keyword from query params
    const { q } = req.query;

    // Fetch Reddit posts and YouTube content simultaneously
    const [community, ytData] = await Promise.all([
      fetchRedditPosts(q),
      fetchYouTubeContent(q),
    ]);

    res.json({
      community: community.length
        ? community
        : [
            {
              title: "Community insights not available (network restricted)",
              url: "#",
              subreddit: "info",
            },
          ],

      videos: ytData.videos,
      playlists: ytData.playlists,
    });
  } catch (error) {
    // Log only in development
    if (process.env.NODE_ENV === "development") {
      console.error("discoverContent error:", error);
    }

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  discoverContent,
};