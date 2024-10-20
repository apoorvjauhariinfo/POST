import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import Axios from "axios";
import axios from "axios";
import LoaderOverlay from "../Loader/LoaderOverlay.js";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./UserRegistration.css";
import { CloseButton } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

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
  requestdate,
  requestid,
  productid,
  imname,
  productname,
  requesttype,
  status,
  navigate,
) {
  console.log("row product id is" + productid);
  let statusButton;
  let requestTypeButton;
  const id = productid;

  if (status === "pending") {
    statusButton = (
      <Button variant="warning" size="sm">
        Pending
      </Button>
    );
  } else if (status === "accepted") {
    statusButton = (
      <Button variant="success" size="sm">
        Accepted
      </Button>
    );
  } else if (status === "rejected") {
    statusButton = (
      <Button variant="danger" size="sm">
        Rejected
      </Button>
    );
  }
  if (status == "pending") {
    if (requesttype === "delete") {
      requestTypeButton = (
        <Button
          variant="contained"
          size="small"
          style={{ color: "red" }}
          onClick={() =>
            navigate(`/productdetails`, { state: { id, requestid } })
          }
        >
          <DeleteOutlined />
        </Button>
      );
    } else if (requesttype != "delete") {
      requestTypeButton = (
        <Button
          variant="contained"
          size="small"
          style={{ color: "#2E718A" }}
          onClick={() =>
            navigate(`/productcompare`, {
              state: { id, requestid, requesttype },
            })
          }
        >
          <EditIcon />
        </Button>
      );
    }
  } else {
    if (requesttype === "delete") {
      requestTypeButton = (
        <Button variant="contained" size="small" style={{ color: "red" }}>
          <DeleteOutlined />
        </Button>
      );
    } else if (requesttype != "delete") {
      requestTypeButton = (
        <Button variant="contained" size="small" style={{ color: "#2E718A" }}>
          <EditIcon />
        </Button>
      );
    }
  }

  return { requestdate, imname, productname, requestTypeButton, statusButton };
}

function RequestStatus({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();

  const hospitalid = localStorage.getItem("hospitalid");
  console.log("hospitalidis :" + localStorage.getItem("hospitalid"));
  console.log("userid :" + localStorage.getItem("id"));
  let [loading, setLoading] = useState(false);

  const [inventoryidlist, setInventoryIdList] = useState([]);
  const [productidlist, setProductIdList] = useState([]);
  const [requestidlist, setRequestIdList] = useState([]);

  const [fetchedimid, setfetchimid] = useState([]);
  const [fetchproductid, setFetchproductid] = useState([]);

  const [imnamelist, setImNameList] = useState([]);
  const [productnamelist, setProductNameList] = useState([]);
  const [requesttypelist, setRequestTypeList] = useState([]);
  const [statuslist, setStatusList] = useState([]);
  const [requestdatelist, setRequestDateList] = useState([]);
  const isInventoryManager = localStorage.getItem("inventorymanagerid");

  const firstInputRef = useRef();
  const backtoDashboard = () => {
    navigate("/");
  };

  const getrequests = async () => {
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_BASE_URL}requestbyhospitalid/${hospitalid}`;
      const { data } = await axios.get(url);
      setLoading(false);
      console.log("datais" + data.document[0].IMDetails.name);
      const requestidlist = new Array(data.document.length);
      const inventoryidlist = new Array(data.document.length);
      const productidlist = new Array(data.document.length);
      const requesttypelist = new Array(data.document.length);
      const statuslist = new Array(data.document.length);
      const requestdatelist = new Array(data.document.length);
      const productname = new Array(data.document.length);
      const imname = new Array(data.document.length);

      let a = 0;
      for (let i = 0; i < data.document.length; i++) {
        requestidlist[a] = data.document[i]._id;
        inventoryidlist[a] = data.document[i].inventorymanagerid;
        productidlist[a] = data.document[i].productid;
        requesttypelist[a] = data.document[i].demand;
        statuslist[a] = data.document[i].status;
        requestdatelist[a] = data.document[i].requestdate;
        if (data.document[i].productDetails == null) {
          productname[a] = "Removed";
        } else {
          productname[a] = data.document[i].productDetails.name;
        }

        imname[a] = data.document[i].IMDetails.name;

        a++;
      }
      setRequestIdList(requestidlist);
      setInventoryIdList(inventoryidlist);
      setProductIdList(productidlist);
      setRequestTypeList(requesttypelist);
      setStatusList(statuslist);
      setRequestDateList(requestdatelist);

      setProductNameList(productname);
      setImNameList(imname);
      console.log("Inventory" + inventoryidlist);
      console.log("Product" + productidlist);
      console.log("Status" + statuslist);
      console.log("Request" + requesttypelist);

      console.log("DAta is ours", data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(imnamelist);

  getrequests();

  getrequests();

  const rows = [];
  // //Pushing The data into the Tables

  for (let i = inventoryidlist.length - 1; i >= 0; i--) {
    rows.push(
      createData(
        requestdatelist[i],
        requestidlist[i],
        productidlist[i],
        imnamelist[i],
        productnamelist[i],
        requesttypelist[i],
        statuslist[i],
        navigate,
      ),
    );
  }

  console.log("ROWS", rows);
  return (
    <div>
      <LoaderOverlay loading={loading} />
      <section className="p-5 w-100">
        <div className="row">
          <div className="col-12">
            <div className="card-body p-md-50">
              <div className="row justify-content-center">
                <div>
                  <div className="button-body mt-2 mb-2">
                    <div className="d-flex justify-content-center">
                      {/* <Button
                        variant="primary"
                        size="lg"
                        onClick={toggleModalOpenState}
                        style={{ backgroundColor: "#1C647C" }}
                      >
                        Add User
                      </Button> */}
                    </div>
                  </div>
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
                            Request Date
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
                            IM Name
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
                            Product Name
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
                            Request Type
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
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.role}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {row.requestdate}
                            </TableCell>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {row.imname}
                            </TableCell>
                            <TableCell align="center">
                              {row.productname}
                            </TableCell>

                            <TableCell align="center">
                              {row.requestTypeButton}
                            </TableCell>
                            <TableCell align="center">
                              {row.statusButton}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={toggleModalOpenState}
                    className="source-type-modal"
                    aria-labelledby="source-type-dialog-label"
                    onAfterOpen={() => {
                      setTimeout(() => firstInputRef.current?.focus(), 0);
                    }}
                  >
                    <Box sx={{ ...style, width: 700 }}>
                    <div className="d-flex justify-content-end">
      <CloseButton
        onClick={toggleModalOpenState}
        style={{ position: "absolute", top: "10px", center: "10px" }}
      />
    </div>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Add User
                      </Typography>
                      <FormControl fullWidth>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                          labelId="role-label"
                          id="role-select"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <MenuItem value="admin">Inventory Manager</MenuItem>
                          
                        </Select>
                      </FormControl>
                      <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      <div className="d-flex justify-content-center">
                        <Button
                          value="apply"
                          variant="primary"
                        size="lg"
                        style={{ backgroundColor: "#1C647C" }}
                         // className="source-type-modal__control-btn source-type-modal__control-btn--apply"
                          onClick={() => {
                            console.log("applying source types");
                            toggleModalOpenState();
                            handleSubmit();
                          }}
                        >
                          Add
                        </Button>
                       
                      </div>
                    </Box>
                  </Modal> */}
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
