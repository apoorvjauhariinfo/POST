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
  Box,
  TextField,
} from "@mui/material";
import "./home.css";

import axios from "axios";
import Axios from "axios";

import { useState, CSSProperties } from "react";
import ExportBtn from "../TotalHospital/ui/ExportBtn";

function createData(
  hospital,
  phone,
  name,
  batchno,
  unitcost,
  manufacturer,
  origin,
  emergencytype,
) {
  return {
    hospital,
    phone,
    name,
    batchno,
    unitcost,
    manufacturer,
    origin,
    emergencytype,
  };
}

function StockOutSema() {
  const [stocks, setStocks] = useState([]);
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

  const stockdetails = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks/outvalue/details`;
      const { data } = await axios.get(url);
      console.log("data" + data[0].productDetails.origin);
      setStocks(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    stockdetails();
  }, []);

  const [stocksShown, setStocksShown] = useState(stocks);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const searchedHospitals =
    searchText === ""
      ? stocks
      : stocks.filter((el) =>
          el.hospitalDetails.hospitalname
            .toLowerCase()
            .includes(searchText.toLowerCase()),
        );

  const updateStocksShown = (currentPage, currentRowsPerPage) => {
    const startingIndex = currentPage * currentRowsPerPage;
    const a = searchedHospitals.slice(
      startingIndex,
      startingIndex + currentRowsPerPage,
    );
    setStocksShown(a);
  };

  React.useEffect(() => {
    updateStocksShown(page, rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, stocks, searchText]);

  const handleChangePage = (_e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = [];
  // //Pushing The data into the Tables
  for (let i = 0; i < stocksShown.length; i++) {
    rows.push(
      createData(
        stocksShown[i].hospitalDetails.hospitalname,
        stocksShown[i].hospitalDetails.phone,
        stocksShown[i].productDetails.name,
        stocksShown[i].batchno,
        stocksShown[i].unitcost,
        stocksShown[i].totalquantity,
        stocksShown[i].productDetails.manufacturer,
        stocksShown[i].productDetails.origin,
        stocksShown[i].productDetails.emergencytype,
      ),
    );
  }

  return (
    <main className="main-container">
      <div>
        <section
          class="p-5 w-100"
          style={{ backgroundColor: "#eeeee", borderRadius: ".5rem .5rem 0 0" }}
        >
          <div class="row">
            <div class="col">
              <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-3">
                  <div
                    className="main-title"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "20px",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "black",
                      padding: "10px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                      alignItems: "center",
                    }}
                  >
                    <h3 style={{ flex: 2 }}>HOSPITAL STOCKOUT</h3>
                    <Box>
                      <TextField
                        fullWidth
                        label="Search Hospitals"
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => {
                          setSearchText(e.target.value);
                        }}
                        sx={{ flex: 1 }}
                      />
                      <ExportBtn rows={rows} />
                    </Box>
                  </div>

                  {stocks.length === 0 ? (
                    <Typography variant="h6" align="center">
                      Loading Stocks
                    </Typography>
                  ) : (
                    <TableContainer component={Paper} className="table">
                      <Table
                        sx={{
                          minWidth: 650,
                          "& .MuiTableCell-root": {
                            fontFamily: "Poppins, sans-serif",
                          },
                          "& .MuiTableHead-root": {
                            fontFamily: "Poppins, sans-serif",
                          },
                        }}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="left"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              HOSPITAL
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              PHONE NO.
                            </TableCell>

                            <TableCell
                              align="left"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              PRODUCT
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              BATCH NO
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              UNIT COST
                            </TableCell>
                            {/* <TableCell align="right">TOTAL QUANTITY</TableCell> */}
                            <TableCell
                              align="left"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              MANUFACTURER
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              ORIGIN
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              EMERGENCY TYPE
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">{row.hospital}</TableCell>
                              <TableCell align="left">{row.phone}</TableCell>
                              <TableCell align="left">{row.name}</TableCell>
                              <TableCell align="left">{row.batchno}</TableCell>
                              <TableCell align="left">{row.unitcost}</TableCell>

                              <TableCell align="left">
                                {row.manufacturer}
                              </TableCell>

                              <TableCell align="left">{row.origin}</TableCell>
                              <TableCell align="left">
                                {row.emergencytype}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  {stocks.length > 0 && (
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15]}
                      component="div"
                      count={searchedHospitals.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: "20px 0",
                        alignItems: "center",
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
                  {/* <Button variant="text">Load More</Button> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default StockOutSema;
