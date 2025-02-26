import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Add from "./Add";

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
    localStorage.setItem('tasks',JSON.stringify(temp));

  };
  const openEditModal = (task) => {
    setEditTask(task);
  };


  useEffect(()=>{
    if(tasks){
   
    const tasks=JSON.parse(localStorage.getItem('tasks'))
    console.log(tasks);
   if(tasks){
      setTasks(tasks);
   }
  }
  },[])
  
  useEffect(()=>{
    if(tasks.length >0){
    localStorage.setItem('tasks',JSON.stringify(tasks));
    }
  },[tasks]);


  return (
    <>
      <div className="bg-slate-900 h-screen w-screen">
        <Nav />
        <Add addTask={addTask}  editTask={editTask}/>

        <div className="flex justify-around mt-5">
       
          <div className="bg-blue-600 h-screen w-1/4 rounded-3xl p-4">
            <h1 className="text-white text-center font-bold">TO-DO</h1>
            {tasks
              .filter((task) => task.Status === "todo")
              .map((task) => (
                <div key={task.Title} className="bg-blue-300 p-2 rounded-lg my-2">
                  <h2 className="font-bold">{task.Title}</h2>
                  <p>{task.Description}</p>
                  <button
                    onClick={() => openEditModal(task)}
                    className="bg-yellow-700 mx-10 text-white text-sm p-2 rounded-xl"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => remove(task)}
                    className="bg-red-700 text-white text-sm p-2 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>

          <div className="bg-yellow-600 h-screen w-1/4 rounded-3xl p-4">
            <h1 className="text-white text-center font-bold">In Progress</h1>
            {tasks
              .filter((task) => task.Status === "progress")
              .map((task) => (
                <div key={task.Title} className="bg-yellow-300 p-2 rounded-lg my-2">
                  <h2 className="font-bold">{task.Title}</h2>
                  <p>{task.Description}</p>
                  <button
                    onClick={() => openEditModal(task)}
                    className="bg-yellow-700 mx-10 text-white text-sm p-2 rounded-xl"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => remove(task)}
                    className="bg-red-700 text-white text-sm p-2 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>

       
          <div className="bg-green-600 h-screen w-1/4 rounded-3xl p-4">
            <h1 className="text-white text-center font-bold">Done</h1>
            {tasks
              .filter((task) => task.Status === "done")
              .map((task) => (
                <div key={task.Title} className="bg-green-300 p-2 rounded-lg my-2">
                  <h2 className="font-bold">{task.Title}</h2>
                  <p>{task.Description}</p>
                  <button
                    onClick={() => openEditModal(task)}
                    className="bg-yellow-700 mx-10 text-white text-sm p-2 rounded-xl"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => remove(task)}
                    className="bg-red-700 text-white text-sm p-2 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
