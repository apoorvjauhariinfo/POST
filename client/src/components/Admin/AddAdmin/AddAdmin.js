import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, { useState, useRef } from "react";
import Modal from "react-modal";
import Axios from "axios";
import axios from "axios";
import LoaderOverlay from "../../Loader/LoaderOverlay.js";
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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
function createData(adminid, role, name, email, phone, status) {
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
  return {adminid, role, name, email, phone, status, statusButton };
}

function AddAdmin({ openSidebarToggle, OpenSidebar }) {
  const [inputText, setInputText] = useState("");
  let [loading, setLoading] = useState(false);
  Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adminidlist, setAdminIdList] = useState([]);

  const [rolelist, setRoleList] = useState([]);
  const [namelist, setNameList] = useState([]);
  const [emaillist, setEmailList] = useState([]);
  const [phonelist, setPhoneList] = useState([]);
  const [statuslist, setStatusList] = useState([]);

  const firstInputRef = useRef();

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const backtoDashboard = () => {
    navigate("/");
  };

  const getinventoryusers = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}admins`;
      const { data } = await axios.get(url);

      const adminid = new Array(data.document.length);
      const role = new Array(data.document.length);
      const name = new Array(data.document.length);
      const email = new Array(data.document.length);
      const phone = new Array(data.document.length);
      const status = new Array(data.document.length);

      let a = 0;
      for (let i = 0; i < data.document.length; i++) {
        adminid[a] = data.document[i]._id;

        role[a] = data.document[i].role;
        name[a] = data.document[i].name;
        email[a] = data.document[i].email;
        phone[a] = data.document[i].phone;
        status[a] = data.document[i].status;
        a++;
      }
      setAdminIdList(adminid);
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

  getinventoryusers();

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

  const navigate = useNavigate();

  const handleSubmit = () => {
    const prod = {
      role: role,
      name: name,
      email: email,
      phone: phone,
      password: "password",
      status: "pending",
    };

    try {
      setLoading(true);
      const loadUsers = async () => {
        const response = await Axios.post(
          `${process.env.REACT_APP_BASE_URL}postadmins`,
          prod
        );

        console.log(response);
        setLoading(false);
      };
      loadUsers();
    } catch (error) {
      alert("Error Adding Admin");
      console.error("Error creating Product:", error);
      setLoading(false);
    }
  };
  const handleDelete = (index) => {
    // Confirm deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
  
    if (confirmDelete) {
      // Perform deletion logic here
      // For example, you can make an API call to delete the admin with the corresponding ID
     
  
      try {
        setLoading(true);
        const loadUsers = async () => {
          console.log("adminidis"+ index);
          const response = await Axios.delete(
            `${process.env.REACT_APP_BASE_URL}deleteadmin/${index.toString()}`
          );
  
          console.log(response);
          setLoading(false);
          
  
          // Update the state to reflect the deletion
         // const updatedRows = [...rows];
        //  updatedRows.splice(index, 1);
        //  setRows(updatedRows);
        };
        loadUsers();
      } catch (error) {
        alert("Error deleting admin");
        console.error("Error deleting admin:", error);
        setLoading(false);
      }
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };
  const rows = [];
  // //Pushing The data into the Tables
  for (let i = 0; i < adminidlist.length; i++) {
    if (emaillist[i] !== "pratibha@semamart.com") {
      rows.push(
        createData(
          adminidlist[i],
          rolelist[i],
          namelist[i],
          emaillist[i],
          phonelist[i],
          statuslist[i]
        )
      );
    }
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
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={toggleModalOpenState}
                        style={{ backgroundColor: "#1C647C" }}
                      >
                        Add Admin
                      </Button>
                    </div>
                  </div>
                  <TableContainer
                    component={Paper}
                    className="table table-primary"
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">Role</TableCell>
                          <TableCell align="right">Name</TableCell>
                          <TableCell align="right">Email</TableCell>
                          <TableCell align="right">Phone</TableCell>
                          <TableCell align="right">Status</TableCell>
                          <TableCell align="right">Action</TableCell>
       
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
                              {row.role}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>

                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">
                              {row.statusButton}
                            </TableCell>
                             <TableCell align="right">
        <Button
          variant="danger"
          size="small"
          onClick={() => handleDelete(row.adminid)}
        >
           <DeleteForeverIcon />
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
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Add Admin
                      </Typography>
                      <FormControl fullWidth>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                          labelId="role-label"
                          id="role-select"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="user">Custom</MenuItem>
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
                        <button
                          value="apply"
                          className="source-type-modal__control-btn source-type-modal__control-btn--apply"
                          onClick={() => {
                            console.log("applying source types");
                            toggleModalOpenState();
                            handleSubmit();
                          }}
                        >
                          Add
                        </button>
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

export default AddAdmin;