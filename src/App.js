import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/login";
import "bootstrap/dist/css/bootstrap.min.css"
import UserRegistration from "./UserRegistration/UserRegistration";
import { Route, Routes, Navigate } from "react-router-dom";
import EmailVerify from "./EmailVerify/emailverify";


function App() {
 
  const user = localStorage.getItem("token");

  return (
    <Routes>
    {user != null && <Route path="/" exact element={<Dashboard />} />}
    {user == null && <Route path="/" exact element={<Login />} />}

    <Route path="/signup" exact element={<UserRegistration />} />
    <Route path="/login" exact element={<Login />} />
    
    <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
  </Routes>
  );
}
export default App;