import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box, Stack, useMediaQuery } from "@mui/material";
import "./home.css";
import MinorTotal from "./MinorTotal";
import MinorAvalaible from "./MinorAvalaible";
import MinorBufferStock from "./MinorBufferStock";
import MinorStockOut from "./MinorStockOut";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import CancelIcon from "@mui/icons-material/Close";
import axios from "axios";
import Axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { useState, CSSProperties, useEffect } from "react";
import AvailaibleProductTable from "../../AvailaibleProduct/AvailableProductTable";
import BufferStockTable from "../../BufferStock/BufferStockTable";
import StockOutTable from "../../StockOut/StockOutTable";
import TotalProductTable from "../../TotalProduct/TotalProductTable";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function createData(date, action, initalname, quantity, initalemergency) {
  return { date, action, initalname, quantity, initalemergency };
}

function MinorHospital({ hospitalId }) {
  const [history, setHistory] = useState([]);
  const [prodlen, setProdlen] = useState(null);
  const [stocklen, setStocklen] = useState(null);
  const [bufferstock, setBufferStock] = useState(null);
  const [stockout, setStockOut] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("date");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const rows = [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const isSmallScreen = useMediaQuery("(max-width:576px)");
  const hospitalid = hospitalId;
  const handleTotal = () => {
    setModalContent("Total Products");
    setIsModalOpen(true);
  };

  const handleAvailable = () => {
    setModalContent("Available Products");
    setIsModalOpen(true);
  };

  const handleBuffer = () => {
    setModalContent("Buffer Stock");
    setIsModalOpen(true);
  };

  const handleStockOut = () => {
    setModalContent("Stock Out");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

  const getprodcount = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}productcountbyid/${hospitalid}`;
      const { data } = await axios.get(url);
      setProdlen(data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const getstock = async () => {
    try {
      let stocklen = 0;
      const url = `${process.env.REACT_APP_BASE_URL}stockcountbyhospitalid/${hospitalid}`;

      const { data } = await axios.get(url);
      setStocklen(data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const getbufferstock = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}bufandout/${hospitalid}`;
      const { data } = await axios.get(url);
      setBufferStock(data.buffer);
      setStockOut(data.out);
    } catch (error) {
      console.log(error);
    }
  };

  const gethistory = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}historywithproductdetails/${hospitalid}`;
      const { data } = await axios.get(url);
      setHistory(data.historyWithProductDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getprodcount();
    getstock();
    getbufferstock();
    gethistory();
  }, []);
  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split("/");
    return `${day}/${month}/${year}`;
  };

  for (let i = history.length - 1; i >= 0; i--) {
    let name = "";
    let emergenecy = "";
    let type = "";
    if (history[i].productDetails == null) {
      name = "Removed";
      emergenecy = "N/A";
    } else {
      name = history[i].productDetails.name;
      emergenecy = history[i].productDetails.emergencytype;
    }

    if (history[i].type == "Product Issued") {
      type = "Stock Issued";
    } else {
      type = history[i].type;
    }

    rows.push(
      createData(
        formatDate(history[i].date), // Use the formattedDate instead of history[i].date
        type,
        name,
        history[i].quantity,
        emergenecy,
      ),
    );
  }

  const filteredRows = rows.filter((row) => {
    return Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase()),
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
                    <div
                      className="cardnew"
                      onClick={prodlen > 0 ? handleTotal : null}
                    >
                      <h1>{prodlen}</h1>
                      <span>TOTAL</span>
                    </div>

                    <div
                      className="cardnew"
                      onClick={stocklen > 0 ? handleAvailable : null}
                    >
                      <h1>{stocklen}</h1>
                      <span>AVAILABLE</span>
                    </div>

                    <div
                      className="cardnew"
                      onClick={bufferstock > 0 ? handleBuffer : null}
                    >
                      <h1
                        style={{ color: bufferstock > 0 ? "#c45516" : "green" }}
                      >
                        {bufferstock}
                      </h1>
                      <span>BUFFER STOCK</span>
                    </div>

                    <div
                      className="cardnew"
                      onClick={stockout > 0 ? handleStockOut : null}
                    >
                      <h1 style={{ color: stockout > 0 ? "#c45516" : "green" }}>
                        {stockout}
                      </h1>
                      <span>STOCK OUT</span>
                    </div>
                  </div>

                  <div className="row justify-content-center">
                    <div className="col-auto">
                      <p
                        className="text-center h3 my-4 py-3"
                        style={{
                          color: "black",
                        }}
                      >
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
                                align="center"
                                sortDirection={
                                  orderBy === headCell.toLowerCase()
                                    ? order
                                    : false
                                }
                                style={{
                                  fontWeight: "bold",
                                  color: "#2e718a",
                                  textTransform: "uppercase",
                                  fontSize: "0.9rem",
                                  padding: "10px",
                                }}
                              >
                                <TableSortLabel
                                // active={orderBy === headCell.toLowerCase()}
                                // direction={
                                //   orderBy === headCell.toLowerCase()
                                //     ? order
                                //     : "asc"
                                // }
                                // onClick={() =>
                                //   handleRequestSort(headCell.toLowerCase())
                                // }
                                >
                                  {headCell}
                                </TableSortLabel>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody style={{ backgroundColor: "white" }}>
                          {filteredRows
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage,
                            )
                            .map((row, index) => (
                              <TableRow
                                key={index}
                                hover
                                style={{ cursor: "pointer" }}
                              >
                                <TableCell
                                  align="center"
                                  style={{ padding: "10px" }}
                                >
                                  {row.date}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ padding: "10px" }}
                                >
                                  {row.action}
                                </TableCell>

                                <TableCell
                                  align="center"
                                  style={{ padding: "10px" }}
                                >
                                  {row.initalname}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  style={{ padding: "10px" }}
                                >
                                  {row.quantity}
                                </TableCell>
                                <TableCell
                                  align="center"
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
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{
          display: "grid",
          placeItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div style={{ position: "relative", height: "90vh", width: "90vw" }}>
          <Box
            sx={{
              height: "100%",
              bgcolor: "background.paper",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <div style={{ height: "100%", overflowY: "auto" }}>
              <Stack direction="row" justifyContent="flex-end">
                <IconButton onClick={handleCloseModal}>
                  <CloseIcon fontSize="large" />
                </IconButton>
              </Stack>
              {modalContent && modalContent === "Total Products" && (
                <TotalProductTable hospitalid={hospitalId} />
              )}
              {modalContent && modalContent === "Available Products" && (
                <AvailaibleProductTable hospitalid={hospitalId} />
              )}
              {modalContent && modalContent === "Buffer Stock" && (
                <BufferStockTable hospitalid={hospitalId} />
              )}
              {modalContent && modalContent === "Stock Out" && (
                <StockOutTable hospitalid={hospitalId} />
              )}
            </div>
          </Box>
        </div>
      </Modal>
    </main>
  );
}

export default MinorHospital;
