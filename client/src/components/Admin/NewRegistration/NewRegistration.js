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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';

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
function createData(userid, name, email, phone, hospitalname, verified) {

  return { userid, name, email, phone, hospitalname, verified };
}

function RequestStatus({ openSidebarToggle, OpenSidebar }) {
  const [inputText, setInputText] = useState("");
  let [loading, setLoading] = useState(false);
  Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hospitalname, setHospitalname] = useState("");
  const [useridlist, setUserIdList] = useState([]);

  const [rolelist, setRoleList] = useState([]);
  const [namelist, setNameList] = useState([]);
  const [emaillist, setEmailList] = useState([]);
  const [phonelist, setPhoneList] = useState([]);
  const [hospitalnamelist, setHospitalNameList] = useState([]);
  const [verifiedlist, setVerifiedList] = useState([]);

  const firstInputRef = useRef();

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const backtoDashboard = () => {
    navigate("/");
  };

  const getinventoryusers = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}users`;
      const { data } = await axios.get(url);

      const userid = new Array(data.document.length);
      const name = new Array(data.document.length);
      const email = new Array(data.document.length);
      const phone = new Array(data.document.length);
      const hospitalname = new Array(data.document.length);
      const verified = new Array(data.document.length);

      let a = 0;
      for (let i = 0; i < data.document.length; i++) {
        userid[a] = data.document[i]._id;

        hospitalname[a] = data.document[i].hospitalname;
        name[a] = data.document[i].firstname + " " + data.document[i].lastname;
        email[a] = data.document[i].email;
        phone[a] = data.document[i].phone;
        verified[a] = data.document[i].verified;
        a++;
      }
      setUserIdList(userid);
      setHospitalNameList(hospitalname);
      setNameList(name);
      setEmailList(email);
      setPhoneList(phone);
      setVerifiedList(verified);

      console.log("DAta is ours", data);
    } catch (error) {
      console.log(error);
    }
  };

  getinventoryusers();

  const handleAccept = async (userid) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}updateuserstatus/`+userid.toString(), {
        _id:userid.toString(),
        verified: "true",
      });
     // window.location.reload();
  
      console.log("User status updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleReject = async (userid) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}deleteuser/${userid}`);
      //window.location.reload();
      console.log("User deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  const handleOnChange = (e) => {
    const { name, checked } = e.target;

    setSelectedItems((items) => ({
      ...items,
      [name]: checked,
    }));
  };

  const navigate = useNavigate();


  const navigateTo = (path) => {
    navigate(path);
  };
  const rows = [];
  // //Pushing The data into the Tables
  for (let i = 0; i < useridlist.length; i++) {
    if (!verifiedlist[i]) {
      rows.push(
        createData(
          useridlist[i],
          namelist[i],
          emaillist[i],
          phonelist[i],
          hospitalnamelist[i],
          verifiedlist[i]
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

                    </div>
                  </div>
                  <TableContainer
                    component={Paper}
                    className="table table-primary"
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>

                          <TableCell align="right">Name</TableCell>
                          <TableCell align="right">Email</TableCell>
                          <TableCell align="right">Phone</TableCell>
                          <TableCell align="right">Hospital Name</TableCell>
                          <TableCell align="right">Action</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right" component="th" scope="row">
                              {row.name}
                            </TableCell>


                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">{row.hospitalname}</TableCell>
                            <TableCell align="right">
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
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>


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
