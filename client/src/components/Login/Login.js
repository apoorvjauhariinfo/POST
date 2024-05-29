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

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    onSubmit: (values, action) => {
      const loadUsers = async () => {
        let flag = 0;

        const url = `${process.env.REACT_APP_BASE_URL}users`;
        const { data } = await Axios.get(url);

        for (let a = 0; a < data.document.length; a++) {
          if (
            values.email == data.document[a].email &&
            values.password == data.document[a].password
          ) {
            localStorage.setItem("id", data.document[a]._id);
            localStorage.setItem("email", data.document[a].email);
            localStorage.setItem("hospitalname", data.document[a].hospitalname);
            console.log("User Exist and his id is " + data.document[a]._id);
            const userData = localStorage.getItem("id");

            flag = 1;
            console.log("flag is " + flag);

            //Needs to Implement Other Test Cases Too.
            const loadhos = async () => {
              const url = `${process.env.REACT_APP_BASE_URL}hospitals`;
              const { data } = await Axios.get(url);
              console.log("First Hospital is " + data.document[0].userid);
              for (let i = 0; i < data.document.length; i++) {
                if (userData == data.document[i].userid) {
                  console.log("Current hospital id is " + data.document[i]._id);
                  localStorage.setItem("hospitalid", data.document[i]._id);
                  localStorage.setItem(
                    "hospitalname",
                    data.document[i].hospitalname
                  );
                  localStorage.setItem(
                    "billingname",
                    data.document[i].billingname
                  );
                  flag = 2;
                  console.log("flag is " + flag);
                  window.location = "/";
                  break;
                } else if (
                  i == data.document.length - 1 &&
                  userData != data.document[i].userid
                ) {
                  window.loaction = "/registerhospital";
                  console.log("No Hospital Associated");
                }
              }
            };
            loadhos();
            console.log("flag is " + flag);

            //window.location = '/verify'
          } else {
            if (
              values.email != data.document[a].email &&
              values.password != data.document[a].password &&
              a == data.document.length - 1
            ) {
              setExist(-1);
              console.log("No Such User");
              setLoading(true);
              //alert("No Such User Exist");
              setOpen(true);
              //window.location = "/signup";
            }
          }
        }

        console.log("flag is " + flag);
      };
      loadUsers();

      action.resetForm();
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
                        src="http://www.semamart.com/wp-content/uploads/2023/12/Semamart-Logo-5-1024x193.png"
                        class="img-fluid"
                        alt=""
                        style={{ width: "200px" }}
                      />
                      <p class="text-center h1 fw-bold mb-5 mt-4">Login</p>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="row mt-3">
                            <label htmlFor="first" className="form-label">
                              Hospital ID*
                            </label>
                            <input
                              id="email"
                              name="email"
                              className="form-control"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="email"
                            />
                            {errors.email && touched.email ? (
                              <small className="text-danger mt-1">
                                {errors.email}
                              </small>
                            ) : null}
                          </div>

                          <div className="row mt-3">
                            <label htmlFor="last" className="form-label">
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

                          <div className="row mt-3">
                            <Button
                              variant="primary"
                              size="lg"
                              onClick={handleSubmit}
                            >
                              Login
                            </Button>
                          </div>
                          <div className="row mt-3">
                            <br />
                            <div className="login__button-container">
                              <Button
                                variant="outlined"
                                size="lg"
                                onClick={navigateToRegister}
                              >
                                New User? SignUp
                              </Button>
                              <Button
                                variant="primary"
                                size="small"
                                onClick={navigateToAdminLogin}
                              >
                                SEMA Admin Login
                              </Button>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <br />
                            <div className="col text-center actionButtons">
                              <h5>
                                Copyright 2024 semamart.com All Rights Reserved.
                              </h5>
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
                            Finding User ....
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          {/* <Button onClick={navigateToLogin}>Login</Button>
                                                    <Button onClick={navigateToRegister} autoFocus>
                                                        SignUp
                                                    </Button> */}
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
