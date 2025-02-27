const userModel = require("../Models/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res, next) => {
    try {
        const { Username, Password } = req.body; 

        if (!Username || !Password) {
            return res.status(400).json({ message: "Username and Password are required" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new userModel({ Username, Password: hashedPassword });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const readUser = async (req, res, next) => {
    try {
        const users = await userModel.find();
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
            res.status(404).json({ message: "User not found" });
        } else {
            res.json(userData);
        }
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json({ message: "Updated Successfully", updatedUser });
        }
    } catch (error) {
        next(error);
    }
};

const deleteUserbyid = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json({ message: "User deleted", deletedUser });
        }
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
