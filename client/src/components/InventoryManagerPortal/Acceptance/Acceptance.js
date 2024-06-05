import { registrationSchema } from "./UserSchema.js";
import Axios from "axios";
import axios from "axios";

import { useState, useEffect, React, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useFormik } from "formik";
import { MenuItem } from "@mui/material";

import "./Acceptance.css";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Select, FormControl, InputLabel, FormHelperText } from "@mui/material";
import LoaderOverlay from "../../Loader/LoaderOverlay.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PopupMessage from "../../PopupMessage/PopupMessage.js";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const initialValues = {

  password: "",
  confirmPassword: "",
  agreeTerms: false,
};

const currentURL = window.location.href;
console.log("Current URL:", currentURL);
const inventorymanagerid = currentURL.split("/").pop();
console.log("Current URL:", inventorymanagerid);

const Acceptance = () => {
  const [open, setOpen] = useState(false);
  const [registeras, setRegisteras] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (isUserRegistered) {
      const timer = setTimeout(() => {
        // window.location = "/registerhospital"; // Reload the page after the desired delay
      }, 2000); // Adjust the delay as needed (in milliseconds)

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
  const navigate = useNavigate();
  const navigateToVerify = () => {
    navigate("/verify");
  };
  const selectionChangeHandler = (event) => {
    setRegisteras(event.target.value);
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
      console.log("1");

      const post = {

        password: values.password,

      };

      try {
        console.log("2");
        const loadUsers = async () => {
          setLoading(true);
          const response = await axios.put(
            "http://localhost:4000/updateim/" + inventorymanagerid,
            {
              _id: inventorymanagerid.toString(),
              password: values.password,
              status: "accepted",
            }
          );
          let userData = (await response).data;
          console.log(userData);
          setLoading(false);
          setShowSuccessModal(true);
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
        <PopupMessage message="Registration Successful. OTP has been sent to your email." />
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
                      Confirmation
                    </p>
                    <form onSubmit={handleSubmit}>


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
                          {errors.confirmPassword && touched.confirmPassword ? (
                            <small className="text-danger mt-1">
                              {errors.confirmPassword}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col text-left">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="agreeTerms"
                              name="agreeTerms"
                              checked={values.agreeTerms}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="agreeTerms"
                            >
                              I accept
                            </label>
                          </div>
                          {errors.agreeTerms && touched.agreeTerms ? (
                            <small className="text-danger mt-1">
                              {errors.agreeTerms}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col text-center actionButtons">


                          <Button
                            variant="primary"
                            size="lg"
                            onClick={handleSubmit}
                          >
                            Continue
                          </Button>
                        </div>
                      </div>
                      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Account Details Updated</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>Your account details have been successfully updated.</p>
                          <img
                            src="https://example.com/green-tick.png"
                            alt="Green tick icon"
                            style={{ width: "50px", height: "50px" }}
                          />
                        </Modal.Body>
                        <Modal.Footer>
                         
                          <Button variant="secondary" onClick={handleLogin}>
                            Login
                          </Button>
                        </Modal.Footer>
                      </Modal>
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

export default Acceptance;
