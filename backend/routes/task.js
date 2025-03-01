const express = require("express");
const { createTask, readTask, updateTask, deleteTask } = require("../controller/task_controller");
const authorization = require("../middleware/authorization");
const router = express.Router();

router.post("/create",authorization,  createTask);
router.get("/get",  readTask);
router.patch("/update/:id",authorization,  updateTask);
router.delete("/delete/:id",authorization,  deleteTask);

module.exports = router;