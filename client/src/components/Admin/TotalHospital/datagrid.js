import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./home.css";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Button,
  TablePagination,
  TextField,
} from "@mui/material";
import MinorHospital from "./MinorHospital";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUser } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

import { useState, useEffect } from "react";
import ModalTypography from "./ui/ModalTypography";
import TableHeadElement from "./ui/TableHeadElement";
import ExportBtn from "./ui/ExportBtn";

function TotalHospital() {
  const [hospitals, setHospitals] = useState([]);

  const [open, setOpen] = useState(false);
  const [minorscreen, setMinorScreen] = useState(false);
  const [selectedhospitalid, setSelectedHospitalId] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [peopleOpen, setPeopleOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  console.log("selectedhospitalis " + selectedhospitalid);
  const [hospitalsShown, setHospitalsShown] = useState(hospitals);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const handleOpenPeopleModal = async (row) => {
    setSelectedHospital(row);
    setPeopleOpen(true);
    try {
      const user = getUserById(row.userid);
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
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}users`;

      const { data } = await axios.get(url);
      setUsers(data.document);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = (userid) => {
    return users.find((user) => user._id === userid);
  };

  const searchedHospitals =
    searchText === ""
      ? hospitals
      : hospitals.filter((el) =>
          el.hospitalname.toLowerCase().includes(searchText.toLowerCase()),
        );

  const updateHospitalsShown = (currentPage, currentRowsPerPage) => {
    const startingIndex = currentPage * currentRowsPerPage;
    const a = searchedHospitals.slice(
      startingIndex,
      startingIndex + currentRowsPerPage,
    );
    setHospitalsShown(a);
  };

  const gethospital = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}hospitalsdata`;

      const { data } = await axios.get(url);
      setHospitals(data.documents);

      console.log("DAta is ours", data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    gethospital();
    getUser();
  }, []);

  useEffect(() => {
    updateHospitalsShown(page, rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, hospitals, searchText]);

  const handleChangePage = (_e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <main className="main-container">
      <div>
        <section
          className="p-5 w-100"
          style={{
            backgroundColor: "#eeeee",
            borderRadius: "0 0 0 0",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="row">
            <div className="col">
              <div
                className="card text-black"
                style={{
                  borderRadius: "25px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
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
                    <h3 style={{ flex: 2 }}>HOSPITAL DETAILS</h3>
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
                      <ExportBtn rows={hospitals} />
                    </Box>
                  </div>

                  <div className="row" style={{ alignItems: "start" }}>
                    {/* <p className="text-right h3 mb-3 mt-4">FILTER</p> */}
                  </div>

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
                          {[
                            "HOSPITAL NAME",
                            "CEA NUMBER",
                            "PHONE",
                            "STATE",
                            "DISTRICT",
                            "NO OF BEDS",
                            "NAME",
                            "HOSPITAL EMAIL",
                            "ACTIONS",
                          ].map((el) => (
                            <TableHeadElement text={el} />
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {hospitalsShown.map((row) => (
                          <TableRow
                            key={row._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            onClick={() => handleRowOpen(row)}
                          >
                            <TableCell align="left">
                              {row.hospitalname}
                            </TableCell>
                            <TableCell align="left">{row.ceanumber}</TableCell>
                            <TableCell align="left">{row.phone}</TableCell>
                            <TableCell align="left">{row.state}</TableCell>
                            <TableCell align="left">{row.district}</TableCell>
                            <TableCell align="left">{row.beds}</TableCell>
                            <TableCell align="left">
                              {row.billingname}
                            </TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">
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
                                  color: "#2E718A",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faBuilding}
                                  style={{ color: "#2E718A" }}
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
                                  color: "#2E718A",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faUser}
                                  style={{ color: "#2E718A" }}
                                />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {hospitalsShown.length > 0 && (
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
            <Modal
              open={minorscreen}
              onClose={handleClose}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  padding: 20,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  maxWidth: "100%",
                  width: "100%",
                }}
              >
                <h3>Hospital Details</h3>
                <MinorHospital hospitalId={selectedhospitalid} />

                <Button
                  variant="contained"
                  onClick={handleCloseMinorScreenModal}
                  style={{
                    backgroundColor: "#2E718A",
                    color: "#FFFFFF",
                    marginTop: "10px",
                  }}
                >
                  Close
                </Button>
              </div>
            </Modal>
            <Modal
              open={open}
              onClose={handleClose}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  padding: 4,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: 24,
                  maxWidth: 600,
                  width: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ marginBottom: "15px" }}
                  gutterBottom
                >
                  Hospital Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ mb: 2 }}>
                      <ModalTypography
                        label="Hospital Name:"
                        name={selectedHospital.hospitalname}
                      />
                      <ModalTypography
                        label="Address:"
                        name={selectedHospital.address}
                      />
                      <ModalTypography
                        label="CEA Number:"
                        name={selectedHospital.ceanumber}
                      />
                      <ModalTypography
                        label="Phone:"
                        name={selectedHospital.phone}
                      />
                      <ModalTypography
                        label="State:"
                        name={selectedHospital.state}
                      />
                      <ModalTypography
                        label="District:"
                        name={selectedHospital.district}
                      />
                      <ModalTypography
                        label="No of Beds:"
                        name={selectedHospital.beds}
                      />
                      <ModalTypography
                        label="Name:"
                        name={selectedHospital.billingname}
                      />
                      <ModalTypography
                        label="Hospital Email:"
                        name={selectedHospital.email}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{
                    backgroundColor: "#2E718A",
                    color: "#FFFFFF",
                    mt: 2,
                  }}
                >
                  Close
                </Button>
              </Box>
            </Modal>
            {/* ////////////////////////// */}
            <Modal
              open={peopleOpen}
              onClose={handleClosePeopleModal}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  padding: 4,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: 24,
                  maxWidth: 600,
                  width: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ marginBottom: "15px" }}
                >
                  User Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ModalTypography
                      label="Name:"
                      name={`${selectedUser.firstname} ${selectedUser.lastname}`}
                    />
                    <ModalTypography label="Email:" name={selectedUser.email} />
                    <ModalTypography
                      label="Password:"
                      name={selectedUser.password}
                    />
                    <ModalTypography label="Phone:" name={selectedUser.phone} />
                    {/* Render the list of people */}
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  onClick={handleClosePeopleModal}
                  sx={{
                    backgroundColor: "#2E718A",
                    color: "#FFFFFF",
                    mt: 2,
                  }}
                >
                  Close
                </Button>
              </Box>
            </Modal>
          </div>
        </section>
      </div>
    </main>
  );
}
export default TotalHospital;
