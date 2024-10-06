import * as React from "react";
import { Typography, Stack } from "@mui/material";
// import Button from "@mui/material/Button";
import "./home.css";

import axios from "axios";

import { useState } from "react";
import DataTable, { TableFilterBtn } from "../UI/DataTable";
import { columnDefinitions } from "./columnDefinations";
import { GridRowEditStopReasons } from "@mui/x-data-grid";
import ExportBtn from "../Admin/TotalHospital/ui/ExportBtn";

function createData(
  _id,
  name,
  type,
  batchno,
  manufacturer,
  category,
  unitcost,
  totalquantity,
  gst,
  grandtotal,
  emergencytype,
) {
  return {
    _id,
    name,
    type,
    batchno,
    manufacturer,
    category,
    unitcost,
    totalquantity,
    gst,
    grandtotal,
    emergencytype,
  };
}

export default function AvailaibleProductTable({ hospitalid }) {
  const [rows, setRows] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    producttype: true,
    batchno: true,
    manufacturer: true,
    category: true,
    unitcost: true,
    totalquantity: true,
    grandtotal: true,
    emergencytype: true,
    type: true,
    gst: true,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStockAndProductData = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}aggregatedstocks/${hospitalid}`;
      const { data } = await axios.get(url);
      setStocks(data.documents);

      // Create rows from stocks and set them in the state
      const newRows = data.documents.map((stock) =>
        createData(
          stock._id,
          stock.productDetails.name,
          stock.productDetails.producttype,
          stock.batchno,
          stock.productDetails.manufacturer,
          stock.productDetails.category,
          stock.unitcost,
          stock.totalquantity,
          stock.gst,
          stock.grandtotal,
          stock.productDetails.emergencytype,
        ),
      );
      setRows(newRows);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getStockAndProductData();
  }, []);

  const columns = columnDefinitions
    .filter((col) => visibleColumns[col.field])
    .map((col) => ({
      ...col,
      headeralign: col.headeralign || "left",
      width: col.width || 150,
      align: col.align || "left",
      editable: col.editable !== undefined ? col.editable : true,
    }));

  const [rowModesModel, setRowModesModel] = useState({});
  const [count, setCount] = useState(0);
  const [columnAnchorEl, setColumnAnchorEl] = useState(null);

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
    return updatedRow;
  };

  const onRowsSelectionHandler = (id) => {
    const selectedIDs = new Set(id);
    const selectedRowsData = id.map((id) => rows.find((row) => row._id === id));
    setCount(selectedIDs);
  };

  const handleColumnClose = () => {
    setColumnAnchorEl(null);
  };

  const handleColumnClick = (event) => {
    setColumnAnchorEl(event.currentTarget);
  };

  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const selectedData = [];
  if (count !== 0 && count.size !== 0) {
    for (const entry of count.values()) {
      const row = rows.find((r) => r._id === entry);
      if (row) {
        // selectedData.push([
        //   row.name,
        //   row.type,
        //   row.batchno,
        //   row.manufacturer,
        //   row.category,
        //   row.unitcost,
        //   row.totalquantity,
        //   row.gst,
        //   row.grandtotal,
        //   row.emergencytype,
        // ]);
        const a = [];
        Object.keys(visibleColumns).forEach((key) => {
          if (visibleColumns[key]) {
            a.push(row[key]);
          }
        });

        selectedData.push(a);
      }
    }
  }

  // const headers = [
  //   "Name",
  //   "Type",
  //   "Batch no",
  //   "Manufacturer",
  //   "Category",
  //   "Unit cost",
  //   "Total quantity",
  //   "GST",
  //   "Grandtotal",
  //   "Emergency type",
  // ];

  const headers = [];

  Object.keys(visibleColumns).forEach((key) => {
    if (visibleColumns[key]) {
      headers.push(key);
    }
  });

  return (
    <main className="main-container">
      <div>
        <section
          className="p-5 w-100"
          style={{
            backgroundColor: "#eeeee",
            borderRadius: ".5rem .5rem 0 0",
          }}
        >
          <div className="row">
            <div className="col">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-3">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        marginBottom: "20px",
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        color: "black",
                        padding: "10px",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                      }}
                    >
                      Available Products
                    </Typography>
                  </div>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <TableFilterBtn
                      anchorEl={columnAnchorEl}
                      onClose={handleColumnClose}
                      onClick={handleColumnClick}
                      columnDefinitions={columnDefinitions}
                      visibleColumns={visibleColumns}
                      onChange={toggleColumnVisibility}
                    />
                    <ExportBtn
                      rows={selectedData}
                      isSelected={true}
                      headers={headers}
                      fileName="Available_product"
                    />
                  </Stack>
                  <DataTable
                    rows={rows}
                    columns={columns}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    // EditToolbar={() => {}}
                    // setRowModesModel={setRowModesModel}
                    // setRows={setRows}
                    onRowsSelectionHandler={onRowsSelectionHandler}
                    whichPage="avail"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
