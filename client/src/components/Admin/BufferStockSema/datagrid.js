import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, TablePagination, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import "./home.css";

import axios from "axios";

import { useState, CSSProperties } from "react";
import ExportBtn from "../TotalHospital/ui/ExportBtn";
function createData(
  hospital,
  phone,
  name,
  batchno,
  unitcost,
  totalquantity,
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
    totalquantity,
    manufacturer,
    origin,
    emergencytype,
  };
}
function BufferStockSema() {
  const [stocks, setStocks] = useState([]);
  console.log("entry");

  const [stocksShown, setStocksShown] = useState(stocks);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const searchedHospitals =
    searchText === ""
      ? stocks
      : stocks.filter(
          (el) =>
            el.hospitalDetails &&
            el.hospitalDetails.hospitalname &&
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

  const stockdetails = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks/buffervalue/details`;
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
    const hospitalName = stocksShown[i].hospitalDetails
      ? stocksShown[i].hospitalDetails.hospitalname
      : "Removed";
    const hospitalPhone = stocksShown[i].hospitalDetails
      ? stocksShown[i].hospitalDetails.phone
      : "Removed";

    const productName = stocksShown[i].productDetails
      ? stocksShown[i].productDetails.name
      : "Removed";
    const manufacturer = stocksShown[i].productDetails
      ? stocksShown[i].productDetails.manufacturer
      : "Removed";
    const origin = stocksShown[i].productDetails
      ? stocksShown[i].productDetails.origin
      : "Removed";
    const emergencyType = stocksShown[i].productDetails
      ? stocksShown[i].productDetails.emergencytype
      : "Removed";

    rows.push(
      createData(
        hospitalName,
        hospitalPhone,
        productName,
        stocksShown[i].batchno, // Keeping batchno as is
        stocksShown[i].unitcost, // Keeping unitcost as is
        stocksShown[i].totalquantity, // Keeping totalquantity as is
        manufacturer,
        origin,
        emergencyType,
      ),
    );
  }

  const headers = [
    "Hospital",
    "Phone",
    "Product",
    "Batchno",
    "Unit Cost",
    "Stock Left",
    "Manufacturer",
    "Origin",
    "Emergency Type",
  ];

  const selectedData = [];
  rows.forEach((el) => {
    selectedData.push([
      el.hospital,
      el.phone,
      el.name,
      el.batchno,
      el.unitcost,
      el.totalquantity,
      el.manufacturer,
      el.origin,
      el.emergencytype,
    ]);
  });
  return (
    <main className="main-container">
      <div>
        <section
          className="p-5 w-100"
          style={{ backgroundColor: "#eeeee", borderRadius: ".5rem .5rem 0 0" }}
        >
          <div className="row">
            <div className="col">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-3">
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
                    <h3 style={{ flex: 2 }}>HOSPITAL BUFFER STOCK</h3>
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
                      <ExportBtn
                        rows={selectedData}
                        isSelected={true}
                        headers={headers}
                        fileName="Buffer_Stock_admin"
                      />
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
                              STOCK LEFT
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
                                {row.totalquantity}
                              </TableCell>
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default BufferStockSema;
