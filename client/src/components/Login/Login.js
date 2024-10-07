import { useState, React, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useFormik } from "formik";
//import "./HospitalRegistration.css";
import { Button } from "react-bootstrap";
import { loginAuth } from "./LoginAuth.js";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };
const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [open, setOpen] = useState(false);
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [showPassword, setShowPassword] = useState(false);
  const [exist, setExist] = useState(0);
  const [checked, setChecked] = useState(false);
  const [openVerificationAlert, setOpenVerificationAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleVerificationAlertOpen = () => {
    setOpenVerificationAlert(true);
  };

  const handleVerificationAlertClose = () => {
    setOpenVerificationAlert(false);
  };
  const navigate = useNavigate();
  const navigateToRegister = () => {
    navigate("/signup");
  };
  const navigateToLogin = () => {
    window.location.reload();
  };
  const navigateToAdminLogin = () => {
    navigate("/adminlogin");
  };
  console.log("checked status is " + checked);
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
    validationSchema: loginAuth,

    onSubmit: async (values, action) => {
      try {
        if (!checked) {
          const loadUsers = async () => {
            let flag = 0;
            let userFound = false;
            try {
              const url = `${process.env.REACT_APP_BASE_URL}users`;
              const { data } = await Axios.post(url, {
                email: values.email,
                password: values.password,
              },  { withCredentials: true });
              console.log(data);
  
              if (data.message === "Login successful") {
                localStorage.setItem("id", data.user._id);
                localStorage.setItem("email", data.user.email);
                const userData = localStorage.getItem("id");
                const verified = data.user.verified;
  
                flag = 1;
                userFound = true;
                console.log("verified: " + verified);
                if (verified === false) {
                  handleVerificationAlertOpen();
                  localStorage.clear();
                  window.location.reload();
                } else {
                  try {
                    const loadhos = async () => {
                      const url = `${process.env.REACT_APP_BASE_URL}hospitalbyuserid/${userData}`;
                      const { data } = await Axios.get(url);
                      // console.log("Hospital is " + data.document.hospitalname);
  
                      if (data.document != null) {
                        console.log("Current hospital id is " + data.document._id);
                        localStorage.setItem("hospitalid", data.document._id);
                        //localStorage.setItem("hospitalname", data.document[i].hospitalname);
                        //localStorage.setItem("billingname", data.document[i].billingname);
                        flag = 2;
                        console.log("flag is " + flag);
                        window.location = "/";
                      } else {
                        window.location = "/registerhospital";
                        localStorage.setItem("token", userData);
                        console.log("No Hospital Associated");
                      }
                    };
                    loadhos();
                  } catch (error) {
                    console.error("Error loading hospital data:", error.message);
                    // alert("An error occurred while fetching hospital data. Please try again.");
                  }
                }

              }
            } catch (error) {
              console.error("Error logging in user:", error.message);
              // alert("An error occurred during login. Please check your credentials and try again.");
            }
  
            if (!userFound) {
              setOpen(true);
              console.log("No Such User");
            }
          };
          await loadUsers();
        } else {
          const loadUsers = async () => {
            let userFound = false;
            try {
              const url = `${process.env.REACT_APP_BASE_URL}inventorymanagers`;
              const { data } = await Axios.post(url, {
                email: values.email,
                password: values.password,
              },{ withCredentials: true });
              console.log(data);
  
              if (data.message === "Login successful") {
                localStorage.setItem("id", data.user.userid);
                localStorage.setItem("hospitalid", data.user.hospitalid);
                localStorage.setItem("inventorymanagerid", data.user._id);
                userFound = true;
                window.location = "/";
              }
            } catch (error) {
              console.error("Error logging in inventory manager:", error.message);
              // alert("An error occurred during login. Please check your credentials and try again.");
            }
  
            if (!userFound) {
              setOpen(true);
              console.log("No Such User");
            }
          };
          await loadUsers();
        }
      } catch (error) {
        console.error("Unexpected error:", error.message);
        // alert("An unexpected error occurred. Please try again.");
      }
    },
  });
  

  return (
    <div className="sweet-loading">
      <div>
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
                        // src="http://www.semamart.com/wp-content/uploads/2023/12/Semamart-Logo-5-1024x193.png"
                        src={require("../assets/Semamart.png")}
                        class="img-fluid"
                        alt=""
                        style={{ width: "200px" }}
                      />
                      <p class="text-center h1 fw-bold mb-5 mt-4">Login</p>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="row mt-3">
                            <div className="col">
                              <label htmlFor="email" className="form-label">
                                Hospital Email*
                              </label>
                              <div className="input-field-container">
                                <input
                                  id="email"
                                  name="email"
                                  className="input-field"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  type="email"
                                />
                              </div>
                              {errors.email && touched.email ? (
                                <small className="text-danger mt-1">
                                  {errors.email}
                                </small>
                              ) : null}
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col">
                              <label htmlFor="password" className="form-label">
                                Password*
                              </label>
                              <div className="password-input-group">
                                <input
                                  id="password"
                                  name="password"
                                  className="input-field"
                                  value={values.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  type={showPassword ? "text" : "password"}
                                />
                                <div className="input-group-append">
                                  <span
                                    className="input-group-text"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={showPassword ? faEyeSlash : faEye}
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
                          <div className="row mt-2">
                            <div className="col text-left">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="inventory"
                                  name="inventory"
                                  checked={checked}
                                  onChange={handleCheckboxChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="agreeTerms"
                                >
                                  Inventory Manager
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
                            <div className="login__button-container">
                              <Button
                                variant="contained"
                                size="lg"
                                onClick={handleSubmit}
                                style={{
                                  width: "273px",

                                  backgroundColor: "#2E718A",
                                  color: "white",
                                  transition:
                                    "background-color 0.3s, color 0.3s",
                                }}
                                onMouseOver={(e) => {
                                  e.target.style.backgroundColor = "#c45516";
                                  e.target.style.color = "white";
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.backgroundColor = "#2E718A";
                                  e.target.style.color = "white";
                                }}
                              >
                                Login
                              </Button>
                            </div>
                          </div>

                          <div className="row mt-3">
                            <br />
                            <div className="login__button-container">
                              <Button
                                variant="contained"
                                className="btn"
                                size="lg"
                                onClick={navigateToRegister}
                                style={{
                                  width: "273px",

                                  backgroundColor: "#2E718A",
                                  color: "white",
                                  transition:
                                    "background-color 0.3s, color 0.3s",
                                }}
                                onMouseOver={(e) => {
                                  e.target.style.backgroundColor = "#c45516";
                                  e.target.style.color = "white";
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.backgroundColor = "#2E718A";
                                  e.target.style.color = "white";
                                }}
                              >
                                New User? Register Now
                              </Button>
                              {/* <Button
                                variant="primary"
                                className="btn"
                                size="small"
                                onClick={navigateToAdminLogin}
                              >
                                SEMA Admin Login
                              </Button> */}
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col text-center">
                              <p className="copyright-text">
                                Copyright 2024 semamart.com All Rights Reserved.
                              </p>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="http://www.semamart.com/wp-content/uploads/2023/12/doctor-in-face-mask-working-on-laptop-2021-09-02-17-15-33-utc-1024x683.jpg"
                        class="img-fluid"
                        alt=""
                      />
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Alert"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            No Such User Exists
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          {
                            <Button
                              onClick={handleClose}
                              style={{
                                backgroundColor: "#2E718A",
                                color: "white",
                                border: "none",
                              }}
                            >
                              Try Again
                            </Button>
                            /* <Button onClick={navigateToRegister} autoFocus>
                                                        SignUp
                                                    </Button> */
                          }
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        open={openVerificationAlert}
                        onClose={handleVerificationAlertClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Verification Alert"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Please Retry Again After Verification by SEMA Admin
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleVerificationAlertClose}>
                            OK
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
