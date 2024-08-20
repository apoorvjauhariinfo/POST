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

function BufferStockSema() {
  const [rows,setRows] = useState([]);
  console.log("entry")
  
  async function fetchData() {
    try {
      const [productResponse, hospitalResponse, stockResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BASE_URL}products`),
        axios.get(`${process.env.REACT_APP_BASE_URL}hospitals`),
        axios.get(`${process.env.REACT_APP_BASE_URL}stocks`),
      ]);
  
      const products = productResponse.data.document;
      const hospitals = hospitalResponse.data.document;
      const stocks = stockResponse.data.document;
  
      const combinedData = stocks.map((stock) => {
        const product = products.find((product) => product._id === stock.productid);
        const hospital = hospitals.find((hospital) => hospital._id === stock.hospitalid);
  
        return {
          ...stock,
          name: product?.name,
          hospital: hospital?.hospitalname,
          phone: hospital?.phone,
          manufacturer: product?.manufacturer,
          origin: product?.origin,
          emergencytype: product?.emergencytype,
        };
      });
  
      return combinedData.filter(
        (item) => item.totalquantity < item.buffervalue && item.totalquantity > 0
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  
  // Usage
  fetchData().then((data) => {
    // Use the combined and filtered data
    console.log(data);
    setRows(data);
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
                <Typography
                    variant="h4"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      fontSize: '2.5rem',
                      fontWeight: 'bold',
                      color: '#2E718A',
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
                          <TableCell align="right">HOSPITAL</TableCell>
                          <TableCell align="right">PHONE NO.</TableCell>

                          <TableCell align="right">PRODUCT</TableCell>
                          <TableCell align="right">BATCH NO</TableCell>
                          <TableCell align="right">UNIT COST</TableCell>
                          <TableCell align="right">STOCK LEFT</TableCell>
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
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right" component="th" scope="row">
                              {row.hospital}
                            </TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>

                            <TableCell align="right">{row.batchno}</TableCell>
                            <TableCell align="right">{row.unitcost}</TableCell>
                            <TableCell align="right">
                              {row.totalquantity}
                            </TableCell>
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

export default BufferStockSema;
