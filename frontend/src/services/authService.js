import axios from "axios";

const Base_url = "http://localhost:3003/auth/";

export const signup = async (email,username, password) => {
  try {
    await axios.post(`${Base_url}signup`, {
      email: email,
      username: username,
      password: password,
    });
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${Base_url}login`, {
      email: email,
      password: password,
    });
    return response.data.accessToken;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
