import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Add from "../components/Add";
import Card from "../components/Card";
import { AuthContext } from "../context/AuthContext";
import { fetchTasks, addOrUpdateTask, removeTask, updateTaskStatus } from "../services/taskService";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  //const token = localStorage.getItem("token");
  const { token } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks(token);
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    getTasks();
  }, [token]);

  const addTask = async (task) => {
    try {
      const updatedTask = await addOrUpdateTask(task, token, editTask);
      setTasks(editTask ? tasks.map((t) => (t._id === editTask._id ? updatedTask : t)) : [...tasks, updatedTask]);
      setEditTask(null);
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (taskToDelete) => {
    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskToDelete._id));   
      await removeTask(taskToDelete._id, token);
      
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleActivityLogs = () => {
    navigate('/log');
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
    const draggedTask = JSON.parse(e.dataTransfer.getData("task"));
    if (draggedTask.Status !== targetStatus) {
      try {
        const updatedTask = await updateTaskStatus(draggedTask, targetStatus, token);
        setTasks(tasks.map((task) => (task._id === draggedTask._id ? updatedTask : task)));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="mb-10">
        <Nav />
        <div className="flex justify-end flex-wrap ">
          <button onClick={handleActivityLogs} className="block text-white bg-orange-700 mt-5  mr-10 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Activity Log</button>
          <button onClick={handleLogout} className="block text-white bg-red-700 mt-5  mr-10 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Logout</button>
        </div>
        <Add addTask={addTask} editTask={editTask} />
      
        <div className="flex flex-wrap justify-around mt-5">
          {["todo", "progress", "done"].map((status) => (
            <div
              key={status}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, status)}
              className={`h-auto w-1/4 rounded-3xl p-4 ${
                status === "todo" ? "bg-blue-600" : status === "progress" ? "bg-yellow-600" : "bg-green-600"
              }`}
            >
              <h1 className="text-white text-center font-bold">
                {status === "todo" ? "TODO" : status === "progress" ? "In Progress" : "Done"}
              </h1>
              {tasks.filter((task) => task.Status === status).map((task, index) => (
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
