import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Add from "./Add";
import Card from "./Card";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const addTask = (task) => {
    if (editTask) {
      setTasks(tasks.map((t) => (t.Title === editTask.Title ? task : t)));
      setEditTask(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  const remove = (del) => {
    const temp = tasks.filter((task) => task !== del);
    setTasks(temp);
    localStorage.setItem("tasks", JSON.stringify(temp));
  };

  const openEditModal = (task) => {
    setEditTask(task);
  };

  // Drag Functions
  const onDragStart = (e, task, index) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
    e.dataTransfer.setData("index", index);
    e.dataTransfer.setData("sourceStatus", task.Status);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetStatus, targetIndex) => {
    e.preventDefault();

    const draggedTask = JSON.parse(e.dataTransfer.getData("task"));
    const sourceIndex = parseInt(e.dataTransfer.getData("index"));
    const sourceStatus = e.dataTransfer.getData("sourceStatus");

    let updatedTasks = [...tasks];

    // Remove the task from its original position
    updatedTasks = updatedTasks.filter((t) => t.Title !== draggedTask.Title);

    // Update the task's status
    draggedTask.Status = targetStatus;

    // Insert the task at the new position
    updatedTasks.splice(targetIndex, 0, draggedTask);

    setTasks(updatedTasks);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <>
      <div className="mb-10">
        <Nav />
        <Add addTask={addTask} editTask={editTask} />

        <div className="flex justify-around mt-5">
          {["todo", "progress", "done"].map((status) => (
            <div
              key={status}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, status, tasks.filter((task) => task.Status === status).length)}
              className={`h-auto w-1/4 rounded-3xl p-4 ${
                status === "todo"
                  ? "bg-blue-600"
                  : status === "progress"
                  ? "bg-yellow-600"
                  : "bg-green-600"
              }`}
            >
              <h1 className="text-white text-center font-bold">
                {status === "todo"
                  ? "TODO"
                  : status === "progress"
                  ? "In Progress"
                  : "Done"}
              </h1>

              {tasks
                .filter((task) => task.Status === status)
                .map((task, index) => (
                  <Card
                    key={task.Title}
                    index={index}
                    task={task}
                    openEditModal={openEditModal}
                    remove={remove}
                    onDragStart={(e) => onDragStart(e, task, index)}
                    onDrop={(e) => onDrop(e, status, index)}
                    onDragOver={onDragOver}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;