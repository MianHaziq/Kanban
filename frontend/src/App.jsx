import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Activity_Log from "./pages/Activity_Log";
import { useContext } from "react";

function App() {
  return (
    <div className="bg-slate-900 h-[100vh] w-screen overflow-x-hidden">
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </div>
  );
}

function AppRoutes() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={token ? <Navigate to="/home" /> : <Login />} />
      <Route path="/log" element={token ? <Activity_Log /> : <Navigate to="/login" />} />
      <Route path="*" element={<h1 className="text-center text-red-500">404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
