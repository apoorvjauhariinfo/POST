import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import "./home.css";

import axios from "axios";

import { useState, CSSProperties } from "react";
function createData(
  hospital,
  phone,
  name,
  batchno,
  unitcost,
  totalquantity,
  manufacturer,
  origin,
  emergencytype
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
  const [stocks,setStocks] = useState([]);
  console.log("entry")
  
  const stockdetails = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks/buffervalue/details`;
      const { data } = await axios.get(url);
      console.log("data"+data[0].productDetails.origin);
      setStocks(data);      
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
  stockdetails();
}, []);
  
  const rows = [];
  // //Pushing The data into the Tables
  for (let i = 0; i < stocks.length; i++) {
   
      rows.push(
        createData(
          stocks[i].hospitalDetails.hospitalname,
          stocks[i].hospitalDetails.phone,
          stocks[i].productDetails.name,
          stocks[i].batchno,
          stocks[i].unitcost,
          stocks[i].totalquantity,
          stocks[i].productDetails.manufacturer,
          stocks[i].productDetails.origin,
          stocks[i].productDetails.emergencytype,
         
        )
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
                    Hospitals Buffer Stock
                  </Typography>

                  {rows.length === 0 ? (
                    <Typography variant="h6" align="center">
                      Loading Stocks
                    </Typography>
                  ) : (
                  <TableContainer
                    component={Paper}
                    className="table"
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
                                }}>HOSPITAL</TableCell>
                          <TableCell align="center" style={{
                                  fontWeight: "bold",
                                  color: "#2e718a",
                                  textTransform: "uppercase",
                                  fontSize: "0.9rem",
                                  padding: "10px",
                                }}>PHONE NO.</TableCell>

                          <TableCell align="center" style={{
                                  fontWeight: "bold",
                                  color: "#2e718a",
                                  textTransform: "uppercase",
                                  fontSize: "0.9rem",
                                  padding: "10px",
                                }}>PRODUCT</TableCell>
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
                                }}>MANUFACTURER</TableCell>
                          <TableCell align="center" style={{
                                  fontWeight: "bold",
                                  color: "#2e718a",
                                  textTransform: "uppercase",
                                  fontSize: "0.9rem",
                                  padding: "10px",
                                }}>ORIGIN</TableCell>
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
                        {rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center" component="th" scope="row">
                              {row.hospital}
                            </TableCell>
                            <TableCell align="center">{row.phone}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>

                            <TableCell align="center">{row.batchno}</TableCell>
                            <TableCell align="center">{row.unitcost}</TableCell>
                            <TableCell align="center">
                              {row.totalquantity}
                            </TableCell>
                            <TableCell align="center">
                              {row.manufacturer}
                            </TableCell>
                            <TableCell align="center">{row.origin}</TableCell>
                            <TableCell align="center">
                              {row.emergencytype}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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

export default BufferStockSema;
