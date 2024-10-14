import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, { useState, useRef, useEffect } from "react";
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
import AlertDialog from "../UI/AlertDialog";

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
function createData(id, role, name, email, phone, status) {
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
  return { id, role, name, email, phone, status, statusButton };
}

function AddUser({ openSidebarToggle, OpenSidebar }) {
  // console.log("hospitalidis :" + localStorage.getItem("hospitalid"));
  // console.log("userid :" + localStorage.getItem("id"));
  const currenthospitalid = localStorage.getItem("hospitalid");
  const [inputText, setInputText] = useState("");
  let [loading, setLoading] = useState(false);
  Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inventoryidlist, setInventoryIdList] = useState([]);
  const [hospitalidlist, setHospitalIdList] = useState([]);
  const [useridlist, setUserIdList] = useState([]);
  const [rolelist, setRoleList] = useState([]);
  const [namelist, setNameList] = useState([]);
  const [emaillist, setEmailList] = useState([]);
  const [phonelist, setPhoneList] = useState([]);
  const [statuslist, setStatusList] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertText, setAlertText] = useState("");

  const firstInputRef = useRef();

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const backtoDashboard = () => {
    navigate("/");
  };

  const getinventoryusers = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}inventorymanagerbyhospitalid/${currenthospitalid}`;
      const { data } = await axios.get(url);
      const inventoryid = new Array(data.document.length);
      const hospitalid = new Array(data.document.length);
      const userid = new Array(data.document.length);
      const role = new Array(data.document.length);
      const name = new Array(data.document.length);
      const email = new Array(data.document.length);
      const phone = new Array(data.document.length);
      const status = new Array(data.document.length);

      let a = 0;
      for (let i = 0; i < data.document.length; i++) {
        inventoryid[a] = data.document[i]._id;
        hospitalid[a] = data.document[i].hospitalid;
        userid[a] = data.document[i].userid;
        role[a] = data.document[i].role;
        name[a] = data.document[i].name;
        email[a] = data.document[i].email;
        phone[a] = data.document[i].phone;
        status[a] = data.document[i].status;
        a++;
      }
      setInventoryIdList(inventoryid);
      setHospitalIdList(hospitalid);
      setUserIdList(userid);

      setRoleList(role);
      setNameList(name);
      setEmailList(email);
      setPhoneList(phone);
      setStatusList(status);

      console.log("DAta is ours", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getinventoryusers();
  }, []);

  const toggleModalOpenState = () => {
    setModalIsOpen((state) => !state);
    setRole("");
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleOnChange = (e) => {
    const { name, checked } = e.target;

    setSelectedItems((items) => ({
      ...items,
      [name]: checked,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setPhoneError(!validatePhone(value));
  };

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    console.log("imidis" + id);
    alert("Are you sure you want to remove this Inventory Manager?");
    if (id != null) {
      const response = await Axios.delete(
        `${process.env.REACT_APP_BASE_URL}deleteim/${id.toString()}`,
      );
      console.log(response);
      getinventoryusers();
    }
  };

  const handleSubmit = () => {
    const prod = {
      hospitalid: localStorage.getItem("hospitalid"),
      userid: localStorage.getItem("id"),
      role: role,
      name: name,
      email: email,
      phone: phone,
      password: "password",
      status: "pending",
    };

    setLoading(true);
    const loadUsers = async () => {
      const response = await Axios.post(
        `${process.env.REACT_APP_BASE_URL}postinventorymanagers`,
        prod,
      );

      // console.log(response);
      setLoading(false);
    };
    try {
      loadUsers();
    } catch (error) {
      setShowAlertDialog(true);
      setAlertText("Error Adding User");
      // alert("Error Adding User");
      console.error("Error creating Product:", error);
      setLoading(false);
    } finally {
      console.log("nininininin");
      getinventoryusers();
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };
  const rows = [];
  // //Pushing The data into the Tables
  for (let i = 0; i < inventoryidlist.length; i++) {
    rows.push(
      createData(
        inventoryidlist[i],
        rolelist[i],
        namelist[i],
        emaillist[i],
        phonelist[i],
        statuslist[i],
      ),
    );
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <LoaderOverlay loading={loading} />
      <AlertDialog
        onClose={() => setShowAlertDialog(false)}
        open={showAlertDialog}
        text={alertText}
      />
      <section className="p-5 w-100">
        <div className="row">
          <div className="col-12">
            <div className="card-body p-md-50">
              <div className="row justify-content-center">
                <div>
                  <div className="button-body mt-2 mb-2">
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={toggleModalOpenState}
                        style={{ backgroundColor: "#1C647C" }}
                      >
                        Add User
                      </Button>
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
                            Role
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
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row, i) => (
                          <TableRow
                            key={i}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {row.role}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>

                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.phone}</TableCell>
                            <TableCell align="center">
                              {row.statusButton}
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(row.id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Modal
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
                          style={{
                            position: "absolute",
                            top: "10px",
                            center: "10px",
                          }}
                        />
                      </div>
                      <Typography
                        id="modal-modal-description"
                        sx={{ mt: 4, mb: 2 }}
                      >
                        Add User
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                          label="Role"
                          labelId="role-label"
                          id="role-select"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          fullWidth
                          margin="normal"
                        >
                          <MenuItem value="Inventory Manager">
                            Inventory Manager
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                      />
                      {/* <TextField
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
                      /> */}
                      <TextField
                        label="Email"
                        value={email}
                        onChange={handleEmailChange}
                        fullWidth
                        margin="normal"
                        error={emailError}
                        helperText={
                          emailError ? "Please enter a valid email address" : ""
                        }
                      />
                      <TextField
                        label="Phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        fullWidth
                        margin="normal"
                        error={phoneError}
                        helperText={
                          phoneError
                            ? "Please enter a valid 10-digit phone number"
                            : ""
                        }
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
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddUser;
