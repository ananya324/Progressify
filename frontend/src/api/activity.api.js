import axios from "./axios";

// GET activity
export const getActivity = async () => {
  const res = await axios.get("/activity");
  return res.data;
};

// LOG activity
export const logActivity = async (action) => {
  const res = await axios.post("/activity", { action });
  return res.data;
};