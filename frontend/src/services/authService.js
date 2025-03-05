import axios from "axios";

const Base_url = "http://localhost:3003/auth/";

export const signup = async (username, password) => {
  try {
    await axios.post(`${Base_url}signup`, {
      Username: username,
      Password: password,
    });
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${Base_url}login`, {
      Username: username,
      Password: password,
    });
    return response.data.accessToken;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
