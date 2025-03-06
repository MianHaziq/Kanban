const jwt = require("jsonwebtoken");
const userModel = require("../Models/user");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
    try {
        const { Username, Password } = req.body;
        if (!Username || !Password) {
            return res.status(400).json({ message: "username & password required" });
        }

        const user = await userModel.findOne({ Username });
        if (!user) {
            return res.status(404).json({ message: "User Does Not Exist" });
        }
        console.log("Stored Hashed Password:", user.Password);  
        const isMatch = await bcrypt.compare(Password, user.Password);
        console.log("Password Match Result:", isMatch);  
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect Username or Password" });
        }
        const accessToken = jwt.sign({ Username: user.Username, id: user._id }, 'secret',{ expiresIn: '1h'});
        return res.status(200).json({ accessToken, message: "Login Success" });
    } catch (error) {
        next(error);
    }
}; 


const Signup = async (req, res, next) => {
    try {
        const { Username, Password } = req.body;

        if (!Username || !Password) {
            return res.status(400).json({ message: "Username and Password are required" });
        }

       

        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new userModel({ Username, Password: hashedPassword });
        await newUser.save();

        return res.status(200).json({ message: "Signup Success" });
    } catch (error) {
        next(error);
    }
};


module.exports = { login, Signup };
