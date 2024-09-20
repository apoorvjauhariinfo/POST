//import { registrationSchema } from "./UserSchema.js";
import Axios from "axios";
import { useState, useEffect, React, CSSProperties } from "react";
import { useFormik } from "formik";
import axios from "axios";

import "./EditAccount.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoaderOverlay from "../Loader/LoaderOverlay.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopupMessage from "../PopupMessage/PopupMessage.js";
import {
  faEye,
  faEyeSlash,
  faEdit,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import AlerDialog from "../UI/AlertDialog";
import AlertDialog from "../UI/AlertDialog";

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

const userid = localStorage.getItem("id");

const initialValues = {
  firstname: "",
  lastname: "",
  hospitalname: "",
  email: "",
  address: "",
  district: "",
  state: "",
  pincode: "",
  landmark: "",
  phone: "",
  registeras: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
};
const EditAccount = () => {
  const [open, setOpen] = useState(false);
  const [registeras, setRegisteras] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [landmark, setLandmark] = useState();
  const [district, setDistrict] = useState();
  const [state, setState] = useState();
  const [hospitalname, setHospitalName] = useState();
  const [password, setPassword] = useState();
  const [pincode, setPincode] = useState();

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editableFields, setEditableFields] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    address: false,
    landmark: false,
    district: false,
    state: false,
    pincode: false,
    password: false,
    confirmPassword: false,
  });
  useEffect(() => {
    if (isUserRegistered) {
      const timer = setTimeout(() => {
        window.location = "/"; // Reload the page after the desired delay
      }, 3000); // Adjust the delay as needed (in milliseconds)

      return () => clearTimeout(timer);
    }
  }, [isUserRegistered]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleHome = () => {
    navigate("/");
  };
  const navigate = useNavigate();
  const navigateToVerify = () => {
    navigate("/verify");
  };
  const selectionChangeHandler = (event) => {
    setRegisteras(event.target.value);
  };
  const getuserdetails = async () => {
    try {
      console.log("fetching..");
      const url = `${process.env.REACT_APP_BASE_URL}users`;

      const { data } = await axios.get(url);
      console.log(data.document);
      console.log(userid);
      for (let i = 0; i < data.document.length; i++) {
        if (data.document[i]._id == userid) {
          setFirstName(data.document[i].firstname);
          setLastName(data.document[i].lastname);
          setEmail(data.document[i].email);
          // setAddress(data.document[i].address);
          setPhone(data.document[i].phone);
          // setLandmark(data.document[i].landmark);
          // setPincode(data.document[i].pincode);
          // setDistrict(data.document[i].district);
          // setState(data.document[i].state);
          setPassword(data.document[i].password);
          console.log("First name: " + data.document[i].firstname);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getuserdetails();
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
      console.log("1");
      //Either consider the NonNull Values in Input Field Or Thier Original Values

      try {
        console.log("2");
        const loadUsers = async () => {
          setLoading(true);
          console.log("lastname is " + values.lastname || lastName);
          const response = await axios.put(
            `${process.env.REACT_APP_BASE_URL}updateexistinguser/` +
              userid.toString(),
            {
              _id: userid.toString(),
              firstname: values.firstname || firstName,
              lastname: values.lastname || lastName,
              email: values.email || email,
              password: values.password || password,
              // address: values.address || address,
              phone: values.phone || phone,
              // landmark: values.landmark || landmark,
              // pincode: values.pincode || pincode,
              // district: values.district || district,
              // state: values.state || state,
              password: values.password || password,
            },
          );
          let userData = (await response).data;
          console.log(userData);
          window.location.reload();
        };
        loadUsers();
      } catch (error) {
        setShowAlertDialog(true);
        // alert("Error Registering/User Already Exist");
        console.error("Error creating post:", error);
      }
    },
  });

  return (
    <div>
      {isUserRegistered && <PopupMessage message="Account Details Updated" />}
      {errorMessage && <PopupMessage message={errorMessage} />}
      <LoaderOverlay loading={loading} />
      <AlertDialog
        onClose={() => setShowAlertDialog(false)}
        open={showAlertDialog}
        text="Error Registering/User Already Exist"
      />
      <section
        class="p-5 w-100"
        style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
      >
        <div class="row">
          <div class="col-12">
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
                      Edit Account Details
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            First Name*
                          </label>
                          <div className="input-group">
                            <input
                              id="firstname"
                              name="firstname"
                              className="form-control"
                              placeholder={firstName}
                              value={values.firstname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={!editableFields.firstname}
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => toggleEditable("firstname")}
                                style={{ marginLeft: "10px" }} // Add additional margin to the left side
                              >
                                <FontAwesomeIcon
                                  icon={
                                    editableFields.firstname ? faLock : faEdit
                                  }
                                />
                              </span>
                            </div>
                          </div>
                          {/* {errors.firstname && touched.firstname ? (
                            <small className="text-danger mt-1">
                              {errors.firstname}
                            </small>
                          ) : null} */}
                        </div>
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Last Name*
                          </label>
                          <div className="input-group">
                            <input
                              id="lastname"
                              name="lastname"
                              className="form-control"
                              value={values.lastname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder={lastName}
                              disabled={!editableFields.lastname}
                              type="text"
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => toggleEditable("lastname")}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    editableFields.lastname ? faLock : faEdit
                                  }
                                />
                              </span>
                            </div>
                          </div>
                          {/* {errors.lastname && touched.lastname ? (
                            <small className="text-danger mt-1">
                              {errors.lastname}
                            </small>
                          ) : null} */}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Email*
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
                          {/* {errors.email && touched.email ? (
                            <small className="text-danger mt-1">
                              {errors.email}
                            </small>
                          ) : null} */}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="last`" className="form-label">
                            Phone No*
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
                          {/* {errors.phone && touched.phone ? (
                            <small className="text-danger mt-1">
                              {errors.phone}
                            </small>
                          ) : null} */}
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Password*
                          </label>
                          <div className="input-group">
                            <input
                              id="password"
                              name="password"
                              className="form-control"
                              placeholder={password}
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type={showPassword ? "text" : "password"}
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <FontAwesomeIcon
                                  icon={showPassword ? faEyeSlash : faEye}
                                  style={{ padding: "5px 5px" }}
                                />
                              </span>
                            </div>
                          </div>
                          {/* {errors.password && touched.password ? (
                            <small className="text-danger mt-1">
                              {errors.password}
                            </small>
                          ) : null} */}
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Confirm Password*
                          </label>
                          <div className="input-group">
                            <input
                              id="confirmPassword"
                              name="confirmPassword"
                              className="form-control"
                              placeholder={password}
                              value={values.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type={showConfirmPassword ? "text" : "password"}
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              >
                                <FontAwesomeIcon
                                  icon={
                                    showConfirmPassword ? faEyeSlash : faEye
                                  }
                                  style={{ padding: "5px 5px" }}
                                />
                              </span>
                            </div>
                          </div>
                          {/* {errors.confirmPassword && touched.confirmPassword ? (
                            <small className="text-danger mt-1">
                              {errors.confirmPassword}
                            </small>
                          ) : null} */}
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="login__button-container">
                          <div className="col text-center actionButtons">
                            {/* <Button
                            variant="secondary"
                            size="lg"
                            onClick={resetForm}
                          >
                            Clear
                          </Button> */}
                            <Button onClick={handleHome}>
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
                      </div>

                      <div className="row mt-3">
                        <br />
                        <div className="col text-center">
                          Copyright 2024 semamart.com All Rights Reserved.
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="http://www.semamart.com/wp-content/uploads/2024/01/medical-banner-with-doctor-working-laptop-1024x683.jpg"
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
                        {"OTP Sent Successfully"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Thank you for choosing Semamart. The OTP has been sent
                          to email you entered. OTP is valid for a hour. Do not
                          share this code with others, including Semamart
                          employees.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Ok</Button>
                        <Button onClick={navigateToVerify} autoFocus>
                          Verify
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

export default EditAccount;
