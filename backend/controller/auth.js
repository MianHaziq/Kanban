const jwt = require("jsonwebtoken");
const userModel = require("../Models/user");
const bcrypt = require("bcrypt");
require('dotenv').config();

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email & password required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        const accessToken = jwt.sign({ email: user.email, id: user._id }, process.env.secret, { expiresIn: '1h' });
        return res.status(200).json({ accessToken, message: "Login success" });

    } catch (error) {
        next(error);
    }
};

const signup = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "Email, username, and password are required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ email, username, password: hashedPassword });
        await newUser.save();

        return res.status(200).json({ message: "Signup success" });
    } catch (error) {
        next(error);
    }
};

module.exports = { login, signup };
