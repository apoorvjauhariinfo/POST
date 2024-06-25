import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "./home.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import MinorHospital from "./MinorHospital";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUser } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import Axios from "axios";

import { useState, CSSProperties } from "react";

function createData(
  id,
  userid,
  hospitalname,
  ceanumber,
  phone,
  state,
  district,
  beds,
  billingname,
  email
) {
  return {
    id,
    userid,
    hospitalname,
    ceanumber,
    phone,
    state,
    district,
    beds,
    billingname,
    email,
  };
}

function TotalHospital() {
  const [id, setId] = useState([]);
  const [userid, setUserId] = useState([]);
  const [hospitalname, setHospitalName] = useState([]);
  const [address, setAddress] = useState([]);
  const [ceanumber, setCeaNumber] = useState([]);
  const [phone, setPhone] = useState([]);
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [beds, setBeds] = useState([]);
  const [billingname, setBillingName] = useState([]);
  //No of Products for each hospital is yet to be mentioned

  const [email, setEmail] = useState([]);

  const [open, setOpen] = useState(false);
  const [minorscreen, setMinorScreen] = useState(false);
  const [selectedhospitalid, setSelectedHospitalId] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [peopleOpen, setPeopleOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  console.log("selectedhospitalis " + selectedhospitalid);

  const [prodlen, setProdlen] = useState(null);
  const [stocklen, setStocklen] = useState(null);
  const [bufferstock, setBufferStock] = useState(null);
  const [stockout, setStockOut] = useState(null);

  const handleOpenPeopleModal = async (row) => {
    setSelectedHospital(row);
    setPeopleOpen(true);
    try {
      const user = await getUserById(row.userid);
      // You can use the user details here if needed
      console.log("User details: ", user);
      setSelectedUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosePeopleModal = () => {
    setPeopleOpen(false);
  };

  const handleCloseMinorScreenModal = () => {
    setMinorScreen(false);
    setProdlen(null);
    setStocklen(null);
    setBufferStock(null);
    setStockOut(null);
  };
  const handleClickOpen = (row) => {
    setSelectedHospital(row);
    setMinorScreen(false);
    setOpen(true);
  };

  const handleRowOpen = (row) => {
    setSelectedHospital(row);
    setSelectedHospitalId(row.id);
    setMinorScreen(true);
    getprod(row.id);
    getstock(row.id);
    getbufferstock(row.id);
  };
  const getprod = async (hospitalid) => {
    try {
      let productlength = 0;

      // console.log(process.env.REACT_APP_BASE_URL);
      const url = `${process.env.REACT_APP_BASE_URL}products`;

      const { data } = await axios.get(url);
      for (let a = 0; a < data.document.length; a++) {
        if (data.document[a].hospitalid == hospitalid) {
          productlength++;
        }
      }
      setProdlen(productlength);
    } catch (error) {
      console.log(error);
    }
  };

  const getstock = async (hospitalid) => {
    try {
      let stocklen = 0;
      const url = `${process.env.REACT_APP_BASE_URL}stocks`;

      const { data } = await axios.get(url);
      for (let a = 0; a < data.document.length; a++) {
        if (data.document[a].hospitalid == hospitalid) {
          if (+data.document[a].totalquantity != 0) {
            stocklen++;
          }
        }
      }
      setStocklen(stocklen);
    } catch (error) {
      console.log(error);
    }
  };

  const getbufferstock = async (hospitalid) => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks`;
      const { data } = await axios.get(url);
      let buffer = 0;
      let out = 0;
      for (let i = 0; i < data.document.length; i++) {
        if (data.document[i].hospitalid == hospitalid) {
          if (
            +data.document[i].totalquantity <= +data.document[i].buffervalue &&
            +data.document[i].totalquantity > 1
          ) {
            buffer++;
          }
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

  const handleClose = () => {
    setOpen(false);
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "40%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 20,
    overflow: "auto",
  };

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

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}users`;

      const { data } = await axios.get(url);
      setUsers(data.document);
      //   for(let i =  0;i < data.document.length; i++){
      //     if(data.document[i]._id == userid){
      //       return data.document[i];
      //     }
      //   }
      //  console.log("response "+data);
    } catch (error) {
      console.log(error);
    }
  };
  getUser();

  const getUserById = (userid) => {
    return users.find((user) => user._id === userid);
  };

  const gethospital = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}hospitals`;

      const { data } = await axios.get(url);
      const id = new Array(data.document.length);
      const userid = new Array(data.document.length);
      const hospitalname = new Array(data.document.length);
      const address = new Array(data.document.length);
      const ceanumber = new Array(data.document.length);
      const phone = new Array(data.document.length);
      const state = new Array(data.document.length);
      const district = new Array(data.document.length);
      const beds = new Array(data.document.length);

      const billingname = new Array(data.document.length);

      const email = new Array(data.document.length);

      for (let i = 0; i < data.document.length; i++) {
        id[i] = data.document[i]._id;
        userid[i] = data.document[i].userid;
        hospitalname[i] = data.document[i].hospitalname;
        address[i] = data.document[i].address;
        ceanumber[i] = data.document[i].ceanumber;
        phone[i] = data.document[i].phone;
        state[i] = data.document[i].state;
        district[i] = data.document[i].district;
        beds[i] = data.document[i].beds;
        billingname[i] = data.document[i].billingname;
        email[i] = data.document[i].email;
      }
      setId(id);
      setUserId(userid);
      setHospitalName(hospitalname);
      setAddress(address);
      setCeaNumber(ceanumber);

      setState(state);
      setDistrict(district);
      setBeds(beds);
      setBillingName(billingname);
      setEmail(email);

      console.log("DAta is ours", data);
    } catch (error) {
      console.log(error);
    }
  };

  gethospital();

  const rows = [];
  //Pushing The data into the Tables
  for (let i = id.length - 1; i >= 0; i--) {
    rows.push(
      createData(
        id[i],
        userid[i],
        hospitalname[i],
        ceanumber[i],
        phone[i],
        state[i],
        district[i],
        beds[i],
        billingname[i],
        email[i]
      )
    );
  }

  return (
    <main className="main-container">
      <div>
        <section
          class="p-5 w-100"
          style={{ backgroundColor: "#eee", borderRadius: ".5rem.5rem 0 0" }}
        >
          <div class="row">
            <div class="col">
              <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-3">
                  <div className="main-title">
                    <h3>HOSPITAL DETAILS</h3>
                  </div>

                  <div className="row" align-items-start>
                    <p class="text-right h3 mb-3 mt-4">FILTER</p>
                  </div>

                  <TableContainer
                    component={Paper}
                    className="table table-primary"
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">HOSPITAL NAME</TableCell>
                          <TableCell align="right">CEA NUMBER</TableCell>
                          <TableCell align="right">PHONE</TableCell>
                          <TableCell align="right">STATE</TableCell>
                          <TableCell align="right">DISTRICT</TableCell>

                          <TableCell align="right">NO OF BEDS</TableCell>

                          <TableCell align="right">NAME</TableCell>

                          <TableCell align="right">HOSPITAL EMAIL</TableCell>
                          <TableCell align="right">ACTIONS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            onClick={() => handleRowOpen(row)}
                          >
                            <TableCell align="right" component="th" scope="row">
                              {row.hospitalname}
                            </TableCell>
                            <TableCell align="right">{row.ceanumber}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">{row.state}</TableCell>
                            <TableCell align="right">{row.district}</TableCell>
                            <TableCell align="right">{row.beds}</TableCell>

                            <TableCell align="right">
                              {row.billingname}
                            </TableCell>

                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={(event) => {
                                  event.stopPropagation(); // Prevent the row click behavior
                                  handleClickOpen(row);
                                }}
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "orange",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faBuilding}
                                  style={{ color: "orange" }}
                                />
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={(event) => {
                                  event.stopPropagation(); // Prevent the row click behavior
                                  handleOpenPeopleModal(row);
                                }}
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "orange",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faUser}
                                  style={{ color: "orange" }}
                                />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Button variant="text">Load More</Button>
                </div>
              </div>
            </div>
            <Modal
              open={minorscreen}
              onClose={handleClose}
              style={minormodalStyle}
            >
              <div style={{ padding: 10 }}>
                <h3>Hospital Details</h3>
                <MinorHospital
                  hospitalId={selectedhospitalid}
                  prodLen={prodlen}
                  stockLen={stocklen}
                  bufferStock={bufferstock}
                  stockOut={stockout}
                />

                <Button
                  variant="contained"
                  onClick={handleCloseMinorScreenModal}
                >
                  Close
                </Button>
              </div>
            </Modal>
            <Modal open={open} onClose={handleClose} style={modalStyle}>
              <div style={{ padding: 10 }}>
                <h3>Hospital Details</h3>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div>
                      <p>Hospital Name: {selectedHospital.hospitalname}</p>
                      <p>Address: {selectedHospital.address}</p>
                      <p>CEA Number: {selectedHospital.ceanumber}</p>
                      <p>Phone: {selectedHospital.phone}</p>
                      <p>State: {selectedHospital.state}</p>
                      <p>District: {selectedHospital.district}</p>
                      <p>No of Beds: {selectedHospital.beds}</p>
                      <p>Name: {selectedHospital.billingname}</p>
                      <p>Hospital Email: {selectedHospital.email}</p>
                    </div>
                  </Grid>
                </Grid>

                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </Modal>

            <Modal
              open={peopleOpen}
              onClose={handleClosePeopleModal}
              style={modalStyle}
            >
              <div style={{ padding: 10 }}>
                <h3>User Details</h3>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <div>
                      <p>
                        Name: {selectedUser.firstname} {selectedUser.lastname}
                      </p>
                      <p>Email: {selectedUser.email}</p>
                      <p>Password: {selectedUser.password}</p>
                      <p>Phone: {selectedUser.phone}</p>
                      {/* Render the list of people */}
                    </div>
                  </Grid>
                </Grid>

                <Button variant="contained" onClick={handleClosePeopleModal}>
                  Close
                </Button>
              </div>
            </Modal>
          </div>
        </section>
      </div>
    </main>
  );
}

export default TotalHospital;
