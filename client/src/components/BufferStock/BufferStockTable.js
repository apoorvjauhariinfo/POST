import * as React from "react";
import {
  Typography,
  Stack,
  ButtonBase,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
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
  productid,
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
    productid,
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

export default function BufferStockTable({ hospitalid }) {
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // Dialog state
  const [selectedStock, setSelectedStock] = useState(null); // State to store selected stock
  const [quantity, setQuantity] = useState(0); // Quantity state
  const [lastOrderDates, setLastOrderDates] = useState({}); // State to store last order details

  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    // batchno: true,
    manufacturer: true,
    category: true,
    // unitcost: true,
    totalquantity: true,
    emergencytype: true,
    type: true,
  });

  // Fetch last order details
  const fetchLastOrderDetails = async (productId) => {
    try {
      const historyUrl = `${process.env.REACT_APP_BASE_URL}historybyproductid/${productId}`;
      const { data } = await axios.get(historyUrl);

      const orderHistory = data.documents.filter(
        (entry) => entry.type === "Order",
      );

      if (orderHistory.length > 0) {
        const lastOrder = orderHistory[orderHistory.length - 1]; // Assuming the data is sorted by date

        // Convert date from mm/dd/yyyy to dd/mm/yyyy
        const [month, day, year] = lastOrder.date.split("/");
        const formattedDate = `${day}/${month}/${year}`;

        return {
          date: formattedDate,
          quantity: lastOrder.quantity,
        };
      }

      return null; // No orders found with type "Order"
    } catch (error) {
      console.error("Error fetching last order details: ", error);
      return null;
    }
  };

  const getStockAndProductData = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks/buffervalue/details/hospital/${hospitalid}`;
      const { data } = await axios.get(url);

      // Create rows from stocks and set them in the state
      const newRows = data.map((stock) =>
        createData(
          stock._id,
          stock.productDetails._id,
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
  // Fetch last order details for all rows when the rows are updated
  useEffect(() => {
    const fetchAllLastOrderDetails = async () => {
      const newLastOrderDates = {};

      for (const row of rows) {
        const lastOrderDetails = await fetchLastOrderDetails(row.productid);
        if (lastOrderDetails) {
          newLastOrderDates[row.productid] = lastOrderDetails.date;
        }
      }

      setLastOrderDates(newLastOrderDates);
    };

    if (rows.length > 0) {
      fetchAllLastOrderDetails();
    }
  }, [rows]);

  const columns = columnDefinations.concat([
    {
      field: "actions",
      headerName: "ACTIONS",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog(params.row)}
          >
            Order
          </Button>
          {lastOrderDates[params.row.productid] && (
            <Typography
              variant="caption"
              style={{ color: "red", marginTop: "5px" }} // Red color for the date, margin for spacing
            >
              Last Order: {lastOrderDates[params.row.productid]}
            </Typography>
          )}
        </div>
      ),
      cellClassName: "custom-row", // Apply the custom class here
    },
  ]);

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
  // Handlers for dialog and order functionality
  const handleOpenDialog = (row) => {
    setSelectedStock(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStock(null);
  };

  const handleOrderClick = async () => {
    if (!selectedStock) return;

    const fulldate = new Date().toLocaleDateString("en-US"); // Format the date to MM/DD/YYYY
    const history = {
      hospitalid: hospitalid,
      date: fulldate,
      productid: selectedStock.productid, // Use selected productId
      quantity: quantity,
      type: "Order",
      remark: selectedStock._id.toString(),
    };

    try {
      const historyresponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}posthistory`,
        history,
      );
      console.log("History posted successfully: ", historyresponse.data);
      handleCloseDialog();
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
    // Close the dialog after the order
    setOpenDialog(false);
  };

  const selectedData = [];
  if (count !== 0 && count.size !== 0) {
    for (const entry of count.values()) {
      const row = rows.find((r) => r._id === entry);
      if (row) {
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
                    rowHeight={60} // Adjust this value as needed
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    onRowsSelectionHandler={onRowsSelectionHandler}
                    whichPage="buffer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Enter Quantity for Order</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleOrderClick} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
