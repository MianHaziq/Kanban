import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Add from "../Components/Add";
import Card from "../Components/Card";
import { useNavigate ,Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const token = localStorage.getItem("token"); 
const {logout}=useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3003/task/", {
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
        const response = await axios.patch(`http://localhost:3003/task/update/${editTask._id}`, task, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(tasks.map((t) => (t._id === editTask._id ? response.data : t)));
      } else {
        const response = await axios.post("http://localhost:3003/task/create/", task, {
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
      await axios.delete(`http://localhost:3003/task/delete/${taskToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskToDelete._id));
    } catch (error) {
      console.error("Error while the deleting task", error);
    }
  };
const navigate=useNavigate();

  const handlelogout = async () => {
   logout();

   navigate('/login');
  };
  const handleActivityLogs = async () => {
 
 
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
    const dragtask = JSON.parse(e.dataTransfer.getData("task"));

    if (dragtask.Status !== targetStatus) {
      try {
        const updatedTask = { ...dragtask, Status: targetStatus };
        const response = await axios.patch(`http://localhost:3003/task/update/${dragtask._id}`, updatedTask, {
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
        <div className="flex justify-end mr-10">
        <button onClick={handleActivityLogs} className="block text-white bg-orange-700 mt-5  mr-10 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Activity Log</button>

            <button onClick={handlelogout} className="block text-white bg-red-700 mt-5  mr-10 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Logout</button>
        
          </div>

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
