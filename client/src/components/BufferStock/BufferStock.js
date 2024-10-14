import "../Dashboard/Dashboard.css";

import BufferStockTable from "./BufferStockTable";

function BufferStock() {
  const hospitalid = localStorage.getItem("hospitalid");

  return <BufferStockTable hospitalid={hospitalid} />;
}

export default BufferStock;

