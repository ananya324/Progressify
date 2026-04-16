const User = require("../models/User");
const jwt = require("jsonwebtoken");

//This function creates a token for the user after login or register
//Give user a secure identity so they don’t need to login again and again
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

const registerUser = async (req, res) => {
    try {
        //Take name, email, password from user request
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        //Save new user in database
        const user = await User.create({
            name,
            email,
            password,
        });

        //Send user details + token back to frontend
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        const user = await User.findOne({ email });
        //Login success → send user data + token
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    }catch(error){
        res.status(500).json({message : error.message})
    }

};

module.exports = {
    registerUser,
    loginUser,
};

