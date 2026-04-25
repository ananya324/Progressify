import api from "./axios";

/* ---------- GET DAILY RECOMMENDATIONS ---------- */
export const getRecommendations = async () => {
  const { data } = await api.get("/recommendations");
  return data;
};

/* ---------- GET COMMUNITY RECOMMENDATIONS ----------
   Twitter / Reddit curated learning suggestions
-------------------------------------------------- */
export const getCommunityRecommendations = async () => {
  const { data } = await api.get("/recommendations/community");
  return data;
};

/* ---------- GET DAILY MOTIVATION QUOTE ---------- */
export const getDailyQuote = async () => {
  const { data } = await api.get("/recommendations/quote");
  return data;
};

export const fetchDiscover = async (query) => {
  const { data } = await api.get(`/search/discover?q=${query}`);
  return data;
};
export const fetchAISummary = async (query) => {
  const { data } = await api.get(`/search/ai-summary?q=${query}`);
  return data;
};

export const fetchGithubData = async (username) => {
  const { data } = await api.get(`/github?username=${username}`);
  return data;
};