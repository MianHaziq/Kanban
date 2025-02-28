const express = require("express");
const { createTask, readTask, updateTask, deleteTask } = require("../controller/task_controller");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post("/create",  createTask);
router.get("/get",  readTask);
router.patch("/update/:id",  updateTask);
router.delete("/delete/:id",  deleteTask);

module.exports = router;