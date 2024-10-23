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
import LoaderOverlay from "../Loader/LoaderOverlay.js";
function createData(
  _id,
  productid,
  name,
  type,
  batchno,
  manufacturer,
  category,
  unitcost,
  emergencytype,
  imname,
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
    emergencytype,
    imname,
  };
}

export default function StockOutTable({ hospitalid }) {
  const [rows, setRows] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null); // To store selected stock and product
  const [quantity, setQuantity] = useState(0); // Store the entered quantity
  const fulldate = new Date().toLocaleDateString();
  let [loading, setLoading] = useState(false);
  // const handleTotal = () => {
  //   window.location = "/totalproduct";
  // };
  // const handleAvailaible = () => {
  //   window.location = "/availaibleproduct";
  // };
  // const handleBuffer = () => {
  //   window.location = "/bufferstock";
  // };
  // const handleStockOut = () => {
  //   window.location = "/stockout";
  // };
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  //
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isImId = localStorage.getItem("inventorymanagerid") !== null;

  const handleOpenDialog = (stock, product) => {
    setSelectedStock({ stockId: stock, productId: product });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setQuantity(0); // Reset quantity after dialog close
  };

  const handleOrderClick = async () => {
    if (!selectedStock || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    console.log(
      `Order button clicked for stock ID: ${selectedStock.stockId}, product ID: ${selectedStock.productId}, quantity: ${quantity}`,
    );

    const history = {
      hospitalid: hospitalid,
      date: fulldate,
      productid: selectedStock.productId,
      quantity: Number(quantity),
      type: "Order",
      remark: selectedStock.stockId.toString(),
    };

    try {
      setLoading(true);
      const historyresponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}posthistory`,
        history,
      );
      setLoading(false);
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
      setLoading(true);
      const historyUrl = `${process.env.REACT_APP_BASE_URL}historybyproductid/${productId}`;
      const { data } = await axios.get(historyUrl);

      const orderHistory = data.documents.filter(
        (entry) => entry.type === "Order",
      );
      setLoading(false);
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
      setLoading(true);
      const url = `${process.env.REACT_APP_BASE_URL}stocks/outvalue/details/hospital/${hospitalid}`;
      const { data } = await axios.get(url);
      setLoading(false);
      // Get the inventory manager ID from localStorage
      const inventoryManagerId = localStorage.getItem("inventorymanagerid");

      let stocksToSet;

      if (inventoryManagerId) {
        // If inventory manager ID exists, filter based on imid
        stocksToSet = data.filter((stock) => stock.imid === inventoryManagerId);
      } else {
        // If inventory manager ID is not present, use the original data
        stocksToSet = data;
      }

      setStocks(stocksToSet);

      // Create rows from stocks and set them in the state
      const newRows = await Promise.all(
        stocksToSet.map(async (stock) => {
          const lastOrder = await fetchLastOrderDetails(stock.productid);
          let a = createData(
            stock._id,
            stock.productDetails?.productid || "",
            stock.productDetails?.name || "", // Add null check for productDetails.name
            stock.productDetails?.producttype || "", // Add null check for productDetails.producttype
            stock.batchno,
            stock.productDetails?.manufacturer || "", // Add null check for productDetails.manufacturer
            stock.productDetails?.category || "", // Add null check for productDetails.category
            stock.unitcost,
            stock.productDetails?.emergencytype || "", // Add null check for productDetails.emergencytyp

            inventoryManagerId ? "" : stock.inventoryManagerDetails.name, // Set to name if inventoryManagerId is null or empty
          );

          // Add actions only if isImId is false (assuming isImId is declared elsewhere)
          if (!isImId) {
            a.actions = {
              onClick: () => handleOpenDialog(stock._id, stock.productid),
              ...lastOrder,
            };
          }

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

  const [visibleColumns, setVisibleColumns] = useState({
    ...(localStorage.getItem("inventorymanagerid") ? {} : { imname: true }),
    name: true,
    manufacturer: true,
    category: true,
    emergencytype: true,
    type: true,
    // actions: isImId ? false : true,
    // unitcost: true,
    // batchno: true,
  });

  let tableColumns = columnDefinations;

  const columns = tableColumns
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
        const a = [];
        Object.keys(visibleColumns).forEach((key) => {
          if (visibleColumns[key]) {
            a.push(row[key]);
          }
        });

        selectedData.push(a);
        // selectedData.push([
        //   row.name,
        //   row.type,
        //   row.batchno,
        //   row.manufacturer,
        //   row.category,
        //   row.unitcost,
        //   row.emergencytype,
        // ]);
      }
    }
  }

  const headerObj = {
    name: "Product",
    // batchno: true,
    manufacturer: "Manufacturer",
    category: "Category",
    // unitcost: true,
    emergencytype: "Emergency type",
    type: "Type",
    imname: "Inventory Manager",
    // actions: isImId ? false : true,
  };

  const headers = [];

  Object.keys(visibleColumns).forEach((key) => {
    if (visibleColumns[key]) {
      headers.push(headerObj[key]);
    }
  });

  console.log(selectedData);

  // if (!isImId) {
  //   headers.push("actions");
  // }

  return (
    <main className="main-container">
      <LoaderOverlay loading={loading} />
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
                      whichPage="stockout"
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
