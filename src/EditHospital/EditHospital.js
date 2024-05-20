import { useState, useEffect, React, CSSProperties } from "react";
import { useFormik } from "formik";
import axios from 'axios'
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
  const [hospitalname,setHospitalName] = useState("");
  const [billingname,setBillingName] = useState("");
  const [email,setEmail] = useState("");
  const [address,setAddress] = useState("");
  const [beds,setBeds] = useState("");
  const [district,setDistrict] = useState("");
  const [state,setState] = useState("");
  const [pincode,setPincode] = useState("");
  const [landmark,setLandmark] = useState("");
  const [phone,setPhone] = useState("");
  const [ceanumber,setCeanumber] = useState("");


 

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
      console.log("fetching..")
      const url = `http://localhost:4000/hospitals`;

       const { data } = await axios.get(url);
       console.log(data.document);
       console.log(hospitalid);
       for(let i = 0;i<data.document.length;i++){
         if(data.document[i]._id == hospitalid){
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
       }
     
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gethospitaldetails();
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
      const hospital = {
        userid: localStorage.getItem("id"),
        hospitalname: values.hospitalname,
        billingname: values.billingname,
        address: values.address,
        beds: values.beds,
        ceanumber: values.ceanumber,
        email: values.email,
        phone: values.phone,
        state: values.state,
        district: values.district,
        landmark: values.landmark,
        pincode: values.pincode,
      
      };
     

      try {
        const loadUsers = async () => {
          setLoading(true);
          const response = await Axios.post(
            "http://localhost:4000/posthospitals",
            hospital
          );
          //window.location="/adddepartmentnew"
          console.log("Post created:", response.data);
          let hospitalid = response.data.hospital._id;
        
         

          console.log("hospitalid is "+response.data.hospital._id);
          console.log("message is "+response.data.message);
          console.log("hospitalid is "+response.data.hospitalid);
   
         // console.log(response.hospital.hospitalname);
          //Storing ID of user on local system
          localStorage.setItem("hospitalid", hospitalid);
         

          handleClickOpen();
          setIsHospitalRegistered(true);
          setLoading(false);
        };
        loadUsers();
      } catch (error) {
        setErrorMessage("Error Registering Hospital");
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
                      src="http://www.semamart.com/wp-content/uploads/2023/12/Semamart-Logo-5-1024x193.png"
                      class="img-fluid"
                      alt=""
                      style={{ width: "200px" }}
                    />
                    <p class="text-center h1 fw-bold mb-5 mt-4">
                      Hospital Registration
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Hospital Name*
                          </label>
                          <input
                            id="hostpitalname"
                            name="hospitalname"
                            className="form-control"
                            value={hospitalname || values.hospitalname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.hospitalname && touched.hospitalname ? (
                            <small className="text-danger mt-1">
                              {errors.hospitalname}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Hospital Phone No*
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
                          <label htmlFor="last`" className="form-label">
                            Billing Name
                          </label>
                          <input
                            id="billingname"
                            name="billingname"
                            className="form-control"
                            value={billingname || values.billingname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.billingname && touched.billingname ? (
                            <small className="text-danger mt-1">
                              {errors.billingname}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Hospital Email*
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
                          <label htmlFor="first" className="form-label">
                            Hospital Address*
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
                            No of Beds Availaible*
                          </label>
                          <input
                            id="beds"
                            name="beds"
                            className="form-control"
                            value={beds || values.beds}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                          />
                          {errors.beds && touched.beds ? (
                            <small className="text-danger mt-1">
                              {errors.beds}
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
                            CEA Number
                          </label>
                          <input
                            id="ceanumber"
                            name="ceanumber"
                            className="form-control"
                            value={ceanumber || values.ceanumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                          />
                          {errors.ceanumber && touched.ceanumber ? (
                            <small className="text-danger mt-1">
                              {errors.ceanumber}
                            </small>
                          ) : null}
                        </div>
                       
                      </div>
                     
                      <div className="row mt-3">
                        <div className="col text-center actionButtons">
                          <Button
                            variant="secondary"
                            size="lg"
                            onClick={resetForm}
                          >
                            Clear
                          </Button>

                          <Button
                            variant="primary"
                            size="lg"
                            onClick={handleSubmit}
                          >
                            Save
                          </Button>

                          <Button
                            variant="primary"
                            size="lg"
                            onClick={handleClose}
                          >
                           Back To Dashboard
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
