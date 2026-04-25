import axios from "./axios";


/* GET MY COURSES */
export const getMyCourses = async () => {
  const res = await axios.get("/user-courses");
  return res.data;
};

/* ENROLL / SAVE COURSE */
export const enrollCourse = async (courseId) => {
  const res = await axios.post(`/user-courses/${courseId}`);
  return res.data;
};

/* UPDATE PROGRESS */
export const updateProgress = async (courseId, progress) => {
  const res = await axios.patch(`/user-courses/${courseId}/progress`, {
    progress,
  });
  return res.data;
};

/* REMOVE COURSE */
export const removeCourse = async (courseId) => {
  const res = await axios.delete(`/user-courses/${courseId}`);
  return res.data;
};

/* ADD CUSTOM LINK COURSE */
export const addUserCourse = async (data) => {
  const res = await axios.post("/user-courses/custom", data);
  return res.data;
};
export const deleteUserCourse = async (courseId) => {
  const res = await axios.delete(`/user-courses/${courseId}`);
  return res.data;
};