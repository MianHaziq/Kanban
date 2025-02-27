import React, { useState, useEffect } from "react";

function Add({ addTask, editTask }) {
  const [isModalOpen, setModal] = useState(false);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Status, setStatus] = useState("todo");
  

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.Title);
      setDescription(editTask.Description);
      setStatus(editTask.Status);
 
      setModal(true);
    }
  }, [editTask]);

  const toggle = () => {
    setModal(!isModalOpen);
    if (!isModalOpen) {
      setTitle("");
      setDescription("");
      setStatus("todo");

    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      Title:Title,
      Description:Description,
      Status:Status,
    
    };

    addTask(newTask);

    setModal(false);
    setTitle("");
    setDescription("");
    setStatus("todo");
  
  };

  return (
    <>
      <button
        onClick={toggle}
        className="block text-white bg-blue-700 mt-5 ml-auto mr-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add
      </button>

      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md bg-slate-600 rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-white dark:text-white">
                {editTask ? "Edit Task" : "Add New Task"}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggle}
              >
                ✖
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Write Title"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Task Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Write Task description"
                  ></textarea>
                </div>
              </div>
              
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="status"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={Status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="todo">To-Do</option>
                  <option value="progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <button
                type="submit"
                className="text-white mt-4 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {editTask ? "Update Task" : "Add Task"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Add;
