import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TablePagination,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import "./home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { columnDefinations } from "./columsDefination";
import { GridRowEditStopReasons } from "@mui/x-data-grid";
import DataTable, { TableFilterBtn } from "../UI/DataTable";
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
    emergencytype,
  };
}

function BufferStock() {
  const [rows, setRows] = useState([]);

  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    producttype: true,
    batchno: true,
    manufacturer: true,
    category: true,
    unitcost: true,
    totalquantity: true,
    emergencytype: true,
    type: true,
  });
  const hospitalid = localStorage.getItem("hospitalid");

  const getStockAndProductData = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks/buffervalue/details/hospital/${hospitalid}`;
      const { data } = await axios.get(url);

      // Create rows from stocks and set them in the state
      const newRows = data.map((stock) =>
        createData(
          stock._id,
          stock.productDetails.name,
          stock.productDetails.producttype,
          stock.batchno,
          stock.productDetails.manufacturer,
          stock.productDetails.category,
          stock.unitcost,
          stock.totalquantity,
          stock.productDetails.emergencytype,
        ),
      );
      setRows(newRows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStockAndProductData();
  }, []);

  const columns = columnDefinations
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
        selectedData.push([
          row.name,
          row.type,
          row.batchno,
          row.manufacturer,
          row.category,
          row.unitcost,
          row.totalquantity,
          row.emergencytype,
        ]);
      }
    }
  }

  const headers = [
    "Name",
    "Type",
    "Batch no",
    "Manufacturer",
    "Category",
    "Unit cost",
    "Total quantity",
    "Emergency type",
  ];

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
                  <Typography
                    variant="h4"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "20px",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "black",
                      padding: "10px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    Buffer Stock
                  </Typography>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <TableFilterBtn
                      anchorEl={columnAnchorEl}
                      onClose={handleColumnClose}
                      onClick={handleColumnClick}
                      columnDefinitions={columnDefinations}
                      visibleColumns={visibleColumns}
                      onChange={toggleColumnVisibility}
                    />
                    <ExportBtn
                      rows={selectedData}
                      isSelected={true}
                      headers={headers}
                      fileName="Buffer_stock"
                    />
                  </Stack>
                  <DataTable
                    rows={rows}
                    columns={columns}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    onRowsSelectionHandler={onRowsSelectionHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Dialog for quantity input */}
      {/* <Dialog open={openDialog} onClose={handleCloseDialog}> */}
      {/*   <DialogTitle>Enter Quantity for Order</DialogTitle> */}
      {/*   <DialogContent> */}
      {/*     <TextField */}
      {/*       autoFocus */}
      {/*       margin="dense" */}
      {/*       id="quantity" */}
      {/*       label="Quantity" */}
      {/*       type="number" */}
      {/*       fullWidth */}
      {/*       value={quantity} */}
      {/*       onChange={(e) => setQuantity(e.target.value)} */}
      {/*     /> */}
      {/*   </DialogContent> */}
      {/*   <DialogActions> */}
      {/*     <Button onClick={handleCloseDialog} color="secondary"> */}
      {/*       Cancel */}
      {/*     </Button> */}
      {/*     <Button onClick={handleOrderClick} color="primary"> */}
      {/*       Confirm */}
      {/*     </Button> */}
      {/*   </DialogActions> */}
      {/* </Dialog> */}
    </main>
  );
}

export default BufferStock;
