const taskModel = require("../models/task");
const logModel = require("../models/logger");

const createTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;
        if (!title || !description || !status) {
            return res.status(400).json({ message: " All Inputs Required" });
        }

        const Userid = req.user.id; 

        const newTask = new taskModel({ title, description, status, Userid });
        await newTask.save();

        const log = new logModel({
            createdBy: Userid,
            taskid: newTask._id,
            oldStatus: null,
            newStatus: status,
            action: "create"
        });
        await log.save();

        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};

const readTask = async (req, res, next) => {
    try {
        const tasks = await taskModel.find().populate('Userid'); 
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};
const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const Userid = req.user.id; 

        const task = await taskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

      
        // if (task.Userid.toString() !== Userid) {
        //     return res.status(403).json({ message: " You can only update your own tasks" });
        // }

        const updatedTask = await taskModel.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true }
        );

        if (updatedTask) {
            const log = new logModel({
                createdBy: Userid,
                taskid: updatedTask._id,
                oldStatus: task.status,
                newStatus: status,
                action: "update"
            });
            await log.save();
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};
const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const Userid = req.user.id; 

        const task = await taskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        
        // if (task.Userid.toString() !== Userid) {
        //     return res.status(403).json({ message: "You can only delete your own tasks" });
        // }

        await taskModel.findByIdAndDelete(id);

        const log = new logModel({
            createdBy: Userid,
            taskid: id,
            oldStatus: task.status,
            newStatus: null,
            action: "delete"
        });
        await log.save();

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Task delition failed" });
    }
};


module.exports = {
    createTask,
    updateTask,
    deleteTask,
    readTask
};
