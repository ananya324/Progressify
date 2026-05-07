import axios from "./axios";

/* LOGIN */
export const login = async (data) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};

/* REGISTER */
export const register = async (data) => {
  const response = await axios.post("/auth/register", data);
  return response.data;
};

