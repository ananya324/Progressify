const express = require("express");
//importing controller functions
const {
  registerUser,
  loginUser, 
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
//mini express app only for auth routes
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

//Exports this router so you can use it in server.js
module.exports = router;