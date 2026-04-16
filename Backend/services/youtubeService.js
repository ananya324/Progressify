//We use axios to make HTTP requests to external APIs

const axios = require("axios");
//This function takes a search keyword and fetches related YouTube videos
const fetchYouTubeCourses = async (query) => {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    //We build a URL to search YouTube videos
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}+course&type=videos&maxResults=8&key=${API_KEY}`;

    const { data } = await axios.get(url);
   
    return data.items.map((video) => ({
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.medium.url,
      videoId: video.id.videoId,
    }));
  } catch (error) {
    console.error("YouTube API Error:", error.message);
    return [];
  }
};

module.exports = { fetchYouTubeCourses };