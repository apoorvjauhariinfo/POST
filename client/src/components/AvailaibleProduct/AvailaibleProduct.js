import "../Dashboard/Dashboard.css";
import AvailaibleProductTable from "./AvailableProductTable";

function AvailaibleProduct() {
  const hospitalid = localStorage.getItem("hospitalid");
  return <AvailaibleProductTable hospitalid={hospitalid} />;
}

export default AvailaibleProduct;

