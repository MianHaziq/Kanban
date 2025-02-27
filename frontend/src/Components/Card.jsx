import React from 'react'

function Card({task,index,openEditModal,remove,onDragStart}) {
  return (
   <>
   <div
   draggable
   onDragStart={(e)=>onDragStart(e,task,index)}
  className={` ${task.Status==="todo"?"bg-blue-400": task.Status==="progress"?"bg-yellow-400":"bg-green-400"} p-4 rounded-lg shadow-md my-2`}
   >
   
 <h2 className="font-bold">{task.Title}</h2>  
                  <p>{task.Description}</p>

                  <div className='flex justify-around' >
                  <button
                    onClick={() => openEditModal(task)}
                    className="bg-yellow-700   text-white text-sm p-2 rounded-xl"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => remove(task)}
                    className="bg-red-700  text-white text-sm p-2 rounded-xl"
                  >
                    Delete
                  </button>
                  </div>
   </div>
   
   </>
  )
}

export default Card