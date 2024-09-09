import { registrationSchema } from "./UserSchema.js";
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

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

const userid = localStorage.getItem("id");
const imid = localStorage.getItem("inventorymanagerid");

const initialValues = {
  name: "",
  phone: "",
  email: "",
  passowrd: "",
  confirmPassword: "",
 
};
const EditIMDetails = () => {
  const [open, setOpen] = useState(false);
  const [registeras, setRegisteras] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const [isIMRegistered, setIsIMRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editableFields, setEditableFields] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage,setDialogMessage] = useState("");

  const handleDialogOpen = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
  };
  useEffect(() => {
    if (isIMRegistered) {
      const timer = setTimeout(() => {
        window.location = "/"; // Reload the page after the desired delay
      }, 3000); // Adjust the delay as needed (in milliseconds)

      return () => clearTimeout(timer);
    }
  }, [isIMRegistered]);

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
      const url = `${process.env.REACT_APP_BASE_URL}imbyid/${imid}`;

      const { data } = await axios.get(url);
      console.log(data.document[0]);
      console.log(userid);
     
          setName(data.document[0].name);
          setPhone(data.document[0].phone);
          setEmail(data.document[0].email);
          setPassword(data.document[0].password);
          console.log("First name: " + data.document[0].name);
       
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
          console.log("lastname is " + values.name);
          const response = await axios.put(
            `${process.env.REACT_APP_BASE_URL}updateexistingim/` +
              imid.toString(),
            {
              _id: imid.toString(),
              name: values.name || name,
              phone: values.phone || phone,
              email: values.email || email,
              password: values.password || password,
             
            }
          );
          let userData = (await response).data;
          console.log(userData);
          window.location = "/";
        };
        loadUsers();
      } catch (error) {
        handleDialogOpen("Error Registering/User Already Exist");
        console.error("Error creating post:", error);
      }
    },
  });

  return (
    <div>
      {isIMRegistered && <PopupMessage message="Account Details Updated" />}
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
                      src={require("../assets/Semamart.png")}
                      class="img-fluid"
                      alt=""
                      style={{ width: "200px" }}
                    />
                    <p class="text-center h1 fw-bold mb-5 mt-4">
                      Edit Profile Details
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Name
                          </label>
                          <div className="input-group">
                            <input
                              id="name"
                              name="name"
                              className="form-control"
                              placeholder={name}
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={!editableFields.name}
                            />
                            <div className="input-group-append">
                              <span
                                className="input-group-text"
                                onClick={() => toggleEditable("name")}
                                style={{ marginLeft: "10px" }} // Add additional margin to the left side
                              >
                                <FontAwesomeIcon
                                  icon={
                                    editableFields.name ? faLock : faEdit
                                  }
                                />
                              </span>
                            </div>
                          </div>
                          {errors.name && touched.name ? (
                            <small className="text-danger mt-1">
                              {errors.name}
                            </small>
                          ) : null}
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
                          {errors.password && touched.password ? (
                            <small className="text-danger mt-1">
                              {errors.password}
                            </small>
                          ) : null}
                        </div>
                      </div>
{/* 
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
                          {errors.confirmPassword && touched.confirmPassword ? (
                            <small className="text-danger mt-1">
                              {errors.confirmPassword}
                            </small>
                          ) : null}
                        </div>
                      </div> */}

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
                             <Button  onClick={handleHome}>
                            Cancel
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
               
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {
  openDialog && <PopupMessage message={dialogMessage} visibility={openDialog} />
}
    </div>
  );
};

export default EditIMDetails;
