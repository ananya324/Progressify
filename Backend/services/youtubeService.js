const axios = require("axios");

const fetchYouTubeContent = async (query) => {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;

    // Video request
    const videoUrl =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=snippet&q=${query}+course&type=video` +
      `&maxResults=8&key=${API_KEY}`;

    // Playlist request
    const playlistUrl =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=snippet&q=${query}+course&type=playlist` +
      `&maxResults=8&key=${API_KEY}`;

    // Parallel requests
    const [videoRes, playlistRes] = await Promise.all([
      axios.get(videoUrl),
      axios.get(playlistUrl),
    ]);

    // Format videos
    const videos = videoRes.data.items.map((video) => ({
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.medium.url,
      videoId: video.id.videoId,
    }));

    // Format playlists
    const playlists = playlistRes.data.items.map((playlist) => ({
      title: playlist.snippet.title,
      thumbnail: playlist.snippet.thumbnails.medium.url,
      playlistId: playlist.id.playlistId,
    }));

    return {
      videos,
      playlists,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "YouTube API fetch error:",
        error.message
      );
    }

    return {
      videos: [],
      playlists: [],
    };
  }
};

module.exports = {
  fetchYouTubeContent,
};