import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import "./home.css";
import MinorTotal from "./MinorTotal";
import MinorAvalaible from "./MinorAvalaible";
import MinorBufferStock from "./MinorBufferStock";
import MinorStockOut from "./MinorStockOut";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";

import axios from "axios";
import Axios from "axios";

import { useState, CSSProperties, useEffect } from "react";

function createData(date, action, type, product, quantity, emergencytype) {
  return { date, action, type, product, quantity, emergencytype };
}

function MinorHospital({
  hospitalId,
  prodLen,
  stockLen,
  bufferStock,
  stockOut,
}) {
  console.log("Hospital ID: ", hospitalId);
  console.log("Product Length: ", prodLen);
  console.log("Stock Length: ", stockLen);
  console.log("Buffer Stock: ", bufferStock);
  console.log("Stock Out: ", stockOut);
  const hospitalid = hospitalId;
  const [history, setHistory] = useState([]);
  const [date, setDate] = useState([]);
  const [productid, setProductId] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [type, setType] = useState([]);
  const [action, setAction] = useState([]);
  const [name, setName] = useState([]);
  const [emergency, setEmergency] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [minortotal, setMinorTotal] = useState(false);
  const [minoravalaible, setMinorAvalaible] = useState(false);
  const [minorbufferstock, setMinorBufferStock] = useState(false);
  const [minorstockout, setMinorStockOut] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:576px)");

  const handleAvailaible = () => {
    window.location = "/availaibleproduct";
  };
  const handleBuffer = () => {
    window.location = "/bufferstock";
  };
  const handleStockOut = () => {
    window.location = "/stockout";
  };
  const handleLoadMore = () => {
    setRowsPerPage((prevRowsPerPage) => prevRowsPerPage + 5);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseMinorTotalModal = () => {
    setMinorTotal(false);
  };
  const handleOpenTotalModal = () => {
    setMinorTotal(true);
  };
  const handleCloseMinorAvalaibleModal = () => {
    setMinorAvalaible(false);
  };
  const handleOpenAvalaibleModal = () => {
    setMinorAvalaible(true);
  };
  const handleCloseMinorBufferStockModal = () => {
    setMinorBufferStock(false);
  };
  const handleOpenBufferStockModal = () => {
    setMinorBufferStock(true);
  };
  const handleCloseMinorStockOutModal = () => {
    setMinorStockOut(false);
  };
  const handleOpenStockOutModal = () => {
    setMinorStockOut(true);
  };

  const gethistory = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}history`;

      const { data } = await axios.get(url);
      console.log("History is: ", data);
      const date = new Array(data.document.length);
      const productid = new Array(data.document.length);
      const quantity = new Array(data.document.length);
      const type = new Array(data.document.length);
      let a = 0;
      for (let i = 0; i < data.document.length; i++) {
        if (data.document[i].hospitalid == hospitalid) {
          date[a] = data.document[i].date;
          productid[a] = data.document[i].productid;
          quantity[a] = data.document[i].quantity;
          type[a] = data.document[i].type;
          a++;
        }
      }
      setDate(date);
      setType(type);
      setQuantity(quantity);
      setProductId(productid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      gethistory();
    }, 5000);
  }, []);

  const rows = [];

  const getprodnew = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}products`;

      const { data } = await axios.get(url);
      const namearr = [];
      const typoarr = [];
      const emergencyarr = [];
      let a = 0;
      for (let i = 0; i < date.length; i++) {
        for (let j = 0; j < data.document.length; j++) {
          if (productid[i] == data.document[j]._id) {
            namearr[a] = data.document[j].name;
            typoarr[a] = data.document[j].producttype;
            emergencyarr[a] = data.document[j].emergencytype;
            a++;
          }
        }
      }
      setName(namearr);
      setEmergency(emergencyarr);
      setAction(typoarr);
      console.log("DAta is ours", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getprodnew();
    }, 5000);
  }, [date]);

  for (let i = name.length - 1; i >= 0; i--) {
    rows.push(
      createData(
        date[i],
        type[i],
        action[i],
        name[i],
        quantity[i],
        emergency[i]
      )
    );
  }
  const minormodalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 20,
    overflow: "auto",
  };
  const displayedRows = rows.slice(0, rowsPerPage);
  return (
    <main className="main-container">
      <div>
        <section
          className="p-5 w-100"
          style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
        >
          <div class="row">
            <div class="col">
              <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-3">
                  <div className="main-title">
                    <h3>DASHBOARD</h3>
                  </div>

                  <div className="main-cards">
                    <div className="cardnew">
                      <div className="card-inner">
                        <h4>TOTAL </h4>
                      </div>

                      <h1>{prodLen}</h1>
                      <Button variant="text" onClick={handleOpenTotalModal}>
                        MORE
                      </Button>
                    </div>
                    <Modal
                      open={minortotal}
                      onClose={handleClose}
                      style={minormodalStyle}
                    >
                      <div style={{ padding: 10 }}>
                        <h3>Hospital Details</h3>
                        <MinorTotal hospitalid={hospitalId} />

                        <Button
                          variant="contained"
                          onClick={handleCloseMinorTotalModal}
                        >
                          Close
                        </Button>
                      </div>
                    </Modal>
                    <div className="cardnew2">
                      <div className="card-inner">
                        <h4>AVAILABLE</h4>
                      </div>
                      <h1>{stockLen}</h1>
                      <Button variant="text" onClick={handleOpenAvalaibleModal}>
                        More
                      </Button>
                    </div>
                    <Modal
                      open={minoravalaible}
                      onClose={handleClose}
                      style={minormodalStyle}
                    >
                      <div style={{ padding: 10 }}>
                        <h3>Hospital Details</h3>
                        <MinorAvalaible hospitalid={hospitalId} />

                        <Button
                          variant="contained"
                          onClick={handleCloseMinorAvalaibleModal}
                        >
                          Close
                        </Button>
                      </div>
                    </Modal>

                    <div className="cardnew3">
                      <div className="card-inner">
                        <h4>BUFFER STOCK</h4>
                      </div>
                      <h1>{bufferStock}</h1>
                      <Button
                        variant="text"
                        onClick={handleOpenBufferStockModal}
                      >
                        More
                      </Button>
                    </div>
                    <Modal
                      open={minorbufferstock}
                      onClose={handleClose}
                      style={minormodalStyle}
                    >
                      <div style={{ padding: 10 }}>
                        <h3>Hospital Details</h3>
                        <MinorBufferStock hospitalid={hospitalId} />

                        <Button
                          variant="contained"
                          onClick={handleCloseMinorBufferStockModal}
                        >
                          Close
                        </Button>
                      </div>
                    </Modal>
                    <div className="cardnew4">
                      <div className="card-inner">
                        <h4>STOCK OUT</h4>
                      </div>
                      <h1>{stockOut}</h1>
                      <Button variant="text" onClick={handleOpenStockOutModal}>
                        More
                      </Button>
                    </div>
                    <Modal
                      open={minorstockout}
                      onClose={handleClose}
                      style={minormodalStyle}
                    >
                      <div style={{ padding: 10 }}>
                        <h3>Hospital Details</h3>
                        <MinorStockOut hospitalid={hospitalId} />

                        <Button
                          variant="contained"
                          onClick={handleCloseMinorStockOutModal}
                        >
                          Close
                        </Button>
                      </div>
                    </Modal>
                  </div>
                  <div className="row" align-items-start>
                    <p class="text-right h3 mb-3 mt-4">Recent Activity</p>
                  </div>

                  <TableContainer
                    component={Paper}
                    className="table"
                  >
                    <Table
                      sx={{ minWidth: 650 }}
                      aria-label="simple table"
                      size={isSmallScreen ? "small" : "medium"}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">Date</TableCell>
                          <TableCell align="right">Action</TableCell>
                          <TableCell align="right">Type</TableCell>
                          <TableCell align="right">Product</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Emergency Type</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {displayedRows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right" component="th" scope="row">
                              {row.date}
                            </TableCell>
                            <TableCell align="right">{row.action}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.product}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">
                              {row.emergencytype}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Button variant="text" onClick={handleLoadMore}>
                    Load More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default MinorHospital;
