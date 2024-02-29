import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/login";
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




function App() {
  const user = localStorage.getItem("id");

  return (
    <Routes>
    {user != null && <Route path="/" exact element={<Dashboard />} />}
    {user == null && <Route path="/" exact element={<Login />} />}

    <Route path="/signup" exact element={<UserRegistration />} />
    <Route path="/verify" exact element={<EnterOtp />} />
    <Route path="/login" exact element={<Login />} />
    <Route path="/stockentry" exact element={<StockEntryScreen />} />
    <Route path="/stockissue" exact element={<StockIssueScreen />} />
    <Route path="/productentry" exact element={<ProductEntryScreen />} />


    <Route path="/reports" exact element={<FullFeaturedCrudGrid />} />
    <Route path="/registerhospital" exact element={<HospitalRegistration />} />


    
    <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
  </Routes>
  );
}
export default App;