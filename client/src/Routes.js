import React from "react";
import { Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from './pages/UserManagement/Login'
import Register from './pages/UserManagement/Register'
import ForgotPassword from './pages/UserManagement/ForgotPassword'
 import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path= "/" element={<Login/>}></Route>
        <Route path= "/register" element={<Register/>}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
