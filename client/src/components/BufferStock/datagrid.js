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
  const [history, setHistory] = useState([]);
  const [batchno, setBatchNo] = useState([]);
  const [productid, setProductId] = useState([]);
  const [totalquantity, setTotalQuantity] = useState([]);
  const [buffervalue, setBufferValue] = useState([]);
  const [unitcost, setUnitCost] = useState([]);
  const [doe, setDoe] = useState([]);
  const [dom, setDom] = useState([]);
  const [type, setType] = useState([]);
  const [action, setAction] = useState([]);

  const [name, setName] = useState([]);
  const [category, setCategory] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [emergencytype, setEmergencyType] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const hospitalid = localStorage.getItem("hospitalid");

  const [prodlen, setProdlen] = useState(null);
  const [stocklen, setStocklen] = useState(null);
  const [bufferstock, setBufferStock] = useState(null);
  const [stockout, setStockOut] = useState(null);

  const [issuedlen, setIssuedlen] = useState(null);
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
  
  const getStockAndProductData = async () => {
    try {
      const stockUrl = `${process.env.REACT_APP_BASE_URL}stockbyhospitalid/${hospitalid}`;
      const productUrl = `${process.env.REACT_APP_BASE_URL}productbyhospitalid/${hospitalid}`;

      const [stockData, productData] = await Promise.all([
        axios.get(stockUrl),
        axios.get(productUrl),
      ]);

      const rows = [];
      for (let i = 0; i < stockData.data.document.length; i++) {
        const stock = stockData.data.document[i];
        if (+stock.totalquantity < +stock.buffervalue && +stock.totalquantity > 0) {
          for (let j = 0; j < productData.data.products.length; j++) {
            const product = productData.data.products[j];
            if (stock.productid === product._id) {
              rows.push(
                createData(
                  product.name,
                  product.producttype,
                  stock.batchno,
                  product.manufacturer,
                  product.category,
                  stock.unitcost,
                  stock.totalquantity,
                  product.emergencytype,
                )
              );
              break;
            }
          }
        }
      }

      return rows;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchDataAndRenderTable = async () => {
    const rows = await getStockAndProductData();
    setRows(rows);
    // ... render the table with the rows data
  };

  // Call the function to fetch data and render the table
  React.useEffect(() => {
    fetchDataAndRenderTable();
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
