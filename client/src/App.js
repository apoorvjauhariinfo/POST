import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminDashboard from "./components/Admin/Dashboard/Dashboard";
import TotalHospital from "./components/Admin/TotalHospital/TotalHospital";
import NewRegistration from "./components/Admin/NewRegistration/NewRegistrationScreen.js";
import BufferStockSema from "./components/Admin/BufferStockSema/BufferStockSema.js";
import StockOutSema from "./components/Admin/StockOutSema/StockOutSema.js";
import Login from "./components/Login/Login";
import AdminLogin from "./components/Admin/Login/adminlogin.js";

import "bootstrap/dist/css/bootstrap.min.css"
import UserRegistration from "./components/UserRegistration/UserRegistration";
import { Route, Routes, Navigate } from "react-router-dom";
import EmailVerify from "./components/EmailVerify/emailverify";
import EnterOtp from "./components/EnterOtp/enterotp";
import datagrid from "./components/Reports/datagrid"
import FullFeaturedCrudGrid from "./components/Reports/datagrid";
import HospitalRegistration from "./components/HospitalRegistration/HospitalRegistration";
import StockEntryScreen from "./components/StockEntry/StockEntryScreen";
import StockIssueScreen from "./components/StockIssue/StockIssueScreen";
import ProductEntryScreen from "./components/ProductEntry/ProductEntryScreen";
import ProductEditScreen from "./components/ProductEdit/ProductEditScreen";

import AddDepartment from "./components/AddDepartmentNew/AddDepartment"
import ReportScreen from "./components/Reports/ReportScreen";
//import AddUserScreen from "./components/AddUser/AddUserScreen";
import TotalProduct from "./components/TotalProduct/TotalProduct";
import AvailaibleProduct from "./components/AvailaibleProduct/Availaible Product";
import BufferStock from "./components/BufferStock/BufferStock";
import StockOut from "./components/StockOut/StockOut";
import EditAccount from "./components/EditAccount/EditAccount.js";
import EditHospital from "./components/EditHospital/EditHospital.js";
import ManageDepartment from "./components/ManageDepartment/ManageDepartment";
import AddUserScreen from "./components/AddUser/AddUserScreen.js";
import AddAdminScreen from "./components/Admin/AddAdmin/AddAdminScreen.js";
import Acceptance from "./components/InventoryManagerPortal/Acceptance/Acceptance.js";
import AdminAcceptance from "./components/Admin/Acceptance/AdminAcceptance.js"
import RequestStatus from "./components/Admin/RequestStatus/RequestStatusScreen.js"










