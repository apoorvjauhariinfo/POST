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
// import Button from "@mui/material/Button";
import "./home.css";

import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import axios from "axios";
import Axios from "axios";

import { useState, CSSProperties } from "react";

function createData(
  name,
  type,
  batchno,
  manufacturer,
  category,
  unitcost,
  emergencytype
) {
  return {
    name,
    type,
    batchno,
    manufacturer,
    category,
    unitcost,
    emergencytype,
  };
}

function BufferStock() {
  const [rows,setRows] = useState([]);
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
  const [emergency, setEmergency] = useState([]);
  const [category, setCategory] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [emergencytype, setEmergencyType] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
  const hospitalid = localStorage.getItem("hospitalid");
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
        if (+stock.totalquantity < 1) {
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
                      Stock Out 
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
                      style={{ overflowX: 'hidden' }}
                    >
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="right">NAME</TableCell>
                            <TableCell align="right">TYPE</TableCell>
                            <TableCell align="right">BATCH NO</TableCell>
                            <TableCell align="right">MANUFACTURER</TableCell>
                            <TableCell align="right">CATEGORY</TableCell>
                            <TableCell align="right">UNIT COST</TableCell>
                            <TableCell align="right">EMERGENCY TYPE</TableCell>
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
                                <TableCell align="right" component="th" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                <TableCell align="right">{row.batchno}</TableCell>
                                <TableCell align="right">{row.manufacturer}</TableCell>
                                <TableCell align="right">{row.category}</TableCell>
                                <TableCell align="right">{row.unitcost}</TableCell>
                                <TableCell align="right">{row.emergencytype}</TableCell>
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

export default BufferStock;
