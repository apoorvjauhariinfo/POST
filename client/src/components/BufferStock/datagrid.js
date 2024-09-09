import * as React from "react";
import PopupMessage from "../PopupMessage/PopupMessage.js";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import "./home.css";
import axios from "axios";
import { useState, useEffect } from "react";

function createData(
  name,
  type,
  batchno,
  manufacturer,
  category,
  unitcost,
  totalquantity,
  emergencytype,
  stockId,
  productId
) {
  return {
    name,
    type,
    batchno,
    manufacturer,
    category,
    unitcost,
    totalquantity,
    emergencytype,
    stockId,
    productId,
  };
}

function BufferStock() {
  const [rows, setRows] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null); // To store selected stock and product
  const [quantity, setQuantity] = useState(0); // Store the entered quantity
  // const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogMessage,setDialogMessage] = useState("");
  const fulldate = new Date().toLocaleDateString();
  const hospitalid = localStorage.getItem("hospitalid");

  const handleOpenDialog = (stock, product) => {
    setSelectedStock({ stockId: stock, productId: product });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setQuantity(0); // Reset quantity after dialog close
  };
  const handleDialogOpen = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
  };

  const handleOrderClick = async () => {
    if (!selectedStock || quantity <= 0) {
      handleDialogOpen("Please enter a valid quantity.");
      return;
    }

    console.log(`Order button clicked for stock ID: ${selectedStock.stockId}, product ID: ${selectedStock.productId}, quantity: ${quantity}`);

    const history = {
      hospitalid: hospitalid,
      date: fulldate,
      productid: selectedStock.productId,
      quantity: Number(quantity),
      type: "Order",
      remark: selectedStock.stockId.toString(),
    };

    try {
      const historyresponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}posthistory`,
        history
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStockAndProductData = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks/buffervalue/details/hospital/${hospitalid}`;
      const { data } = await axios.get(url);
      setStocks(data);

      const newRows = data.map((stock) =>
        createData(
          stock.productDetails.name,
          stock.productDetails.producttype,
          stock.batchno,
          stock.productDetails.manufacturer,
          stock.productDetails.category,
          stock.unitcost,
          stock.totalquantity,
          stock.productDetails.emergencytype,
          stock._id,
          stock.productDetails._id
        )
      );
      setRows(newRows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStockAndProductData();
  }, []);

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
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      fontSize: '2.5rem',
                      fontWeight: 'bold',
                      color: 'black',
                      padding: '10px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    Buffer Stock
                  </Typography>

                  {rows.length === 0 ? (
                    <Typography variant="h6" align="center">
                      Loading Stocks
                    </Typography>
                  ) : (
                    <TableContainer
                      component={Paper}
                      className="table"
                      style={{ overflowX: 'hidden' }}
                    >
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            {/* Table Headers */}
                            <TableCell align="center">NAME</TableCell>
                            <TableCell align="center">TYPE</TableCell>
                            <TableCell align="center">BATCH NO</TableCell>
                            <TableCell align="center">MANUFACTURER</TableCell>
                            <TableCell align="center">CATEGORY</TableCell>
                            <TableCell align="center">UNIT COST</TableCell>
                            <TableCell align="center">STOCK LEFT</TableCell>
                            <TableCell align="center">EMERGENCY TYPE</TableCell>
                            <TableCell align="center">ACTIONS</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                              <TableRow key={row.name}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{row.batchno}</TableCell>
                                <TableCell align="center">{row.manufacturer}</TableCell>
                                <TableCell align="center">{row.category}</TableCell>
                                <TableCell align="center">{row.unitcost}</TableCell>
                                <TableCell align="center">{row.totalquantity}</TableCell>
                                <TableCell align="center">{row.emergencytype}</TableCell>
                                <TableCell align="center">
                                  <Button
                                    variant="contained"
                                    onClick={() => handleOpenDialog(row.stockId, row.productId)}
                                  >
                                    Order
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  {rows.length > 0 && (
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15]}
                      component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Dialog for quantity input */}
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
      {
  openDialog && <PopupMessage message={dialogMessage} visibility={openDialog} />
}

    </main>
  );
}

export default BufferStock;
