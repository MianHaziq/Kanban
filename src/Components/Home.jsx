
import React, { useState } from "react";
import Nav from "./Nav";
import Add from "./Add";

function Home() {
  const [tasks, setTasks] = useState([]); 

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };
  const remove=(index)=>{
    let newtask=[...tasks];
    newtask.splice(index,1);
    setTasks([newtask]);
    }
    const update=()=>{
           
    }
  return (
    <>
      <div className="bg-slate-900 h-screen w-screen">
        <Nav />
        <Add addTask={addTask} />

        <div className="flex justify-around mt-5">
          
          <div className="bg-blue-600 h-screen w-1/4 rounded-3xl p-4">
            <h1 className="text-white text-center font-bold">TO-DO</h1>
            {tasks .filter((task) => task.Status === "todo").map((task) => (
                <div  className="bg-blue-300 p-2 rounded-lg my-2">
                  <h2 className="font-bold">{task.Title}</h2>
                  <p>{task.Description}</p>
                  <button onClick={update} className="bg-yellow-700  mx-10 text-white text-sm p-2 rounded-xl " >Update</button>
                  <button onClick={remove} className="bg-red-700 text-white text-sm p-2 rounded-xl " >Delete</button>
                </div>
              ))}
          </div>

         
          <div className="bg-yellow-600 h-screen w-1/4 rounded-3xl p-4">
            <h1 className="text-white text-center font-bold">In Progress</h1>
            {tasks.filter((task) => task.Status === "progress").map((task) => (
                <div  className="bg-yellow-300 p-2 rounded-lg my-2">
                  <h2 className="font-bold">{task.Title}</h2>
                  <p>{task.Description}</p>
                  
                  <button onClick={update} className="bg-yellow-700 mx-10 text-white text-sm p-2 rounded-xl " >Update</button>
                  <button onClick={remove} className="bg-red-700 text-white text-sm p-2 rounded-xl " >Delete</button>
                </div>
              ))}
          </div>

          
          <div className="bg-green-600 h-screen w-1/4 rounded-3xl p-4">
            <h1 className="text-white text-center font-bold">Done</h1>
            {tasks .filter((task) => task.Status === "done") .map((task) => (
                <div className="bg-green-300 p-2 rounded-lg my-2">
                  <h2 className="font-bold">{task.Title}</h2>
                  <p>{task.Description}</p>
                  <button onClick={update} className="bg-yellow-700  mx-10 text-white text-sm p-2 rounded-xl " >Update</button>
                  <button onClick={remove} className="bg-red-700 text-white text-sm p-2 rounded-xl " >Delete</button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
