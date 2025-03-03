import { useState } from "react";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/auth/login", {
        Username: username,
        Password: password,
      });

      localStorage.setItem("token", response.data.accessToken); 
    
      navigate("/home"); 
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials. Try again.");
    }
  };

  return (
    <section className="flex h-screen items-center justify-center bg-blue-900">
    <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
      <h1 className="text-blue-900 text-center text-2xl font-extrabold">KanBan</h1>
      <h2 className="text-xl font-bold mt-6 text-center">Login</h2>
      <form className="mt-6" onSubmit={handleLogin}>
        <div>
          <label className="block text-gray-700 font-semibold">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <hr className="my-6 border-gray-300 w-full" />
          <p className="mt-8">
                        Dont have an account? {}
                        <Link to="/"  className="text-blue-500 hover:text-blue-700 font-semibold" >Signup</Link>
                       
                    </p>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg px-4 py-3 mt-6">
          Login
        </button>
      </form>
    </div>
  </section>
  );
}

export default Login;
