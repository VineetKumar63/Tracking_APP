
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import SignUp from "./Pages/Dashboard/SignUp.jsx"
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Dashboard/Login";
import Otp from "./Pages/Dashboard/Otp";


function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/otp" element={<Otp/>}/>
      </Routes>
    </>
  );
}

export default App;
