require("dotenv").config(); // must be FIRST

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userCourseRoutes = require("./routes/userCourseRoutes");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const searchRoutes = require("./routes/searchRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const githubRoutes = require("./routes/githubRoutes");
const activityRoutes = require("./routes/activity.routes");
const profileRoutes = require("./routes/profileRoutes");
const statsRoutes = require("./routes/statsRoutes");


//app = your server object
//PORT = where your server runs

const app = express();
const PORT = 5000;

//Allows frontend (likely Vite React on port 5173) to call backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

connectDB();


app.get("/",(req,res) =>{
    res.send("Backend working");
});
app.use("/api/auth", authRoutes);
app.use("/api/user-courses", userCourseRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/stats", statsRoutes);




app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})

// 1. Load environment variables
// 2. Import dependencies
// 3. Create Express app
// 4. Connect to database
// 5. Define middleware
// 6. Define routes
// 7. Start server