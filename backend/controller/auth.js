const jwt = require("jsonwebtoken");
const userModel = require("../Models/user");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "username & password required" });
        }

        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User Does Not Exist" });
        }
        console.log("Stored Hashed password:", user.password);  
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("password Match Result:", isMatch);  
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect username or password" });
        }
        const accessToken = jwt.sign({ username: user.username, id: user._id }, 'secret',{ expiresIn: '1h'});
        return res.status(200).json({ accessToken, message: "Login Success" });
    } catch (error) {
        next(error);
    }
}; 


const signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "username and password are required" });
        }

       

        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username, password: hashedpassword });
        await newUser.save();

        return res.status(200).json({ message: "Signup Success" });
    } catch (error) {
        next(error);
    }
};


module.exports = { login, signup };
