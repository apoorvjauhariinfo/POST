import "../Dashboard/Dashboard.css";

import TotalProductTable from "./TotalProductTable";

function TotalProduct() {
  const hospitalid = localStorage.getItem("hospitalid");

  return <TotalProductTable hospitalid={hospitalid} />;
}

export default TotalProduct;
