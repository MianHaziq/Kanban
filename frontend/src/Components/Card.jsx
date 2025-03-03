import React from 'react';
import { MdDeleteForever } from "react-icons/md"
import { AiFillEdit } from "react-icons/ai";
function Card({ task, index, openEditModal, remove, onDragStart }) {
  return (
    <>
      <div
        draggable
        onDragStart={(e) => onDragStart(e, task, index)}
        className={`
          ${
            task.Status === 'todo'
              ? 'bg-blue-400'
              : task.Status === 'progress'
              ? 'bg-yellow-400'
              : 'bg-green-400'
          }
          p-4 rounded-lg shadow-md my-2 transition-all duration-300
          hover:scale-105 hover:shadow-xl
        `}
      >
        <h2 className="font-bold">{task.Title}</h2>
        <p>{task.Description}</p>

        <div className="flex justify-around mt-2">
          <button
            onClick={() => openEditModal(task)}
            className="bg-yellow-700 text-white text-xl p-2 rounded-xl shadow-2xl my-2 transition-all duration-300
          hover:scale-105 hover:shadow-2xl"
          >
           <AiFillEdit />
          </button>
          <button
            onClick={() => remove(task)}
            className="bg-red-700 text-white text-lg p-2 rounded-xl shadow-2xl my-2 transition-all duration-300
          hover:scale-105 hover:shadow-2xl"
          >
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
