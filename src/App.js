import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import AdminDashboard from "./Admin/Dashboard/Dashboard";
import TotalHospital from "./Admin/TotalHospital/TotalHospital";
import NewRegistration from "./Admin/NewRegistration/NewRegistration.js";
import BufferStockSema from "./Admin/BufferStockSema/BufferStockSema.js";
import StockOutSema from "./Admin/StockOutSema/StockOutSema.js";
import Login from "./Login/Login";
import AdminLogin from "./Admin/Login/adminlogin.js";

import "bootstrap/dist/css/bootstrap.min.css"
import UserRegistration from "./UserRegistration/UserRegistration";
import { Route, Routes, Navigate } from "react-router-dom";
import EmailVerify from "./EmailVerify/emailverify";
import EnterOtp from "./EnterOtp/enterotp";
import datagrid from "./Reports/datagrid"
import FullFeaturedCrudGrid from "./Reports/datagrid";
import HospitalRegistration from "./HospitalRegistration/HospitalRegistration";
import StockEntryScreen from "./StockEntry/StockEntryScreen";
import StockIssueScreen from "./StockIssue/StockIssueScreen";
import ProductEntryScreen from "./ProductEntry/ProductEntryScreen";
import AddDepartment from "./AddDepartmentNew/AddDepartment"
import ReportScreen from "./Reports/ReportScreen";
import AddUserScreen from "./AddUser/AddUserScreen";
import TotalProduct from "./TotalProduct/TotalProduct";
import AvailaibleProduct from "./AvailaibleProduct/Availaible Product";
import BufferStock from "./BufferStock/BufferStock";
import StockOut from "./StockOut/StockOut";



function App() {
  const user = localStorage.getItem("id");
  const admin = localStorage.getItem("adminid")

  return (
    <Routes>
      //Hospital Routes
    {user == null && <Route path="/" exact element={<Login />} />}
    {user != null && <Route path="/" exact element={<Dashboard />} /> }
    {user == null &&<Route path="/signup" exact element={<UserRegistration />} />}
    {user != null &&<Route path="/verify" exact element={<EnterOtp />} />}
    {user == null &&<Route path="/login" exact element={<Login />} />}
    {user != null &&<Route path="/stockentry" exact element={<StockEntryScreen />} />}
    {user != null &&<Route path="/stockissue" exact element={<StockIssueScreen />} />}
    {user != null &&<Route path="/productentry" exact element={<ProductEntryScreen />} />}
    {user != null &&<Route path="/adddepartmentnew" exact element={<AddDepartment />} />}
    {user != null &&<Route path="/adduser" exact element={<AddUserScreen />} />}
    {user != null &&<Route path="/totalproduct" exact element={<TotalProduct />} />}
    {user != null &&<Route path="/availaibleproduct" exact element={<AvailaibleProduct />} />}
    {user != null &&<Route path="/bufferstock" exact element={<BufferStock />} />}
    {user != null &&<Route path="/stockout" exact element={<StockOut />} />}
    {user != null &&<Route path="/reports" exact element={<ReportScreen />} />}
    {user != null &&<Route path="/registerhospital" exact element={<HospitalRegistration />} />}
    {user == null && <Route path="/users/:id/verify/:token" element={<EmailVerify />} />}

    //Admin Routes
    {admin != null && user == null && <Route path="/" exact element={<Login />} />}
    {admin != null && user == null && <Route path="/adminlogin" exact element={<AdminLogin />} />}
    {admin != null && user == null && <Route path="/admindashboard" exact element={<AdminDashboard />} />}
    {admin != null && user == null && <Route path="/totalhospital" exact element={<TotalHospital />} />}
    {admin != null && user == null && <Route path="/newregistration" exact element={<NewRegistration />} />}
    {admin != null && user == null && <Route path="/bufferstocksema" exact element={<BufferStockSema />} />}
    {admin != null && user == null && <Route path="/stockoutsema" exact element={<StockOutSema />} />}
    





  </Routes>
  );
}
export default App;