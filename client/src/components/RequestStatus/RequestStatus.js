import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect,useRef } from "react";
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
function createData(imname, product, requesttype, details, status) {
  let statusButton;

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
  return { imname, product, requesttype, details, status };
}

function RequestStatus({ openSidebarToggle, OpenSidebar }) {
  console.log("hospitalidis :" + localStorage.getItem("hospitalid"));
  console.log("userid :" + localStorage.getItem("id"));
  let [loading, setLoading] = useState(false);


  const [inventoryidlist, setInventoryIdList] = useState([]);
  const [productidlist, setProductIdList] = useState([]);

  const [imnamelist, setImNameList] = useState([]);
  const [productnamelist, setProductNameList] = useState([]);
  const [requesttypelist, setRequestTypeList] = useState([]);
  const [statuslist, setStatusList] = useState([]);

  const firstInputRef = useRef();
  const backtoDashboard = () => {
    navigate("/");
  };

  const getrequests = async () => {
    try {
      const hospitalid = localStorage.getItem("hospitalid");
      const url = `${process.env.REACT_APP_BASE_URL}requestbyhospitalid/${hospitalid}`;
      const { data } = await axios.get(url);
      const inventoryidlist = new Array(data.document.length);
      const productidlist = new Array(data.document.length);
      const requesttypelist = new Array(data.document.length);
      const statuslist = new Array(data.document.length);

      let a = 0;
      for (let i = 0; i < data.document.length; i++) {
       
          inventoryidlist[a] = data.document[i].inventorymanagerid;
          productidlist[a] = data.document[i].productid;
          requesttypelist[a] = data.document[i].demand;
          statuslist[a] = data.document[i].status;
          a++;
        
      }
      setInventoryIdList(inventoryidlist);
      setProductIdList(productidlist);
      setRequestTypeList(requesttypelist);
      setStatusList(statuslist);

      console.log("DAta is ours", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getrequests();
  }, []);

  const getIMDetails = async(invetorymanagerid) => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}inventorymanagerbyid/${invetorymanagerid}`;
      const { data } = await axios.get(url);
      const name = data.document[0].name;
      return name;
     
    }
    catch (error) {
      console.log(error);
      return null;
    }

  }
  const getProductDetails = async(productid) => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}productbyid/${productid}`;
      const { data } = await axios.get(url);
      const name = data.document[0].name;
      return name;
     
    }
    catch (error) {
      console.log(error);
      return null;
    }

  }
  
  const inventoryname = new Array(inventoryidlist.length);
  for(let i = 0;i<inventoryidlist.length;i++) {
    inventoryname[i] = getIMDetails(inventoryidlist[i]);
  }
  setImNameList(inventoryname);
  console.log("inventory"+ inventoryname);

  const productname = new Array(productidlist.length);
  for(let i = 0;i<productidlist.length;i++) {
    productname[i] = getProductDetails(productidlist[i]);
  }
  setProductNameList(productname);
  console.log("product"+ productnamelist);



  const navigate = useNavigate();


  const navigateTo = (path) => {
    navigate(path);
  };
  const rows = [];
  // //Pushing The data into the Tables
  for (let i = 0; i < inventoryidlist.length; i++) {
    rows.push(
      createData(
        imnamelist[i],
        productnamelist[i],
        requesttypelist[i],
        "details",
        statuslist[i],
      )
    );
  }

  return (
    <div>
      <LoaderOverlay loading={loading} />
      <section className="p-5 w-100">
        <div className="row">
          <div className="col-12">
            <div className="card-body p-md-50">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
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
                  <TableContainer
                    component={Paper}
                    className="table table-primary"
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">IM Name</TableCell>
                          <TableCell align="right">Product </TableCell>
                          <TableCell align="right">Request Type</TableCell>
                          <TableCell align="right">View Details</TableCell>
                          <TableCell align="right">Status</TableCell>
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
                            <TableCell align="right" component="th" scope="row">
                              {row.imname}
                            </TableCell>
                            <TableCell align="right">{row.product}</TableCell>

                            <TableCell align="right">{row.requesttype}</TableCell>
                            <TableCell align="right">{row.details}</TableCell>
                            <TableCell align="right">
                              {row.status}
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
        style={{ position: "absolute", top: "10px", right: "10px" }}
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
