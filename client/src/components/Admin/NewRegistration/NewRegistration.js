import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Modal from "react-modal";
import Axios from "axios";
import axios from "axios";
import LoaderOverlay from "../../Loader/LoaderOverlay.js";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./UserRegistration.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CalenderMenu from "../../UI/CalenderMenu.js";
import { Stack } from "@mui/material";
import ExportBtn from "../TotalHospital/ui/ExportBtn.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 29,
  pt: 2,
  px: 4,
  pb: 3,
};
function createData(
  userid,
  name,
  email,
  phone,
  hospitalname,
  registrationdate,
  verified,
  status,
) {
  return {
    userid,
    name,
    email,
    phone,
    hospitalname,
    registrationdate,
    verified,
    status,
  };
}

function RequestStatus() {
  const [inputText, setInputText] = useState("");
  let [loading, setLoading] = useState(false);
  Modal.setAppElement("#root");
  const [users, setUsers] = useState([]);
  const [openVerificationAlert, setOpenVerificationAlert] = useState(false);
  const [rejectionalert, setRejectionAlert] = useState(false);
  const navigate = useNavigate();

  const handleVerificationAlertClose = () => {
    setOpenVerificationAlert(false);
  };
  const handleRejectionAlertOpen = () => {
    setRejectionAlert(true);
  };

  const handleRejectionAlertClose = () => {
    setRejectionAlert(false);
  };

  const getinventoryusers = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}allusers`;
      const { data } = await axios.get(url);
      console.log("users" + data.documents);
      const rows = [];
      // //Pushing The data into the Tables
      let status;
      for (let i = 0; i < data.documents.length; i++) {
        if (
          Array.isArray(data.documents[i].hospitalDetails) &&
          data.documents[i].hospitalDetails[0] === null
        ) {
          status = 0;
        } else {
          status = 1;
        }

        rows.push(
          createData(
            data.documents[i]._id,
            data.documents[i].firstname + " " + data.documents[i].lastname,
            data.documents[i].email,
            data.documents[i].phone,
            data.documents[i].hospitalname,
            data.documents[i].registrationdate,
            data.documents[i].verified,
            status,
          ),
        );
      }
      setUsers(rows);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getinventoryusers();
  }, []);

  const handleAccept = async (userid) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}updateuserstatus/` +
          userid.toString(),
        {
          _id: userid.toString(),
          verified: "true",
        },
      );
      // window.location.reload();
      setOpenVerificationAlert(true);
      console.log("User status updated successfully:", response.data);
      getinventoryusers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleReject = async (userid) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}deleteuser/${userid}`,
      );
      //window.location.reload();
      setRejectionAlert(true);
      console.log("User deleted successfully:", response.data);
      getinventoryusers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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

  useEffect(() => {
    const result = filterByDateRange(users, startDate, endDate);
    setFilteredRows(result);
  }, [startDate, endDate, users]);

  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    department: true,
    subdepartment: true,
    quantityissued: true,
    productname: true,
    category: true,
    manufacturer: true,
    emergencytype: true,
    date: true,
  });

  const header = [
    "Registration Date",
    "Name",
    "Email",
    "Phone",
    "Hospital Name",
    "Verified",
  ];

  const selectedData = [];
  users.forEach((el) => {
    selectedData.push([
      el.registrationdate,
      el.name,
      el.email,
      el.phone,
      el.hospitalname,
      el.verified,
    ]);
  });
  return (
    <div>
      <LoaderOverlay loading={loading} />
      <section className="p-5 w-100">
        <Stack direction="row" justifyContent="space-between">
          <CalenderMenu
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onReset={resetDateHandler}
          />
          <ExportBtn
            rows={selectedData}
            isSelected={true}
            fileName="new_registration"
            headers={header}
          />
        </Stack>
        <div className="row">
          <div className="col-12">
            <div className="card-body p-md-50">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                  <div className="button-body mt-2 mb-2">
                    <div className="d-flex justify-content-center"></div>
                  </div>
                  {users.length === 0 ? (
                    <Typography variant="h6" align="center" gutterBottom>
                      There is currently no pending registration
                    </Typography>
                  ) : (
                    <TableContainer component={Paper} className="table">
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              Registration Date
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              Name
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              Email
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              Phone
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              Hospital Name
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              Action
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredRows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                align="center"
                                component="th"
                                scope="row"
                              >
                                {row.registrationdate}
                              </TableCell>
                              <TableCell
                                align="center"
                                component="th"
                                scope="row"
                              >
                                {row.name}
                              </TableCell>

                              <TableCell align="center">{row.email}</TableCell>
                              <TableCell align="center">{row.phone}</TableCell>
                              <TableCell align="center">
                                {row.hospitalname}
                              </TableCell>

                              <TableCell align="center">
                                {row.verified === false ? (
                                  <>
                                    <Button
                                      variant="success"
                                      style={{ margin: "0 5px" }}
                                      onClick={() => handleAccept(row.userid)}
                                    >
                                      Accept
                                    </Button>
                                    <Button
                                      variant="danger"
                                      style={{ margin: "0 5px" }}
                                      onClick={() => handleReject(row.userid)}
                                    >
                                      Reject
                                    </Button>
                                  </>
                                ) : row.status === 0 ? (
                                  <Button
                                    variant="warning"
                                    style={{ margin: "0 5px" }}
                                  >
                                    Pending Hospital
                                  </Button>
                                ) : (
                                  <Button
                                    variant="success"
                                    style={{ margin: "0 5px" }}
                                  >
                                    Registered
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}

                  <Dialog
                    open={openVerificationAlert}
                    onClose={handleVerificationAlertClose}
                  >
                    <DialogTitle>""</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Hospital is now live
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleVerificationAlertClose}
                        style={{
                          backgroundColor: "#2E718A",
                          color: "white",
                          border: "none",
                        }}
                      >
                        OK
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Dialog
                    open={rejectionalert}
                    onClose={handleRejectionAlertClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        User is removed.{" "}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleRejectionAlertClose}>OK</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RequestStatus;
