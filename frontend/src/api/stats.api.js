import axiosInstance from "./axios";

export const getMyStats = () =>
  axiosInstance.get("/stats").then(res => res.data);