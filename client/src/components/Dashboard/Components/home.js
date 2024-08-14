import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import "./home.css";
import "../Dashboard.css";

import axios from "axios";

import { useState, useEffect } from "react";

function createData(date, action, initalname, quantity, initalemergency) {
  return { date, action, initalname, quantity, initalemergency };
}

function Home() {
  const [history, setHistory] = useState([]);
  const [date, setDate] = useState([]);
  const [productid, setProductId] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [type, setType] = useState([]);
  const [action, setAction] = useState([]);
  const [name, setName] = useState([]);
  const [emergency, setEmergency] = useState([]);
  const [prodlen, setProdlen] = useState(null);
  const [stocklen, setStocklen] = useState(null);
  const [bufferstock, setBufferStock] = useState(null);
  const [stockout, setStockOut] = useState(null);
  const [issuedlen, setIssuedlen] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("date");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [productidlist, setProductidlist] = useState([]);
  const rows = [];

  const hospitalid = localStorage.getItem("hospitalid");

  const isSmallScreen = useMediaQuery("(max-width:576px)");

  const handleTotal = () => {
    window.location = "/totalproduct";
  };
  const handleAvailable = () => {
    window.location = "/availaibleproduct";
  };
  const handleBuffer = () => {
    window.location = "/bufferstock";
  };
  const handleStockOut = () => {
    window.location = "/stockout";
  };

  // Prevent back button
  window.history.pushState(null, document.title, window.location.pathname);
  window.addEventListener("popstate", function () {
    history.push("/");
  });

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };
  

  const getprod = async () => {
    try {
      // let productlength = 0;
      const url = `${process.env.REACT_APP_BASE_URL}productbyhospitalid/${hospitalid}`;
      const { data } = await axios.get(url);
      const products = data.products.length;
      setProdlen(products);
      const namearr = [];
      const productidarr = [];
      const emergencyarr = [];
      for(let a = 0;a<data.products.length;a++) {
        namearr[a] = data.products[a].name;
        emergencyarr[a] = data.products[a].emergencytype;
        productidarr[a] = data.products[a]._id;
      }
   
      setName(namearr);
      setEmergency(emergencyarr);
      setProductidlist(productidarr);
    } catch (error) {
      console.log(error);
    }
  };


  const getstock = async () => {
    try {
      let stocklen = 0;
      const url = `${process.env.REACT_APP_BASE_URL}stockbyhospitalid/${hospitalid}`;

      const { data } = await axios.get(url);
      for (let a = 0; a < data.document.length; a++) {
      
          if (+data.document[a].totalquantity != 0) {
            stocklen++;
          }
        
      }
      setStocklen(stocklen);
    } catch (error) {
      console.log(error);
    }
  };


  const getbufferstock = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stockbyhospitalid/${hospitalid}`;
      const { data } = await axios.get(url);
      let buffer = 0;
      let out = 0;
      for (let i = 0; i < data.document.length; i++) {
          if (
            +data.document[i].totalquantity <= +data.document[i].buffervalue &&
            +data.document[i].totalquantity > 1
          ) {
            buffer++;
          }
        
      }
      for (let i = 0; i < data.document.length; i++) {
        if (data.document[i].hospitalid == hospitalid) {
          if (+data.document[i].totalquantity < 1) {
            out++;
          }
        }
      }
      setBufferStock(buffer);
      setStockOut(out);
    } catch (error) {
      console.log(error);
    }
  };


  const getissued = async () => {
    try {
      const issuelen = 0;
      const url = `${process.env.REACT_APP_BASE_URL}issuedbyhospitalid/${hospitalid}`;

      const { data } = await axios.get(url);
      for (let a = 0; a < data.document.length; a++) {
          issuelen++;
        }
      
      setIssuedlen(issuelen);
    } catch (error) {
      console.log(error);
    }
  };

  const gethistory = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}historybyhospitalid/${hospitalid}`;
      const { data } = await axios.get(url);
      const filteredData = data.document.filter(
        (doc) => doc.hospitalid === hospitalid
      );
      setDate(filteredData.map((doc) => doc.date));
      setType(filteredData.map((doc) => doc.type));
      setQuantity(filteredData.map((doc) => doc.quantity));
      setProductId(filteredData.map((doc) => doc.productid));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getprod();
    getissued();
    getstock();
    getbufferstock();
    gethistory();
  }, []);
  



  for (let i = date.length - 1; i >= 0; i--) {

    let initalname = null;
    let initalemergency = null;
    

    for (let j = 0; j < productidlist.length; j++) {
        if(productidlist[j] == productid[i]){
          initalname = name[j];
          initalemergency = emergency[j];
            break;
        }

    }
    console.log("Name"+initalemergency);
    console.log("Name"+initalname);
    if(initalname == "" || initalname == null){
      initalname = "Removed";
    }
    if(initalemergency == "" || initalemergency == null){
      initalemergency = "Removed";
    }
    rows.push(
      createData(
        date[i],
        type[i],
        initalname,
        quantity[i],
        initalemergency,
      )
    );
  }

  const filteredRows = rows.filter((row) => {
    return Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    );
  });

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  return (
    <main className="main-container" style={{ backgroundColor: "#eeeee" }}>
      <div>
        <section
          className="p-5 w-100"
          style={{ backgroundColor: "#eeeee", borderRadius: "0 0 0 0" }}
        >
          <div className="row">
            <div className="col">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-3">
                  <div className="main-cards">
                  <div className="cardnew" onClick={prodlen > 0 ? handleTotal : null}>
                  <h1>{prodlen}</h1>
                      <span>TOTAL</span>
                    </div>

                    <div className="cardnew" onClick={stocklen > 0 ? handleAvailable : null}>
                    <h1>{stocklen}</h1>
                      <span>AVAILABLE</span>
                    </div>

                    <div className="cardnew" onClick={bufferstock > 0 ? handleBuffer : null}>
                    <h1
                        style={{ color: bufferstock > 0 ? "#c45516" : "green" }}
                      >
                        {bufferstock}
                      </h1>
                      <span>BUFFER STOCK</span>
                    </div>

                    <div className="cardnew" onClick={stockout > 0 ? handleStockOut : null}>

                      <h1 style={{ color: stockout > 0 ? "#c45516" : "green" }}>
                        {stockout}
                      </h1>
                      <span>STOCK OUT</span>
                    </div>
                  </div>

                  <div className="row justify-content-center">
                    <div className="col-auto">
                      <p className="text-center h3 my-4 py-3">
                        {rows.length > 0
                          ? "Recent Activity"
                          : "No Recent Activity"}
                      </p>
                    </div>
                  </div>

            

                  {rows.length > 0 ? (
                    <TableContainer component={Paper} className="table ">
                      <Table
                        sx={{ minWidth: 650 }}
                        aria-label="simple table"
                        size={isSmallScreen ? "small" : "medium"}
                      >
                        <TableHead>
                          <TableRow>
                            {[
                              "Date",
                              "Action",
                              "Product",
                              "Quantity",
                              "Emergency Type",
                            ].map((headCell) => (
                              <TableCell
                                key={headCell}
                                align="right"
                                sortDirection={
                                  orderBy === headCell.toLowerCase()
                                    ? order
                                    : false
                                }
                                style={{
                                  // fontWeight: 'bold',
                                  // backgroundColor: '#2E718A',
                                  textTransform: "uppercase",
                                  fontSize: "0.9rem",
                                  padding: "10px",
                                }}
                              >
                                <TableSortLabel
                                  active={orderBy === headCell.toLowerCase()}
                                  direction={
                                    orderBy === headCell.toLowerCase()
                                      ? order
                                      : "asc"
                                  }
                                  onClick={() =>
                                    handleRequestSort(headCell.toLowerCase())
                                  }
                                >
                                  {headCell}
                                </TableSortLabel>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody style={{ backgroundColor: "white" }}>
                          {stableSort(
                            filteredRows,
                            getComparator(order, orderBy)
                          )
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => (
                              <TableRow
                                key={index}
                                hover
                                style={{ cursor: "pointer" }}
                              >
                                <TableCell
                                  align="right"
                                  style={{ padding: "10px" }}
                                >
                                  {row.date}
                                </TableCell>
                                <TableCell
                                  align="right"
                                  style={{ padding: "10px" }}
                                >
                                  {row.action}
                                </TableCell>
                               
                                <TableCell
                                  align="right"
                                  style={{ padding: "10px" }}
                                >
                                  {row.initalname}
                                </TableCell>
                                <TableCell
                                  align="right"
                                  style={{ padding: "10px" }}
                                >
                                  {row.quantity}
                                </TableCell>
                                <TableCell
                                  align="right"
                                  style={{ padding: "10px" }}
                                >
                                  {row.initalemergency}
                                </TableCell>
                              </TableRow>
                            ))}
                          {emptyRows > 0 && (
                            <TableRow
                              style={{
                                height: (isSmallScreen ? 33 : 53) * emptyRows,
                                backgroundColor: "white",
                              }}
                            >
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <></>
                  )}
                  {rows.length > 0 && (
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15]}
                      component="div"
                      count={filteredRows.length}
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

export default Home;
