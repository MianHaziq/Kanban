import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Add from "./Add";
import Card from "./Card";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const token = localStorage.getItem("token"); 


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3002/task/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTasks();
  }, [token]);


  const addTask = async (task) => {
    try {
      if (editTask) {
        const response = await axios.patch(`http://localhost:3002/task/update/${editTask._id}`, task, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(tasks.map((t) => (t._id === editTask._id ? response.data : t)));
      } else {
        const response = await axios.post("http://localhost:3002/task/create/", task, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks([...tasks, response.data]);
      }
      setEditTask(null);
    } catch (error) {
      console.error("Error saving task ", error);
    }
  };

  const remove = async (taskToDelete) => {
    try {
      await axios.delete(`http://localhost:3002/task/delete/${taskToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskToDelete._id));
    } catch (error) {
      console.error("Error while the deleting task", error);
    }
  };

  const openEditModal = (task) => {
    setEditTask(task);
  };

  const onDragStart = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = async (e, targetStatus) => {
    e.preventDefault();
    const dragtask = JSON.parse(e.dataTransfer.getData("task"));

    if (dragtask.Status !== targetStatus) {
      try {
        const updatedTask = { ...dragtask, Status: targetStatus };
        const response = await axios.patch(`http://localhost:3002/task/update/${dragtask._id}`, updatedTask, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(tasks.map((task) => (task._id === dragtask._id ? response.data : task)));
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };

  return (
    <>
      <div className="mb-10">
        <Nav  />
        <Add addTask={addTask} editTask={editTask} />

        <div className="flex justify-around mt-5">
          {["todo", "progress", "done"].map((status) => (
            <div
              key={status}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, status)}
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
                    key={task._id}
                    index={index}
                    task={task}
                    openEditModal={openEditModal}
                    remove={remove}
                    onDragStart={(e) => onDragStart(e, task)}
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
