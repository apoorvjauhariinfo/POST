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
  TablePagination
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
  emergencytype
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
  };
}

function BufferStock() {
  const [rows, setRows] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const fulldate = new Date().toLocaleDateString();


  const hospitalid = localStorage.getItem("hospitalid");

  const handleTotal = () => {
    window.location = "/totalproduct";
  };
  const handleAvailaible = () => {
    window.location = "/availaibleproduct";
  };
  const handleBuffer = () => {
    window.location = "/bufferstock";
  };
  const handleStockOut = () => {
    window.location = "/stockout";
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Assuming you have this function to create the rows
const createData = (name, type, batchno, manufacturer, category, unitcost, totalquantity, emergencytype, stockId, productId) => {
  return {
    name,
    type,
    batchno,
    manufacturer,
    category,
    unitcost,
    totalquantity,
    emergencytype,
    stockId,    // Ensure stockId is mapped correctly
    productId,  // Ensure productId is mapped correctly
  };
};
  
  const getStockAndProductData = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks/buffervalue/details/hospital/${hospitalid}`;
      const { data } = await axios.get(url);  
      setStocks(data);

      // Create rows from stocks and set them in the state
      const newRows = data.map(stock => 
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
          stock.productDetails._id,
        )
      );
      setRows(newRows);
    
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getStockAndProductData();
  }, []);
  const handleOrderClick = async(stockId, productId) => {
    // Handle order button click
    console.log(`Order button clicked for stock ID: ${stockId}, product ID: ${productId}`);
    const history = {
      hospitalid:hospitalid,
      date: fulldate,
      productid:productId,
      quantity: 100,
      type: "Order",
      remark: stockId.toString(),
    };

    try {
      const historyresponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}posthistory`,
        history
      );
      console.log("History posted successfully: ", historyresponse.data);
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data); // Log server-side errors
      } else if (error.request) {
        console.error("No response received from server:", error.request); // No response
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
    // Add your order handling logic here
  };

 

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
                            <TableCell align="center" style={{
                                  fontWeight: "bold",
                                  color: "#2e718a",
                                  textTransform: "uppercase",
                                  fontSize: "0.9rem",
                                  padding: "10px",
                                }}>NAME</TableCell>
                            <TableCell align="center" style={{
                                  fontWeight: "bold",
                                  color: "#2e718a",
                                  textTransform: "uppercase",
                                  fontSize: "0.9rem",
                                  padding: "10px",
                                }}>TYPE</TableCell>
                            <TableCell align="center" style={{
                                  fontWeight: "bold",
                                  color: "#2e718a",
                                  textTransform: "uppercase",
                                  fontSize: "0.9rem",
                                  padding: "10px",
                                }}>BATCH NO</TableCell>
                            <TableCell align="center" style={{
                                  fontWeight: "bold",
                                  color: "#2e718a",
                                  textTransform: "uppercase",
                                  fontSize: "0.9rem",
                                  padding: "10px",
                                }}>MANUFACTURER</TableCell>
                            <TableCell align="center" style={{
                                  fontWeight: "bold",
                                  color: "#2e718a",
                                  textTransform: "uppercase",
                                  fontSize: "0.9rem",
                                  padding: "10px",
                                }}>CATEGORY</TableCell>
                            <TableCell align="center" style={{
                                  fontWeight: "bold",
                                  color: "#2e718a",
                                  textTransform: "uppercase",
                                  fontSize: "0.9rem",
                                  padding: "10px",
                                }}>UNIT COST</TableCell>
                            <TableCell align="center" style={{
                                  fontWeight: "bold",
                                  color: "#2e718a",
                                  textTransform: "uppercase",
                                  fontSize: "0.9rem",
                                  padding: "10px",
                                }}>STOCK LEFT</TableCell>
                            <TableCell align="center" style={{
                                  fontWeight: "bold",
                                  color: "#2e718a",
                                  textTransform: "uppercase",
                                  fontSize: "0.9rem",
                                  padding: "10px",
                                }}>EMERGENCY TYPE</TableCell>
                                    <TableCell align="center" style={{
                                  fontWeight: "bold",
                                  color: "#2e718a",
                                  textTransform: "uppercase",
                                  fontSize: "0.9rem",
                                  padding: "10px",
                                }}>ACTIONS</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                              <TableRow
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": { border: 0 },
                                }}
                              >
                                <TableCell align="center" component="th" scope="row">
                                  {row.name}
                                </TableCell>
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
                                      // Handle order button 
                                      onClick={() => handleOrderClick(row.stockId, row.productId)} // Ensure correct references here

                                      // Add your order handling logic here
                                  
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
                      sx={{
                        "& .MuiTablePagination-displayedRows": {
                          marginTop: 0,
                          marginBottom: 0,
                        },
                        "& .MuiTablePagination-selectLabel": {
                          marginTop: 0,
                          marginBottom: 0,
                        },
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default BufferStock;
