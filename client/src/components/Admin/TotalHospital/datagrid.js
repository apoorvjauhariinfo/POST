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
  IconButton,
  Stack,
} from "@mui/material";
import MinorHospital from "./MinorHospital";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUser } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";

import { useState, useEffect } from "react";
import ModalTypography from "./ui/ModalTypography";
import TableHeadElement from "./ui/TableHeadElement";
import ExportBtn from "./ui/ExportBtn";
import { TableFilterBtn } from "../../UI/DataTable";
import CalenderMenu from "../../UI/CalenderMenu";

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
    setSelectedHospitalId(row._id);
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

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);

  function filterByDateRange(rows, startDate, endDate) {
    if (!startDate || !endDate) return rows;

    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);

    return rows.filter((row) => {
      const [day, month, year] = row.registrationdate.split("/");
      const rowDate = new Date(year, month - 1, day).getTime();

      return rowDate >= start && rowDate <= end;
    });
  }

  function resetDateHandler() {
    setStartDate("");
    setEndDate("");
  }

  const updateHospitalsShown = (currentPage, currentRowsPerPage) => {
    const startingIndex = currentPage * currentRowsPerPage;
    const a = searchedHospitals.slice(
      startingIndex,
      startingIndex + currentRowsPerPage,
    );
    const b = filterByDateRange(a, startDate, endDate);
    setHospitalsShown(b);
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
  }, [page, rowsPerPage, hospitals, searchText, startDate, endDate]);

  const handleChangePage = (_e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableFields = [
    { headerName: "DATE", field: "date" },
    { headerName: "HOSPITAL NAME", field: "hospital name" },
    { headerName: "CEA NUMBER", field: "cea number" },
    { headerName: "PHONE", field: "phone" },
    { headerName: "STATE", field: "state" },
    { headerName: "DISTRICT", field: "district" },
    { headerName: "NO OF BEDS", field: "no of beds" },
    { headerName: "NAME", field: "name" },
    { headerName: "HOSPITAL EMAIL", field: "hospital email" },
    { headerName: "ACTIONS", field: "actions" },
  ];

  const [visibleColumns, setVisibleColumns] = useState({
    date: true,
    "hospital name": true,
    "cea number": true,
    phone: true,
    state: true,
    district: true,
    "no of beds": true,
    "hospital email": true,
    actions: true,
    name: true,
    // actions: isImId ? false : true,
  });

  const [columnAnchorEl, setColumnAnchorEl] = useState(null);

  const handleColumnClose = () => {
    setColumnAnchorEl(null);
  };

  const handleColumnClick = (event) => {
    setColumnAnchorEl(event.currentTarget);
  };

  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
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
                  </div>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ marginBottom: "30px" }}
                  >
                    <TextField
                      fullWidth
                      label="Search Hospitals"
                      variant="outlined"
                      value={searchText}
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                      sx={{ width: "400px" }}
                    />
                    <Stack direction="row" gap="10px">
                      <CalenderMenu
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        onReset={resetDateHandler}
                      />
                      <TableFilterBtn
                        anchorEl={columnAnchorEl}
                        onClose={handleColumnClose}
                        onClick={handleColumnClick}
                        columnDefinitions={tableFields}
                        visibleColumns={visibleColumns}
                        onChange={toggleColumnVisibility}
                      />
                      <ExportBtn rows={hospitals} />
                    </Stack>
                  </Stack>

                  <div className="row" style={{ alignItems: "start" }}>
                    {/* <p className="text-right h3 mb-3 mt-4">FILTER</p> */}
                  </div>

                  <TableContainer component={Paper} className="table">
                    <Table
                      sx={{
                        minWidth: 650,
                        "& .MuiTableCell-root": {
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "12px",
                        },
                        "& .MuiTableHead-root": {
                          fontFamily: "Poppins, sans-serif",
                        },
                      }}
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          {tableFields
                            .filter((el) => visibleColumns[el.field])
                            .map((el) => (
                              <TableHeadElement text={el.headerName} />
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
                            <TableCell
                              align="left"
                              sx={{
                                display: visibleColumns.date
                                  ? "table-cell"
                                  : "none",
                              }}
                            >
                              {row.registrationdate}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                display: visibleColumns["hospital name"]
                                  ? "table-cell"
                                  : "none",
                              }}
                            >
                              {row.hospitalname}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                display: visibleColumns["cea number"]
                                  ? "table-cell"
                                  : "none",
                              }}
                            >
                              {row.ceanumber}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                display: visibleColumns.phone
                                  ? "table-cell"
                                  : "none",
                              }}
                            >
                              {row.phone}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                display: visibleColumns.state
                                  ? "table-cell"
                                  : "none",
                              }}
                            >
                              {row.state}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                display: visibleColumns.district
                                  ? "table-cell"
                                  : "none",
                              }}
                            >
                              {row.district}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                display: visibleColumns["no of beds"]
                                  ? "table-cell"
                                  : "none",
                              }}
                            >
                              {row.beds}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                display: visibleColumns.name
                                  ? "table-cell"
                                  : "none",
                              }}
                            >
                              {row.billingname}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                display: visibleColumns["hospital email"]
                                  ? "table-cell"
                                  : "none",
                              }}
                            >
                              {row.email}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                display: visibleColumns.actions
                                  ? "table-cell"
                                  : "none",
                              }}
                            >
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
                  width: "90vw",
                  height: "90vh",
                }}
              >
                <Box sx={{ overflowY: "auto", height: "100%" }}>
                  <Stack justifyContent="space-between" flexDirection="row">
                    <h3>Hospital Details</h3>
                    <IconButton onClick={handleCloseMinorScreenModal}>
                      <CloseIcon fontSize="large" />
                    </IconButton>
                  </Stack>
                  <MinorHospital hospitalId={selectedhospitalid} />
                </Box>
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
