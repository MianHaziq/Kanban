const TaskModel=require("../models/task");

const createTask=async (req,res,next)=>{

    try{
const {Title,Description,Status}=req.body;

const newTask=new TaskModel({
    Title:Title,
    Description:Description,
    Status:Status
})
await newTask.save();

res.status(201).json(newTask);
if(!newTask){
    return res.status(404).json({ message: "Task not Created" });
}
    }
    catch (error) {
next(error);
    }

}

const readTask = async (req, res, next) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};
//////

const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { Title, Description, Status } = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate( id,{ Title, Description, Status },{ new: true } );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports={
createTask,
updateTask,
deleteTask,
readTask
}




