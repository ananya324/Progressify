const axios = require("axios");

const fetchRedditPosts = async (query) => {
  try {
    const url = `https://www.reddit.com/search.json?q=${query}&limit=5`;

    const { data } = await axios.get(url);

    return data.data.children.map((post) => ({
      title: post.data.title,
      url: `https://reddit.com${post.data.permalink}`,
      subreddit: post.data.subreddit,
    }));
  } catch (error) {
    console.error("Reddit API Error:", error.message);
    return [];
  }
};

module.exports = { fetchRedditPosts };