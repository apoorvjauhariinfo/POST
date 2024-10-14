import "../Dashboard/Dashboard.css";
import StockOutTable from "./StockOutTable";

function StockOut() {
  const hospitalid = localStorage.getItem("hospitalid");

  return <StockOutTable hospitalid={hospitalid} />;
}

export default StockOut;

