import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { login } from "../services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      authLogin(token);
      navigate("/home");
    } catch (error) {
      alert("Invalid credentials. Try again.");
    }
  };

  return (
    <section className="flex h-screen items-center justify-center bg-slate-800">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-slate-800 text-center text-2xl font-extrabold">KanBan</h1>
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
            Don't have an account? <Link to="/" className="text-slate-500 hover:text-slate-700 font-semibold">Signup</Link>
          </p>
          <button type="submit" className="w-full bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-lg px-4 py-3 mt-6">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
