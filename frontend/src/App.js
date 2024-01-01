import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import Otp from "./Pages/Dashboard/Otp";
import "./Styles/mix.css"
import Login from "./Pages/Dashboard/Login";
import SignUP from "./Pages/Dashboard/SignUp";
import Dashboard from "./Pages/Dashboard/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/otp" element={<Otp />} />
      </Routes>

  );
}

export default App;
