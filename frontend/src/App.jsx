import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { AuthProvider } from "./context/AuthContext";
import Activity_Log from "./pages/Activity_Log";
function App() {
  const token = localStorage.getItem("token"); 

  return (
    <div className="bg-slate-900 h-[100vh] w-screen overflow-x-hidden">
      <AuthProvider>
      <Router>
        <Routes>
      
        <Route path="/" element={<Signup />} />
          <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />

        
          <Route path="/login" element={<Login />} />
          
       <Route path="/log" element={<Activity_Log/>} />
      
          <Route path="*" element={<h1 className="text-center text-red-500">404 - Page Not Found</h1>} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
