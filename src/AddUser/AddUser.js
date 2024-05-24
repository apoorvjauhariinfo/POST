import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { useState, useRef } from "react";
import Modal from "react-modal";
import Axios from "axios"
import LoaderOverlay from '../Loader/LoaderOverlay.js';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 29,
  pt: 2,
  px: 4,
  pb: 3,
};

function AddUser({ openSidebarToggle, OpenSidebar }) {
  console.log("hospitalidis :" + localStorage.getItem("hospitalid"));
  const [inputText, setInputText] = useState('');
  let [loading, setLoading] = useState(false);
  Modal.setAppElement("#root");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const firstInputRef = useRef();

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const backtoDashboard = () => {
    navigate("/");
  };
 

  const toggleModalOpenState = () => {
    setModalIsOpen(state =>!state);
    setRole('');
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleOnChange = e => {
    const { name, checked } = e.target;

    setSelectedItems(items => ({
     ...items,
      [name]: checked
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    //Get All selected Items in a Concat String Manner
    let dep = JSON.stringify(Object.keys(selectedItems).reduce((items, key) => {
      if (selectedItems[key]) {
        return [...items, key];
      }
      return items;
    }, []))

    const prod = {
      "hospitalid": localStorage.getItem("hospitalid"),
      "department": dep,
      "role": role,
      "name": name,
      "email": email,
      "phone": phone
    };

    try {
      setLoading(true);
      const loadUsers = async () => {
        const response = await Axios.post("http://localhost:4000/postdepartment", prod);
        window.location = "/"
        console.log(response);
        setLoading(false);
      };
      loadUsers();
    } catch (error) {
      alert("Error Registering/Department Already Exist")
      console.error("Error creating Product:", error);
      setLoading(false);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

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
                        style={{ backgroundColor: '#1C647C' }}
                      >
                        Add User
                      </Button>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={backtoDashboard}
                        style={{ backgroundColor: '#1C647C' }}
                      >
                        Back To Dashboard
                      </Button>
                    </div>
                  </div>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={toggleModalOpenState}
                    className="source-type-modal"
                    aria-labelledby="source-type-dialog-label"
                    onAfterOpen={() => {
                      setTimeout(() => firstInputRef.current?.focus(), 0);
                    }}
                  >
                    <Box sx={{...style, width: 700 }}>
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
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="user">User</MenuItem>
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
                      <div className="source-type-modal__controls">
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

export default AddUser;