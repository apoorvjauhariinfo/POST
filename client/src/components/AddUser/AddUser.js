import { Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import { useState, useRef, useEffect } from "react";
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

function AddUser() {
  const currenthospitalid = localStorage.getItem("hospitalid");
  let [loading, setLoading] = useState(false);
  Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [imsData, setImsData] = useState();

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertText, setAlertText] = useState("");

  const firstInputRef = useRef();

  const getinventoryusers = async () => {
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_BASE_URL}inventorymanagerbyhospitalid/${currenthospitalid}`;
      const { data } = await axios.get(url);
      setImsData(data.document);
      console.log("Data is ours", data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  const handleDelete = async (id) => {
    console.log("imidis" + id);
    alert("Are you sure you want to remove this Inventory Manager?");
    if (id != null) {
      setLoading(true);
      const response = await Axios.delete(
        `${process.env.REACT_APP_BASE_URL}deleteim/${id.toString()}`,
      );
      setLoading(false);
      console.log(response);
      getinventoryusers();
    }
  };

  const handleSubmit = async () => {
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
      const { statusText } = await Axios.post(
        `${process.env.REACT_APP_BASE_URL}postinventorymanagers`,
        prod,
      );

      // console.log(response);
      if (statusText === "OK") {
        await getinventoryusers();
        setLoading(false);
      } else {
        throw new Error("something went wrong");
      }
    };
    try {
      loadUsers();
    } catch (error) {
      setShowAlertDialog(true);
      setAlertText("Error Adding User");
      console.error("Error creating Product:", error);
      setLoading(false);
    }
  };

  const rows = [];
  if (imsData && imsData.length > 0) {
    imsData.forEach((el) => {
      rows.push(
        createData(el._id, el.role, el.name, el.email, el.phone, el.status),
      );
    });
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
                      <TextField
                        label="Email"
                        value={email}
                        onChange={handleEmailChange}
                        fullWidth
                        error={emailError}
                        helperText={
                          emailError ? "Please enter a valid email address" : ""
                        }
                        margin="normal"
                      />
                      <TextField
                        label="Phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        fullWidth
                        error={phoneError}
                        helperText={
                          phoneError
                            ? "Please enter a valid 10-digit phone number"
                            : ""
                        }
                        margin="normal"
                      />
                      <div className="d-flex justify-content-center">
                        <Button
                          value="apply"
                          variant="primary"
                          size="lg"
                          style={{ backgroundColor: "#1C647C" }}
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
