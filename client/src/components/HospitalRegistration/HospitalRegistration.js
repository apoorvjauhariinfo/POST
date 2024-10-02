import { useState, useEffect, React, CSSProperties } from "react";
import { useFormik } from "formik";

import "./HospitalRegistration.css";
import { Button } from "react-bootstrap";
import { registrationSchema } from "./HospitalSchema";
import Axios from "axios";
import Dashboard from "../Dashboard/Dashboard";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoaderOverlay from "../Loader/LoaderOverlay.js";
import PopupMessage from "../PopupMessage/PopupMessage.js";

import AlertDialog from "../UI/AlertDialog";
import { showExpiredPackageVersionError } from "@mui/x-license-pro";

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

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
  profileImage: null,
};

const HospitalRegistration = () => {
  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [isHospitalRegistered, setIsHospitalRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const otp = localStorage.getItem("token");
  const code = otp.toString();
  console.log("Code is " + code);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSignUp = () => {
    setOpen(true);
  };

  const handleClose = () => {
    localStorage.clear();
    window.location = "/signup";
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isHospitalRegistered) {
      const timer = setTimeout(() => {
        window.location = "/adddepartmentnew"; // Reload the page after the desired delay
      }, 2000); // Adjust the delay as needed (in milliseconds)

      return () => clearTimeout(timer);
    }
  }, [isHospitalRegistered]);
  const navigateToDashboard = () => {
    navigate("/adddepartmentnew");
  };
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Get day and add leading zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    
    return `${day}/${month}/${year}`;
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
        profileImage: values.profileImage,
        registrationdate: getCurrentDate(), // Set the current date in DD/MM/YYYY format

      };
      if (values.code == code.substring(1, 5)) {
        try {
          const loadUsers = async () => {
            setLoading(true);
            const response = await Axios.post(
              `${process.env.REACT_APP_BASE_URL}posthospitals`,

              hospital,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              },
            );
            //window.location="/adddepartmentnew"
            console.log("Post created:", response.data);

            let hospitalid = response.data.hospital._id;

            console.log("hospitalid is " + response.data.hospital._id);
            console.log("message is " + response.data.message);
            console.log("hospitalid is " + response.data.hospitalid);

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
      } else {
        setShowAlertDialog(true);
        // alert("Invalid OTP");
      }
    },
  });

  return (
    <div>
      {isHospitalRegistered && (
        <PopupMessage message="Hospital Registered Successfully. Thank you for registering!" />
      )}
      {errorMessage && <PopupMessage message={errorMessage} />}

      <LoaderOverlay loading={loading} />
      <AlertDialog
        open={showAlertDialog}
        onClose={() => setShowAlertDialog(false)}
        text="Invalid OTP"
      />

      <section
        class="p-5 w-100"
        style={{ backgroundColor: "#eeeee", borderRadius: ".5rem .5rem 0 0" }}
      >
        <div class="row">
          <div class="col-12">
            <p class="text-center h4 fw-bold ">
              {localStorage.getItem("email")}
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
                            value={values.hospitalname}
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
                            value={values.phone}
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
                            value={values.billingname}
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
                            value={values.email}
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
                            No of Beds Available*
                          </label>
                          <input
                            id="beds"
                            name="beds"
                            className="form-control"
                            value={values.beds}
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
                            Hospital Address*
                          </label>
                          <input
                            id="address"
                            name="address"
                            className="form-control"
                            value={values.address}
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
                            value={values.landmark}
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
                            value={values.pincode}
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
                            value={values.district}
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
                            value={values.state}
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
                            value={values.ceanumber}
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
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Please enter the OTP sent to your registered email
                            address*
                          </label>
                          <input
                            id="code"
                            name="code"
                            className="form-control"
                            value={values.code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                          />
                          {errors.code && touched.code ? (
                            <small className="text-danger mt-1">
                              {errors.code}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col text-center actionButtons">
                          <Button
                            style={{
                              width: "100%",
                              whiteSpace: "nowrap",
                            }}
                            size="lg"
                            onClick={handleClose}
                          >
                            Sign Up Via Different User
                          </Button>
                          <Button
                            // variant="secondary"
                            size="lg"
                            onClick={resetForm}
                          >
                            Clear
                          </Button>

                          <Button
                            // variant="primary"
                            size="lg"
                            onClick={handleSubmit}
                          >
                            Register
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
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <div className="image-upload-container">
                      <Box
                        sx={{
                          border: "1px solid black",
                          borderRadius: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          height: 400,
                        }}
                      >
                        {!values.profileImage && (
                          <img
                            width="96"
                            height="96"
                            src="http://img.icons8.com/color/96/add-image.png"
                            alt="add-image"
                          />
                        )}
                        {values.profileImage && (
                          <img
                            src={URL.createObjectURL(values.profileImage)}
                            alt="profile-preview"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                        )}
                        <input
                          type="file"
                          name="profileImage"
                          onChange={(e) => {
                            setProfileImage(e.target.files[0]);
                            values.profileImage = e.target.files[0];

                            // setFieldValue(
                            //   "productImage",
                            //   e.target.files[0]
                            // );
                          }}
                          style={{ display: "none" }}
                          id="profile-image-input"
                        />
                      </Box>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById("profile-image-input")
                            .click();
                        }}
                        className="image-upload-button"
                      >
                        {values.profileImage
                          ? "Change Logo"
                          : "Add Hospital Logo"}
                      </Button>
                      {errors.profileImage && touched.profileImage ? (
                        <small className="text-danger mt-1">
                          {errors.profileImage}
                        </small>
                      ) : null}
                      <h4
                        style={{
                          marginTop: "20px",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          backgroundColor: "#fff",
                          fontSize: "16px",
                          lineHeight: "1.5",
                          textAlign: "center",
                          width: "80%",
                          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        Standard Dimensions: 1:1, 1080x1080 pixels. <br />
                        File type: JPG, JPEG, PNG <br />
                        Maximum Size: 1 MB
                      </h4>
                    </div>
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

export default HospitalRegistration;
