import * as React from "react";
import {
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import Button from "@mui/material/Button";
import "./home.css";

import axios from "axios";

import { useState } from "react";
import DataTable, { TableFilterBtn } from "../UI/DataTable";
import { columnDefinations } from "./columnDefination";
import { GridRowEditStopReasons } from "@mui/x-data-grid";
import ExportBtn from "../Admin/TotalHospital/ui/ExportBtn";

function createData(
  _id,
  productid,
  name,
  type,
  manufacturer,
  category,
  emergencytype,
) {
  return {
    _id,
    productid,
    name,
    type,
    manufacturer,
    category,
    emergencytype,
  };
}

function BufferStock() {
  const [rows, setRows] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null); // To store selected stock and product
  const [quantity, setQuantity] = useState(0); // Store the entered quantity
  const [lastOrderDates, setLastOrderDates] = useState({}); // State to store last order details

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const hospitalid = localStorage.getItem("hospitalid");
  const isImId = localStorage.getItem("inventorymanagerid") !== null;

  const handleOpenDialog = (row) => {
    setSelectedStock(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStock(null);
  };

  const handleOrderClick = async () => {
    if (!selectedStock || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    console.log(
      `Order button clicked for stock ID: ${selectedStock.stockId}, product ID: ${selectedStock.productId}, quantity: ${quantity}`,
    );

    const fulldate = new Date().toLocaleDateString("en-US"); // Format the date to MM/DD/YYYY

    const history = {
      hospitalid: hospitalid,
      date: fulldate,
      productid: selectedStock.productid,
      quantity: Number(quantity),
      type: "Order",
      remark: selectedStock._id.toString(),
    };

    try {
      const historyresponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}posthistory`,
        history,
      );
      console.log("History posted successfully: ", historyresponse.data);
      handleCloseDialog(); // Close dialog after successful submission
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data); // Log server-side errors
      } else if (error.request) {
        console.error("No response received from server:", error.request); // No response
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

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
      const url = `${process.env.REACT_APP_BASE_URL}stocks/outvalue/details/hospital/${hospitalid}`;
      const { data } = await axios.get(url);
      setStocks(data);

      // Create rows from stocks and set them in the state
      const newRows = await Promise.all(
        data.map(async (stock) => {
          const lastOrder = await fetchLastOrderDetails(stock.productDetails._id);
          console.log(lastOrder);
          let a = createData(
            stock._id,
            stock.productDetails._id,
            stock.productDetails.name,
            stock.productDetails.producttype,
            stock.productDetails.manufacturer,
            stock.productDetails.category,
            stock.productDetails.emergencytype,
          );

         
            a.actions = {
              onClick: () => handleOpenDialog(stock._id, stock.productDetails._id),
              ...lastOrder,
            };
          

          return a;
        }),
      );
      setRows(newRows);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getStockAndProductData();
  }, []);
  React.useEffect(() => {
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

  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    producttype: true,
    batchno: true,
    manufacturer: true,
    category: true,
    unitcost: true,
    emergencytype: true,
    type: true,
    // actions: isImId ? false : true,
  });

  let tableColumns = columnDefinations;

  const columns = columnDefinations
  .filter((col) => visibleColumns[col.field])
  .map((col) => ({
    ...col,
    headeralign: col.headeralign || "left",
    width: col.width || 150,
    align: col.align || "left",
    editable: col.editable !== undefined ? col.editable : true,
  }))
  .concat([
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
              style={{ color: 'red', marginTop: '5px' }} // Red color for the date, margin for spacing
            >
              Last Order: {lastOrderDates[params.row.productid]}
            </Typography>
          )}
        </div>
      ),
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

  const selectedData = [];
  if (count !== 0 && count.size !== 0) {
    for (const entry of count.values()) {
      const row = rows.find((r) => r._id === entry);
      if (row) {
        selectedData.push([
          row.name,
          row.type,
          row.manufacturer,
          row.category,
          row.emergencytype,
        ]);
      }
    }
  }

  const headers = [
    "name",
    "type",
    "manufacturer",
    "category",
    "emergencytype",
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
                      Stock Out
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-end"
                    >
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
                        fileName="Stockout_Report"
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

export default BufferStock;
