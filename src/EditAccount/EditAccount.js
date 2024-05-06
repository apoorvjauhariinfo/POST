import { registrationSchema } from "./UserSchema.js";
import Axios from "axios";
import { useState, useEffect, React, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useFormik } from "formik";
import { MenuItem } from "@mui/material";
import axios from 'axios'


import "./EditAccount.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Select, FormControl, InputLabel, FormHelperText } from "@mui/material";
import LoaderOverlay from "../Loader/LoaderOverlay.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PopupMessage from "../PopupMessage/PopupMessage.js";
import { InputAdornment } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

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

  const [firstName,setFirstName] = useState();
  const [lastName,setLastName] = useState();
  const [email,setEmail] = useState();
  const [phone,setPhone] = useState();
  const [address,setAddress] = useState();
  const [landmark,setLandmark] = useState();
  const [district,setDistrict] = useState();
  const [state,setState] = useState();
  const [hospitalname,setHospitalName] = useState();
  const [password,setPassword] = useState();
  const [pincode,setPincode] = useState();


  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (isUserRegistered) {
      const timer = setTimeout(() => {
        window.location = "/registerhospital"; // Reload the page after the desired delay
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
      console.log("fetching..")
      const url = `http://localhost:4000/users`;

       const { data } = await axios.get(url);
       console.log(data.document);
       console.log(userid);
       for(let i = 0;i<data.document.length;i++){
         if(data.document[i]._id == userid){
           setFirstName(data.document[i].firstname);
           setLastName(data.document[i].lastname);
           setEmail(data.document[i].email);
           setAddress(data.document[i].address);
           setPhone(data.document[i].phone);
           setLandmark(data.document[i].landmark);
           setPincode(data.document[i].pincode);
           setDistrict(data.document[i].district);
           setState(data.document[i].state);
           setPassword(data.document[i].password);
           console.log("First name: " + data.document[i].firstname);
           //setRegisteras(data.document[i].registeras);
         }
       }
      // const stockarray = new Array(data.document.length);
      // const stockproductarray = new Array(data.document.length);
      // const existquantity = new Array(data.document.length);

      // for (let i = 0; i < data.document.length; i++) {
      //   stockarray[i] = data.document[i]._id;
      //   stockproductarray[i] = data.document[i].productid;
      //   existquantity[i] = data.document[i].totalquantity;
      // }
      // setStockId(stockarray);
      // // console.log("stockarray"+stockarray);
      // setStockProductArray(stockproductarray);
      // // console.log("stockproductarray"+stockproductarray);

      // setExistQuantity(existquantity);
      // // console.log("existquant"+existquantity);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getuserdetails();
  }, []);
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
    validationSchema: registrationSchema,
    onSubmit: (values, action) => {
      console.log("1");

      const post = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        address: values.address,
        phone: values.phone,
        landmark: values.landmark,
        pincode: values.pincode,
        district: values.district,
        state: values.state,
        hospitalname: values.hospitalname,
        registeras: registeras,
        verified: false,
      };

      try {
        console.log("2");
        const loadUsers = async () => {
          setLoading(true);
          const response = await Axios.post(
            "http://localhost:4000/api/users",
            post
          );
          let userData = (await response).data.token;
          let id = (await response).data.id;
          console.log(userData);
          localStorage.setItem("token", userData);
          
          //Storing ID of user on local system
          localStorage.setItem("email", values.email);
          localStorage.setItem("id", id);
          window.location = "/registerhospital";
          setIsUserRegistered(true);
          setLoading(false);
          handleClickOpen();
        };
        loadUsers();
      } catch (error) {
        alert("Error Registering/User Already Exist");
        console.error("Error creating post:", error);
      }
      action.resetForm();
    },
  });

  return (
    <div>
      {isUserRegistered && (
        <PopupMessage message="Account Details Updated" />
      )}
      {errorMessage && <PopupMessage message={errorMessage} />}
      <LoaderOverlay loading={loading} />
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
                      src="http://www.semamart.com/wp-content/uploads/2023/12/Semamart-Logo-5-1024x193.png"
                      class="img-fluid"
                      alt=""
                      style={{ width: "200px" }}
                    />
                    <p class="text-center h1 fw-bold mb-5 mt-4">
                      Account Details
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            First Name*
                          </label>
                          <input
                            id="firstname"
                            name="firstname"
                            className="form-control"
                            value={firstName || values.firstname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.firstname && touched.firstname ? (
                            <small className="text-danger mt-1">
                              {errors.firstname}
                            </small>
                          ) : null}
                        </div>
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Last Name*
                          </label>
                          <input
                            id="lastname"
                            name="lastname"
                            className="form-control"
                            value={lastName || values.lastname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                          />
                          {errors.lastname && touched.lastname ? (
                            <small className="text-danger mt-1">
                              {errors.lastname}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Email*
                          </label>
                          <input
                            id="email"
                            name="email"
                            className="form-control"
                            value={email || values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.email && touched.email ? (
                            <small className="text-danger mt-1">
                              {errors.email}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="last`" className="form-label">
                            Phone No*
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            className="form-control"
                            value={phone || values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="phone"
                          />
                          {errors.phone && touched.phone ? (
                            <small className="text-danger mt-1">
                              {errors.phone}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Address*
                          </label>
                          <input
                            id="address"
                            name="address"
                            className="form-control"
                            value={address || values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                          />
                          {errors.address && touched.address ? (
                            <small className="text-danger mt-1">
                              {errors.address}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Landmark
                          </label>
                          <input
                            id="landmark"
                            name="landmark"
                            className="form-control"
                            value={landmark || values.landmark}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                          />
                          {errors.landmark && touched.landmark ? (
                            <small className="text-danger mt-1">
                              {errors.landmark}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Pincode*
                          </label>
                          <input
                            id="pincode"
                            name="pincode"
                            className="form-control"
                            value={pincode || values.pincode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                          />
                          {errors.pincode && touched.pincode ? (
                            <small className="text-danger mt-1">
                              {errors.pincode}
                            </small>
                          ) : null}
                        </div>
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            District*
                          </label>
                          <input
                            id="district"
                            name="district"
                            className="form-control"
                            value={district || values.district}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                          />
                          {errors.district && touched.district ? (
                            <small className="text-danger mt-1">
                              {errors.district}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            State
                          </label>
                          <input
                            id="state"
                            name="state"
                            className="form-control"
                            value={state || values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                          />
                          {errors.state && touched.state ? (
                            <small className="text-danger mt-1">
                              {errors.state}
                            </small>
                          ) : null}
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
                              value={password || values.password}
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
                          {errors.password && touched.password ? (
                            <small className="text-danger mt-1">
                              {errors.password}
                            </small>
                          ) : null}
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
                              value={password || values.confirmPassword}
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
                          {errors.confirmPassword && touched.confirmPassword ? (
                            <small className="text-danger mt-1">
                              {errors.confirmPassword}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      

                      <div className="row mt-3">
                        <div className="col text-center actionButtons">
                          {/* <Button
                            variant="secondary"
                            size="lg"
                            onClick={resetForm}
                          >
                            Clear
                          </Button> */}

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
                        <div className="col text-center actionButtons">
                        <Button variant="outlined" onClick={handleHome}>Back To Dashboard</Button>
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
