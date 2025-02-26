import React from 'react'

function Card({task,openEditModal,remove,onDragStart}) {
  return (
   <>
   <div
   draggable
   onDragStart={(e)=>onDragStart(e,task)}
  className={` ${task.Status==="todo"?"bg-blue-300": task.Status==="progress"?"bg-yellow-300":"bg-green-400"} bg-white p-4 rounded-lg shadow-md my-2`}
   >
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
   
   </>
  )
}

export default Card