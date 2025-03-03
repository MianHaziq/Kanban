import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";


function App() {
  const token = localStorage.getItem("token"); 

  return (
    <div className="bg-slate-900 h-[100vh] w-screen overflow-x-hidden">
      <Router>
        <Routes>
      
        <Route path="/" element={<Signup />} />
          <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />

        
          <Route path="/login" element={<Login />} />
          
       
      
          <Route path="*" element={<h1 className="text-center text-red-700">404 ErrrroR</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
