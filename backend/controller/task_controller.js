const TaskModel = require("../models/task");
const LogModel = require("../models/logger");

const createTask = async (req, res, next) => {
    try {
        const { Title, Description, Status } = req.body;
        const Userid = req.user.id; 

        const newTask = new TaskModel({ Title, Description, Status, Userid });
        await newTask.save();

        const log = new LogModel({
            createdby: Userid,
            taskid: newTask._id,
            oldstatus: null,
            newstatus: Status,
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
        const tasks = await TaskModel.find().populate('Userid'); 
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};
const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { Title, Description, Status } = req.body;
        const Userid = req.user.id; 

        const task = await TaskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

      
        if (task.Userid.toString() !== Userid) {
            return res.status(403).json({ message: " You can only update your own tasks" });
        }

        const updatedTask = await TaskModel.findByIdAndUpdate(
            id,
            { Title, Description, Status },
            { new: true }
        );

        if (updatedTask) {
            const log = new LogModel({
                createdby: Userid,
                taskid: updatedTask._id,
                oldstatus: task.Status,
                newstatus: Status,
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

        const task = await TaskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        
        if (task.Userid.toString() !== Userid) {
            return res.status(403).json({ message: "You can only delete your own tasks" });
        }

        await TaskModel.findByIdAndDelete(id);

        const log = new LogModel({
            createdby: Userid,
            taskid: id,
            oldstatus: task.Status,
            newstatus: null,
            action: "delete"
        });
        await log.save();

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createTask,
    updateTask,
    deleteTask,
    readTask
};
