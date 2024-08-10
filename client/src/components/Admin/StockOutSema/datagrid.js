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
import Axios from "axios";

import { useState, CSSProperties } from "react";

function createData(
  hospital,
  phone,
  name,
  batchno,
  unitcost,
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
    manufacturer,
    origin,
    emergencytype,
  };
}

function StockOutSema() {
  const [rows, setRows] = useState([]);
  
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

  async function fetchData() {
    try {
      const [stocksResponse, productsResponse, hospitalsResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BASE_URL}stocks`),
        axios.get(`${process.env.REACT_APP_BASE_URL}products`),
        axios.get(`${process.env.REACT_APP_BASE_URL}hospitals`),
      ]);
  
      const stocks = stocksResponse.data.document;
      const products = productsResponse.data.document;
      const hospitals = hospitalsResponse.data.document;
  
      const rows = [];
  
      for (const stock of stocks) {
        const product = products.find((product) => product._id === stock.productid);
        const hospital = hospitals.find((hospital) => hospital._id === stock.hospitalid);
  
        if (stock.totalquantity < 1) {
          rows.push({
            hospital: hospital?.hospitalname,
            phone: hospital?.phone,
            name: product?.name,
            batchno: stock.batchno,
            unitcost: stock.unitcost,
            manufacturer: product?.manufacturer,
            origin: product?.origin,
            emergencytype: product?.emergencytype,
          });
        }
      }
  
      return rows;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  
  // Usage
  fetchData().then((rows) => {
    // Use the combined and filtered data
    console.log(rows);
    setRows(rows);
  });

    return (
      <main className="main-container">
        <div>
          <section
            class="p-5 w-100"
            style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
          >
            <div class="row">
              <div class="col">
                <div class="card text-black" style={{ borderRadius: "25px" }}>
                  <div class="card-body p-md-3">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        marginBottom: '20px',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#2E718A',
                        padding: '10px',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                      }}
                    >
                      Hospital Stock Out 
                    </Typography>
                  </div>

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
                            <TableCell align="right">HOSPITAL</TableCell>
                            <TableCell align="right">PHONE NO.</TableCell>

                            <TableCell align="right">PRODUCT</TableCell>
                            <TableCell align="right">BATCH NO</TableCell>
                            <TableCell align="right">UNIT COST</TableCell>
                            {/* <TableCell align="right">TOTAL QUANTITY</TableCell> */}
                            <TableCell align="right">MANUFACTURER</TableCell>
                            <TableCell align="right">ORIGIN</TableCell>
                            <TableCell align="right">EMERGENCY TYPE</TableCell>
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
                              <TableCell
                                align="right"
                                component="th"
                                scope="row"
                              >
                                {row.hospital}
                              </TableCell>
                              <TableCell align="right">{row.phone}</TableCell>
                              <TableCell align="right">{row.name}</TableCell>

                              <TableCell align="right">{row.batchno}</TableCell>
                              <TableCell align="right">
                                {row.unitcost}
                              </TableCell>
                              {/* <TableCell align="right">{row.totalquantity}</TableCell> */}

                              <TableCell align="right">
                                {row.manufacturer}
                              </TableCell>

                              <TableCell align="right">{row.origin}</TableCell>
                              <TableCell align="right">
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

export default StockOutSema;
