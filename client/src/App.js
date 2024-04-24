import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard.js";
import AdminDashboard from "./components/Admin/Dashboard/Dashboard.js";
import TotalHospital from "./components/Admin/TotalHospital/TotalHospital.js";
import NewRegistration from "./components/Admin/NewRegistration/NewRegistration.js";
import BufferStockSema from "./components/Admin/BufferStockSema/BufferStockSema.js";
import StockOutSema from "./components/Admin/StockOutSema/StockOutSema.js";
import Login from "./components/Login/Login.js";
import AdminLogin from "./components/Admin/Login/adminlogin.js";

import "bootstrap/dist/css/bootstrap.min.css";
import UserRegistration from "./components/UserRegistration/UserRegistration.js";
import { Route, Routes, Navigate } from "react-router-dom";
import EmailVerify from "./components/EmailVerify/emailverify.js";
import EnterOtp from "./components/EnterOtp/enterotp.js";
import datagrid from "./components/Reports/datagrid.js";
import FullFeaturedCrudGrid from "./components/Reports/datagrid.js";
import HospitalRegistration from "./components/HospitalRegistration/HospitalRegistration.js";
import StockEntryScreen from "./components/StockEntry/StockEntryScreen.js";
import StockIssueScreen from "./components/StockIssue/StockIssueScreen.js";
import ProductEntryScreen from "./components/ProductEntry/ProductEntryScreen.js";
import AddDepartment from "./components/AddDepartmentNew/AddDepartment.js";
import ReportScreen from "./components/Reports/ReportScreen.js";
import AddUserScreen from "./components/AddUser/AddUserScreen.js";
import TotalProduct from "./components/TotalProduct/TotalProduct.js";
import AvailaibleProduct from "./components/AvailaibleProduct/Availaible Product.js";
import BufferStock from "./components/BufferStock/BufferStock.js";
import StockOut from "./components/StockOut/StockOut.js";

function App() {
  const user = localStorage.getItem("id");
  const admin = localStorage.getItem("adminid");

  return (
    <Routes>
      //Hospital Routes
      {user == null && <Route path="/" exact element={<Login />} />}
      {user != null && <Route path="/" exact element={<Dashboard />} />}
      {user == null && (
        <Route path="/signup" exact element={<UserRegistration />} />
      )}
      {user != null && <Route path="/verify" exact element={<EnterOtp />} />}
      {user == null && <Route path="/login" exact element={<Login />} />}
      {user != null && (
        <Route path="/stockentry" exact element={<StockEntryScreen />} />
      )}
      {user != null && (
        <Route path="/stockissue" exact element={<StockIssueScreen />} />
      )}
      {user != null && (
        <Route path="/productentry" exact element={<ProductEntryScreen />} />
      )}
      {user != null && (
        <Route path="/adddepartmentnew" exact element={<AddDepartment />} />
      )}
      {user != null && (
        <Route path="/adduser" exact element={<AddUserScreen />} />
      )}
      {user != null && (
        <Route path="/totalproduct" exact element={<TotalProduct />} />
      )}
      {user != null && (
        <Route
          path="/availaibleproduct"
          exact
          element={<AvailaibleProduct />}
        />
      )}
      {user != null && (
        <Route path="/bufferstock" exact element={<BufferStock />} />
      )}
      {user != null && <Route path="/stockout" exact element={<StockOut />} />}
      {user != null && (
        <Route path="/reports" exact element={<ReportScreen />} />
      )}
      {user != null && (
        <Route
          path="/registerhospital"
          exact
          element={<HospitalRegistration />}
        />
      )}
      {user == null && (
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      )}
      //Admin Routes
      {admin != null && user == null && (
        <Route path="/" exact element={<Login />} />
      )}
      {admin != null && user == null && (
        <Route path="/adminlogin" exact element={<AdminLogin />} />
      )}
      {admin != null && user == null && (
        <Route path="/admindashboard" exact element={<AdminDashboard />} />
      )}
      {admin != null && user == null && (
        <Route path="/totalhospital" exact element={<TotalHospital />} />
      )}
      {admin != null && user == null && (
        <Route path="/newregistration" exact element={<NewRegistration />} />
      )}
      {admin != null && user == null && (
        <Route path="/bufferstocksema" exact element={<BufferStockSema />} />
      )}
      {admin != null && user == null && (
        <Route path="/stockoutsema" exact element={<StockOutSema />} />
      )}
    </Routes>
  );
}
export default App;
