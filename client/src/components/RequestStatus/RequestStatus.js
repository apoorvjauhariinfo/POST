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

function createData(requestid, productid, imname, productname, requesttype, status, navigate) {
  console.log("row product id is"+productid);
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
  if(status == "pending"){
  if (requesttype === "delete") {
    requestTypeButton = (
      <Button
        variant="contained"
        size="small"
        style={{ color: 'red' }}
        onClick={() =>  navigate(`/productdetails`, { state: { id , requestid} })}
      >
        Delete
      </Button>
    );
  } else if (requesttype != "delete") {
    requestTypeButton = (
      <Button  variant="contained"
      size="small"
      style={{ color: 'green' }}
      onClick={() =>  navigate(`/productcompare`, { state: { id , requestid,requesttype} })}>
        Edit
      </Button>
    );
  }
}else{
  if (requesttype === "delete") {
    requestTypeButton = (
      <Button
        variant="contained"
        size="small"
        style={{ color: 'red' }}
      >
        Delete
      </Button>
    );
  } else if (requesttype != "delete") {
    requestTypeButton = (
      <Button  variant="contained"
      size="small"
      style={{ color: 'green' }}
      >
        Edit
      </Button>
    );
  }

}

  return { imname, productname, requestTypeButton, statusButton };
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
  const [fetchproductid,setFetchproductid] = useState([]);

  const [imnamelist, setImNameList] = useState([]);
  const [productnamelist, setProductNameList] = useState([]);
  const [requesttypelist, setRequestTypeList] = useState([]);
  const [statuslist, setStatusList] = useState([]);
  const [requestdatelist, setRequestDateList] = useState([]);

  const firstInputRef = useRef();
  const backtoDashboard = () => {
    navigate("/");
  };

  

  const getrequests = async () => {
    try {
   
      const url = `${process.env.REACT_APP_BASE_URL}requestbyhospitalid/${hospitalid}`;
      const { data } = await axios.get(url);
      const requestidlist = new Array(data.document.length);
      const inventoryidlist = new Array(data.document.length);
      const productidlist = new Array(data.document.length);
      const requesttypelist = new Array(data.document.length);
      const statuslist = new Array(data.document.length);
      const requestdatelist = new Array(data.document.length);

      let a = 0;
      for (let i = 0; i < data.document.length; i++) {
          requestidlist[a] = data.document[i]._id;
          inventoryidlist[a] = data.document[i].inventorymanagerid;
          productidlist[a] = data.document[i].productid;
          requesttypelist[a] = data.document[i].demand;
          statuslist[a] = data.document[i].status;
          requestdatelist[a] = data.document[i].requestdate;
          a++;
        
      }
      setRequestIdList(requestidlist);
      setInventoryIdList(inventoryidlist);
      setProductIdList(productidlist);
      setRequestTypeList(requesttypelist);
      setStatusList(statuslist);
      setRequestDateList(requestdatelist);
      console.log("Inventory"+inventoryidlist);
      console.log("Product"+productidlist);
      console.log("Status"+statuslist);
      console.log("Request"+requesttypelist);

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
      const url = `${process.env.REACT_APP_BASE_URL}inventorymanagerbyhospitalid/${hospitalid}`;
      const { data } = await axios.get(url);
      const namelist = new Array(data.document.length);
      const idlist = new Array(data.document.length);

      for(let a = 0;a<data.document.length;a++) {
          namelist[a] = data.document[a].name;
          idlist[a] = data.document[a]._id;

      }
    setImNameList(namelist);
    setfetchimid(idlist);
    console.log("name list are"+ namelist, idlist);

     
    }
    catch (error) {
      console.log(error);
      return null;
    }

  }

  const getProductDetails = async(invetorymanagerid) => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}productbyhospitalid/${hospitalid}`;
      const { data } = await axios.get(url);
      const namelist = new Array(data.products.length);
      const idlist = new Array(data.products.length);


      for(let a = 0;a<data.products.length;a++) {
          namelist[a] = data.products[a].name;
          idlist[a] = data.products[a]._id;


      }
    setProductNameList(namelist);
    setFetchproductid(idlist);
    console.log("prodname list are"+ namelist, idlist);
     
    }
    catch (error) {
      console.log(error);
      return null;
    }

  }

  
    getrequests();
  

  useEffect(() => {
    getIMDetails();
    getProductDetails();
  }, []);

 
  const rows = [];
  // //Pushing The data into the Tables
  
  
  for (let i = 0; i < inventoryidlist.length; i++) {
   

    // if (statuslist[i] === "pending") {
    //   continue; // Skip this row if the status is not accepted
    // }
    let name = "";
    let prodname = "";
    let productid ="";
    let requestid = requestidlist[i];
    let requestdate = requestdatelist[i];
  
    // Assign name based on inventory manager ID
    for (let a = 0; a < fetchedimid.length; a++) {
      if (fetchedimid[a] === inventoryidlist[i]) {
        name = imnamelist[a];
        break;
      }
    }
  
    // Assign product name based on product ID
    for (let j = 0; j < productidlist.length; j++) {
    for (let b = 0; b < fetchproductid.length; b++) {
      if (fetchproductid[b] === productidlist[j]) {
        prodname = productnamelist[b];
        productid = productidlist[j];
        break;
      }
    }
    
  }
   
  
    rows.push(
      createData(
        requestdate,
        requestid,
        productid,
        name,
        prodname,
        requesttypelist[i],
        statuslist[i],
        navigate
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
                        <TableCell align="right">Request Date</TableCell>
                          <TableCell align="right">IM Name</TableCell>
                          <TableCell align="right">Product Name</TableCell>
                          <TableCell align="right">Request Type</TableCell>
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
                            {row.requestdate}
                            </TableCell>
                            <TableCell align="right" component="th" scope="row">
                              {row.imname}
                            </TableCell>
                            <TableCell align="right">{row.productname}</TableCell>

                            <TableCell align="right">{row.requestTypeButton}</TableCell>
                            <TableCell align="right">
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
