import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminDashboard from "./components/Admin/Dashboard/Dashboard";
import TotalHospital from "./components/Admin/TotalHospital/TotalHospital";
import NewRegistration from "./components/Admin/NewRegistration/NewRegistrationScreen.js";
import BufferStockSema from "./components/Admin/BufferStockSema/BufferStockSema.js";
import StockOutSema from "./components/Admin/StockOutSema/StockOutSema.js";
import Login from "./components/Login/Login";
import AdminLogin from "./components/Admin/Login/adminlogin.js";

import "bootstrap/dist/css/bootstrap.min.css";
import UserRegistration from "./components/UserRegistration/UserRegistration";
import { Route, Routes, Navigate } from "react-router-dom";
import EmailVerify from "./components/EmailVerify/emailverify";
import EnterOtp from "./components/EnterOtp/enterotp";
import datagrid from "./components/Reports/datagrid";
import FullFeaturedCrudGrid from "./components/Reports/datagrid";
import HospitalRegistration from "./components/HospitalRegistration/HospitalRegistration";
import StockEntryScreen from "./components/StockEntry/StockEntryScreen";
import StockIssueScreen from "./components/StockIssue/StockIssueScreen";
import ProductEntryScreen from "./components/ProductEntry/ProductEntryScreen";
import ProductEditScreen from "./components/ProductEdit/ProductEditScreen";

import AddDepartment from "./components/AddDepartmentNew/AddDepartment";
import ReportScreen from "./components/Reports/ReportScreen";
//import AddUserScreen from "./components/AddUser/AddUserScreen";
import TotalProduct from "./components/TotalProduct/TotalProduct";
import AvailaibleProduct from "./components/AvailaibleProduct/AvailaibleProduct.js";
import BufferStock from "./components/BufferStock/BufferStock";
import StockOut from "./components/StockOut/StockOut";
import EditAccount from "./components/EditAccount/EditAccount.js";
import EditHospital from "./components/EditHospital/EditHospital.js";
import ManageDepartment from "./components/ManageDepartment/ManageDepartment";
import AddUserScreen from "./components/AddUser/AddUserScreen.js";
import AddAdminScreen from "./components/Admin/AddAdmin/AddAdminScreen.js";
import Acceptance from "./components/InventoryManagerPortal/Acceptance/Acceptance.js";
import AdminAcceptance from "./components/Admin/Acceptance/AdminAcceptance.js";
import RequestStatus from "./components/Admin/RequestStatus/RequestStatusScreen.js";
import RequestStatusScreen from "./components/RequestStatus/RequestStatusScreen.js";
import ProductDetailScreen from "./components/ProductDetails/ProductDetailsScreen.js";
import ProductComparisionScreen from "./components/ProductComparision/ProductComparisionScreen.js";
import EditIMDetails from "./components/EditIMDetails/EditIMDetails.js";
import StockIssueTableScreen from "./pages/stockIssued/StockIssueTableScreen";
import StockEntryTableScreen from "./pages/stockEntryScreen/StockEntryTableScreen";
import ViewProductScreen from "./pages/viewProductDetails/ViewProductScreen";

function App() {
  const user = localStorage.getItem("id");
  const admin = localStorage.getItem("adminid");
  const hospitalId = localStorage.getItem("hospitalid");
  const inventoryid = localStorage.getItem("inventorymanagerid");

  return (
    <Routes>
      {/* Routes when only user is registered */}
      {user != null && admin == null && hospitalId == null && (
        <>
          <Route path="/" element={<HospitalRegistration />} />
          <Route path="/verify" element={<EnterOtp />} />
          <Route path="/stockentry" element={<HospitalRegistration />} />
          <Route path="/stockissue" element={<HospitalRegistration />} />
          <Route path="/productentry" element={<HospitalRegistration />} />
          <Route path="/adddepartmentnew" element={<AddDepartment />} />
          <Route path="/adduser" element={<HospitalRegistration />} />
          <Route path="/totalproduct" element={<HospitalRegistration />} />
          <Route path="/availaibleproduct" element={<HospitalRegistration />} />
          <Route path="/bufferstock" element={<HospitalRegistration />} />
          <Route path="/stockout" element={<HospitalRegistration />} />
          <Route path="/reports" element={<HospitalRegistration />} />
          <Route path="/registerhospital" element={<HospitalRegistration />} />
        </>
      )}

      {/* Signup, Login, and verification routes */}
      {user == null && admin == null && hospitalId == null && (
        <>
          <Route path="/signup" element={<UserRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />

          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/inventorymanagers/:id" element={<Acceptance />} />
          <Route path="/admins/:id" element={<AdminAcceptance />} />
        </>
      )}

      {/* Routes when both user and hospital are registered */}
      {user != null && admin == null && hospitalId != null && (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stockentry" element={<StockEntryScreen />} />
          <Route path="/stockissue" element={<StockIssueScreen />} />
          <Route path="/productentry" element={<ProductEntryScreen />} />
          <Route path="/productedit" element={<ProductEditScreen />} />
          <Route path="/productdetails" element={<ProductDetailScreen />} />
          <Route
            path="/productcompare"
            element={<ProductComparisionScreen />}
          />
          <Route path="/adddepartmentnew" element={<AddDepartment />} />
          <Route path="/editaccount" element={<EditAccount />} />
          <Route path="/edithospital" element={<EditHospital />} />
          <Route path="/managedepartment" element={<ManageDepartment />} />
          <Route path="/adduser" element={<AddUserScreen />} />
          <Route path="/requeststatus" element={<RequestStatusScreen />} />
          <Route path="/requeststatus/:id" element={<RequestStatusScreen />} />
          <Route path="/totalproduct" element={<TotalProduct />} />
          <Route path="/availaibleproduct" element={<AvailaibleProduct />} />
          <Route path="/bufferstock" element={<BufferStock />} />
          <Route path="/stockout" element={<StockOut />} />
          <Route path="/totalproductreport" element={<TotalProduct />} />
          <Route
            path="/availaibleproductreport"
            element={<AvailaibleProduct />}
          />
          <Route path="/bufferstockreport" element={<BufferStock />} />
          <Route path="/stockoutreport" element={<StockOut />} />
          <Route path="/stockentryreport" element={<StockEntryTableScreen />} />
          <Route path="/stockissuereport" element={<StockIssueTableScreen />} />
          <Route path="/reports" element={<ReportScreen />} />
          <Route
            path="/viewproductdetails/total/:id"
            element={<ViewProductScreen />}
          />
        </>
      )}

      {/* Admin routes */}
      {admin != null && user == null && hospitalId == null && (
        <>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/addadmin" element={<AddAdminScreen />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/totalhospital" element={<TotalHospital />} />
          <Route path="/newregistration" element={<NewRegistration />} />
          <Route path="/bufferstocksema" element={<BufferStockSema />} />
          <Route path="/stockoutsema" element={<StockOutSema />} />
          <Route path="/requeststatus" element={<RequestStatus />} />
        </>
      )}

      {/* Inventory Manager routes */}
      {admin == null &&
        user != null &&
        hospitalId != null &&
        inventoryid != null && (
          <Route path="/editimdetails" element={<EditIMDetails />} />
        )}
    </Routes>
  );
}
export default App;
