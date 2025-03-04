import axios from "axios";

const Base_url = "http://localhost:3003/task/";

export const fetchTasks = async (token) => {
  try {
    const response = await axios.get(Base_url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks", error);
    throw error;
  }
};

export const addOrUpdateTask = async (task, token, editTask) => {
  try {
    if (editTask) {
      const response = await axios.patch(`${Base_url}update/${editTask._id}`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } else {
      const response = await axios.post(`${Base_url}create/`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error saving task", error);
    throw error;
  }
};

export const removeTask = async (taskId, token) => {
  try {
    await axios.delete(`${Base_url}delete/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error deleting task", error);
    throw error;
  }
};

export const updateTaskStatus = async (task, status, token) => {
  try {
    const updatedTask = { ...task, Status: status };
    const response = await axios.patch(`${Base_url}update/${task._id}`, updatedTask, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task status", error);
    throw error;
  }
};
