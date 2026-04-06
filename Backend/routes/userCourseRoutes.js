const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const {
    saveCourse,
    getMyCourse,
    updateProgress,
    removeCourse,
    addCustomCourse,
}= require("../controllers/UserCourse");

const router = express.Router();
router.use(protect);

router.post("/custom", addCustomCourse);
router.post("/:courseId", saveCourse);
router.get("/", getMyCourse);
router.patch("/:courseId/progress", updateProgress);
router.delete("/:courseId", removeCourse);
module.exports = router ;
   