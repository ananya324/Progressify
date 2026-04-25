import api from "./axios";

/* ---------- GET ALL COURSES (with filters) ----------
   params example:
   {
     search: "react",
     platform: "youtube",
     type: "free",
     page: 1,
     limit: 10
   }
---------------------------------------------------- */
export const getCourses = async (params = {}) => {
  const { data } = await api.get("/courses", { params });
  return data;
};

/* ---------- GET COURSE BY ID ---------- */
export const getCourseById = async (id) => {
  const { data } = await api.get(`/courses/${id}`);
  return data;
};

/* ---------- GET COURSES BY PLATFORM ---------- */
export const getCoursesByPlatform = async (platform) => {
  const { data } = await api.get(`/courses/platform/${platform}`);
  return data;
};

/* ---------- SEARCH COURSES ---------- */
export const searchCourses = async (query) => {
  const { data } = await api.get("/courses/search", {
    params: { q: query },
  });
  return data;
};
 