import { useState, useEffect, React, CSSProperties } from "react";
import { useFormik } from "formik";
import axios from "axios";
import "./EditHospital.css";
import { Button } from "react-bootstrap";
import { registrationSchema } from "./HospitalSchema.js";
import Axios from "axios";
import Dashboard from "../Dashboard/Dashboard.js";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoaderOverlay from "../Loader/LoaderOverlay.js";
import PopupMessage from "../PopupMessage/PopupMessage.js";
import {
  faEye,
  faEyeSlash,
  faEdit,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const hospitalid = localStorage.getItem("hospitalid");

const initialValues = {
  hospitalname: "",
  billingname: "",
  email: "",
  address: "",
  beds: "",
  district: "",
  state: "",
  pincode: "",
  landmark: "",
  phone: "",
  ceanumber: "",
};

const EditHospital = () => {
  const [open, setOpen] = useState(false);
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [isHospitalRegistered, setIsHospitalRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hospitalname, setHospitalName] = useState("");
  const [billingname, setBillingName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [beds, setBeds] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [phone, setPhone] = useState("");
  const [ceanumber, setCeanumber] = useState("");
  const [editableFields, setEditableFields] = useState({
    hospitalname: false,
    billingname: false,
    address: false,
    email: false,
    beds: false,
    landmark: false,
    district: false,
    state: false,
    pincode: false,
    phone: false,
    ceanumber: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSignUp = () => {
    setOpen(true);
  };

  const handleClose = () => {
    window.location = "/";
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isHospitalRegistered) {
      const timer = setTimeout(() => {
        window.location = "/"; // Reload the page after the desired delay
      }, 2000); // Adjust the delay as needed (in milliseconds)

      return () => clearTimeout(timer);
    }
  }, [isHospitalRegistered]);
  const gethospitaldetails = async () => {
    try {
      console.log("fetching..");
      const url = `${process.env.REACT_APP_BASE_URL}hospitalbyid/${hospitalid}`;

      const { data } = await axios.get(url);
      console.log(data.document);
      console.log(hospitalid);
      for (let i = 0; i < data.document.length; i++) {
       
          setHospitalName(data.document[i].hospitalname);
          setBillingName(data.document[i].billingname);
          setEmail(data.document[i].email);
          setAddress(data.document[i].address);
          setBeds(data.document[i].beds);
          setDistrict(data.document[i].district);
          setState(data.document[i].state);
          setPincode(data.document[i].pincode);
          setLandmark(data.document[i].landmark);
          setPhone(data.document[i].phone);
          setCeanumber(data.document[i].ceanumber);

          console.log("Hospital name: " + data.document[i].hospitalname);
          //setRegisteras(data.document[i].registeras);
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gethospitaldetails();
  }, []);
  const toggleEditable = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    //validationSchema: registrationSchema,
    onSubmit: (values, action) => {
      try {
        const loadUsers = async () => {
          setLoading(true);
          const response = await axios.put(
            `${process.env.REACT_APP_BASE_URL}updateexistinghospital/` +
            hospitalid.toString(),
            {
              _id: hospitalid.toString(),
              userid: localStorage.getItem("id").toString(),
              hospitalname: values.hospitalname || hospitalname,
              billingname: values.billingname || billingname,
              email: values.email || email,
              address: values.address || address,
              beds: values.beds || beds,
              district: values.district || district,
              state: values.state || state,
              pincode: values.pincode || pincode,
              ceanumber: values.ceanumber || ceanumber,
            }
          );
          //window.location="/adddepartmentnew"
          let userData = (await response).data;
          console.log(userData);
          window.location.reload();
        };
        loadUsers();
      } catch (error) {
        setErrorMessage("Error Updateing Hospital");
        console.error("Error creating post:", error);
        setLoading(false);
      }

      action.resetForm();
    },
  });

  return (
    <div>
      {isHospitalRegistered && (
        <PopupMessage message="Hospital Registered Successfully. Thank you for registering!" />
      )}
      {errorMessage && <PopupMessage message={errorMessage} />}

      <LoaderOverlay loading={loading} />

      <section
        class="p-5 w-100"
        style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
      >
        <div class="row">
          <div class="col-12">
            <p class="text-center h4 fw-bold ">
              {/* {localStorage.getItem("email")} */}
            </p>
            <div class="card text-black" style={{ borderRadius: "25px" }}>
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <img
                      src={require("../assets/Semamart.png")}
                      class="img-fluid"
                      alt=""
                      style={{ width: "200px" }}
                    />
                    <p class="text-center h1 fw-bold mb-5 mt-4">
                      Edit Hospital Details
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Hospital Name*
                          </label>
                          <div className="input-group">
                            <input
                              id="hostpitalname"
                              name="hospitalname"
                              className="form-control"
                              placeholder={hospitalname}
                              value={values.hospitalname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={!editableFields.hospitalname}
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => toggleEditable("hospitalname")}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    editableFields.hospitalname
                                      ? faLock
                                      : faEdit
                                  }
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Hospital Phone No*
                          </label>
                          <div className="input-group">
                            <input
                              id="phone"
                              name="phone"
                              className="form-control"
                              placeholder={phone}
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="phone"
                              disabled={!editableFields.phone}
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => toggleEditable("phone")}
                              >
                                <FontAwesomeIcon
                                  icon={editableFields.phone ? faLock : faEdit}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="last`" className="form-label">
                            Billing Name
                          </label>
                          <div className="input-group">
                            <input
                              id="billingname"
                              name="billingname"
                              className="form-control"
                              placeholder={billingname}
                              value={values.billingname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={!editableFields.billingname}
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => toggleEditable("billingname")}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    editableFields.billingname ? faLock : faEdit
                                  }
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Hospital Email*
                          </label>
                          <div className="input-group">
                            <input
                              id="email"
                              name="email"
                              className="form-control"
                              placeholder={email}
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={!editableFields.email}
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => toggleEditable("email")}
                              >
                                <FontAwesomeIcon
                                  icon={editableFields.email ? faLock : faEdit}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Hospital Address*
                          </label>
                          <div className="input-group">
                            <input
                              id="address"
                              name="address"
                              className="form-control"
                              placeholder={address}
                              value={values.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              disabled={!editableFields.address}
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => toggleEditable("address")}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    editableFields.address ? faLock : faEdit
                                  }
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            No of Beds Available*
                          </label>
                          <div className="input-group">
                            <input
                              id="beds"
                              name="beds"
                              className="form-control"
                              value={values.beds}
                              placeholder={beds}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={!editableFields.beds}
                              type="text"
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => toggleEditable("beds")}
                              >
                                <FontAwesomeIcon
                                  icon={editableFields.beds ? faLock : faEdit}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Landmark
                          </label>
                          <div className="input-group">
                            <input
                              id="landmark"
                              name="landmark"
                              className="form-control"
                              placeholder={landmark}
                              value={values.landmark}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              disabled={!editableFields.landmark}
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => toggleEditable("landmark")}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    editableFields.landmark ? faLock : faEdit
                                  }
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Pincode*
                          </label>
                          <div className="input-group">
                            <input
                              id="pincode"
                              name="pincode"
                              className="form-control"
                              placeholder={pincode}
                              value={values.pincode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              disabled={!editableFields.pincode}
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => toggleEditable("pincode")}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    editableFields.pincode ? faLock : faEdit
                                  }
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col text-left">
                        <label htmlFor="first" className="form-label">
                          District*
                        </label>
                        <div className="input-group">
                          <input
                            id="district"
                            name="district"
                            className="form-control"
                            placeholder={district}
                            value={values.district}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            disabled={!editableFields.district}
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text"
                              onClick={() => toggleEditable("district")}
                            >
                              <FontAwesomeIcon
                                icon={editableFields.district ? faLock : faEdit}
                              />
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            State
                          </label>
                          <div className="input-group">
                            <input
                              id="state"
                              name="state"
                              className="form-control"
                              placeholder={state}
                              value={values.state}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              onBlur={handleBlur}
                              disabled={!editableFields.state}
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => toggleEditable("state")}
                              >
                                <FontAwesomeIcon
                                  icon={editableFields.state ? faLock : faEdit}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            CEA Number
                          </label>
                          <div className="input-group">
                            <input
                              id="ceanumber"
                              name="ceanumber"
                              className="form-control"
                              placeholder={ceanumber}
                              value={values.ceanumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              disabled={!editableFields.ceanumber}
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => toggleEditable("ceanmber")}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    editableFields.ceanumber ? faLock : faEdit
                                  }
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col text-center actionButtons">

                          <Button
                            variant="primary"
                            size="lg"
                            onClick={handleClose}
                          >
                            Back To Dashboard
                          </Button>
                          <Button
                            variant="primary"
                            size="lg"
                            onClick={handleSubmit}
                          >
                            Save
                          </Button>


                        </div>
                      </div>
                      <div className="row mt-3">
                        <br />
                        <div className="col text-right">
                          Copyright 2024 semamart.com All Rights Reserved.
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="http://www.semamart.com/wp-content/uploads/2023/12/pexels-chokniti-khongchum-3938022-1024x684.jpg"
                      class="img-fluid"
                      alt=""
                    />
                    {/* <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Hospital Registered"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Thank You For Registering!!
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={navigateToDashboard} autoFocus>
                          Continue
                        </Button>
                      </DialogActions>
                    </Dialog> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditHospital;