function App() {
  const user = localStorage.getItem("id");
  const admin = localStorage.getItem("adminid")
  const hospitalId = localStorage.getItem("hospitalid");

  return (
    <Routes>

      //Only User is Registered.
      {user != null && admin == null && hospitalId == null && <Route path="/" exact element={<HospitalRegistration />} />}
      {user == null && admin == null && hospitalId == null && hospitalId == null && <Route path="/signup" exact element={<UserRegistration />} />}
      {user != null && admin == null && hospitalId == null && <Route path="/verify" exact element={<EnterOtp />} />}
      {user == null && admin == null && hospitalId == null && <Route path="/login" exact element={<Login />} />}
      {user != null && admin == null && hospitalId == null && <Route path="/stockentry" exact element={<HospitalRegistration />} />}
      {user != null && admin == null && hospitalId == null && <Route path="/stockissue" exact element={<HospitalRegistration />} />}
      {user != null && admin == null && hospitalId == null && <Route path="/productentry" exact element={<HospitalRegistration />} />}
      {user != null && admin == null && hospitalId == null && <Route path="/adddepartmentnew" exact element={<AddDepartment />} />}
      {user != null && admin == null && hospitalId == null && <Route path="/adduser" exact element={<HospitalRegistration />} />}
      {user != null && admin == null && hospitalId == null && <Route path="/totalproduct" exact element={<HospitalRegistration />} />}
      {user != null && admin == null && hospitalId == null && <Route path="/availaibleproduct" exact element={<HospitalRegistration />} />}
      {user != null && admin == null && hospitalId == null && <Route path="/bufferstock" exact element={<HospitalRegistration />} />}
      {user != null && admin == null && hospitalId == null && <Route path="/stockout" exact element={<HospitalRegistration />} />}
      {user != null && admin == null && hospitalId == null && <Route path="/reports" exact element={<HospitalRegistration />} />}
      {user != null && admin == null && hospitalId == null && <Route path="/registerhospital" exact element={<HospitalRegistration />} />}
      {user == null && admin == null && hospitalId == null && hospitalId == null && <Route path="/users/:id/verify/:token" element={<EmailVerify />} />}
      {user == null && admin == null && hospitalId == null && hospitalId == null && <Route path="/inventorymanagers/:id" element={<Acceptance />} />}
      {user == null && admin == null && hospitalId == null && hospitalId == null && <Route path="/admins/:id" element={<AdminAcceptance />} />}



      //Both User and Hospital are Registered Routes
      {user == null && admin == null && hospitalId == null && <Route path="/" exact element={<Login />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/" exact element={<Dashboard />} />}
      {user == null && admin == null && hospitalId != null && <Route path="/signup" exact element={<Dashboard />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/verify" exact element={<Dashboard />} />}
      {user == null && admin == null && hospitalId == null && <Route path="/login" exact element={<Login />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/login" exact element={<Dashboard />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/stockentry" exact element={<StockEntryScreen />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/stockissue" exact element={<StockIssueScreen />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/productentry" exact element={<ProductEntryScreen />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/productedit" exact element={<ProductEditScreen />} />}

      {user != null && admin == null && hospitalId != null && <Route path="/adddepartmentnew" exact element={<AddDepartment />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/editaccount" exact element={<EditAccount />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/edithospital" exact element={<EditHospital />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/managedepartment" exact element={<ManageDepartment />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/adduser" exact element={<AddUserScreen />} />}

      {user != null && admin == null && hospitalId != null && <Route path="/totalproduct" exact element={<TotalProduct />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/availaibleproduct" exact element={<AvailaibleProduct />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/bufferstock" exact element={<BufferStock />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/stockout" exact element={<StockOut />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/reports" exact element={<ReportScreen />} />}
      {user != null && admin == null && hospitalId != null && <Route path="/registerhospital" exact element={<Dashboard />} />}
      {user == null && admin == null && hospitalId != null && <Route path="/users/:id/verify/:token" element={<EmailVerify />} />}
      {/* {user == null && admin == null && hospitalId == null && hospitalId == null && <Route path="/inventorymanagers/:id" element={<Acceptance />} />} */}


    //Admin Routes When Both User and Hospital ID are null.
      {admin == null && user == null && hospitalId == null && <Route path="/" exact element={<Login />} />}
      {admin != null && user == null && hospitalId == null && <Route path="/" exact element={<AdminDashboard />} />}
      {admin != null && user == null && hospitalId == null && <Route path="/addadmin" exact element={<AddAdminScreen />} />}

      {admin == null && user == null && hospitalId == null && <Route path="/adminlogin" exact element={<AdminLogin />} />}
      {admin != null && user == null && hospitalId == null && <Route path="/adminlogin" exact element={<AdminDashboard />} />}
      {admin != null && user == null && hospitalId == null && <Route path="/login" exact element={<AdminDashboard />} />}
      {admin != null && user == null && hospitalId == null && <Route path="/admindashboard" exact element={<AdminDashboard />} />}
      {admin != null && user == null && hospitalId == null && <Route path="/totalhospital" exact element={<TotalHospital />} />}
      {admin != null && user == null && hospitalId == null && <Route path="/newregistration" exact element={<NewRegistration />} />}
      {admin != null && user == null && hospitalId == null && <Route path="/bufferstocksema" exact element={<BufferStockSema />} />}
      {admin != null && user == null && hospitalId == null && <Route path="/stockoutsema" exact element={<StockOutSema />} />}
      {admin != null && user == null && hospitalId == null && <Route path="/requeststatus" exact element={<RequestStatus />} />}







    </Routes>
  );
}
export default App;