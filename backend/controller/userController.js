const userModel = require("../Models/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res, next) => {
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
        res.status(201).json({ message: "User created successfully", newUser });
    } catch (error) {
        next(error);
    }
};

const readUser = async (req, res, next) => {
    try {
        const users = await userModel.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users" });
        }
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const readUserId = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userData = await userModel.findById(id);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        } 
        res.json(userData);
        
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { email, username, password } = req.body;

        let updatedData = {};
        if (email) {
            const existingUser = await userModel.findOne({ email });
            if (existingUser && existingUser._id.toString() !== id) {
                return res.status(400).json({ message: "Email already in use" });
            }
            updatedData.email = email;
        }
        if (username) updatedData.username = username;
        if (password) updatedData.password = await bcrypt.hash(password, 10);

        const updatedUser = await userModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        } 
        res.json({ message: "Updated Successfully", updatedUser });

    } catch (error) {
        next(error);
    }
};

const deleteUserbyid = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        } 
        res.json({ message: "User deleted", deletedUser });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    readUser,
    readUserId,
    updateUser,
    deleteUserbyid
};
