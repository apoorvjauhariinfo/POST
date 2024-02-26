import React from "react";
import { useFormik } from "formik";
//import "./HospitalRegistration.css";
import { Button } from "react-bootstrap";
import { loginAuth } from "./LoginAuth.js";
import Axios from "axios"
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { User } from "../Models/User.js";
import Dashboard from "../Dashboard/Dashboard.js";
import UserRegistration from "../UserRegistration/UserRegistration.js";
import { Route, Routes, useNavigate, } from "react-router-dom";
import {Text} from "react"








const initialValues = {
    email: "",
    password: "",
   


};


const Login = () => {
    const navigate = useNavigate();
    const navigateToRegister = () => {
        navigate('/signup');
    }
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
                    
                const response = await Axios.get("http://localhost:4000/users",{params:{"email":values.email,"password":values.password}})
                let userData = (await response).data.document._id;
                let email = (await response).data.document.email;
                let hospitalname = (await response).data.document.hospitalname;
                let password = (await response).data.document.password;
                localStorage.setItem("id", userData)
                localStorage.setItem("email", email)
                localStorage.setItem("hospitalname", hospitalname)
                console.log(userData);
                if(values.email == email && values.password == password){
                    window.location = '/'
                }
                else{
                    alert("No Such User")
                }
               // localStorage.setItem("token", userData)
               
               // window.location = '/verify'
            };
            loadUsers();
                                     
           
             action.resetForm();
        },
    });
  

    return (
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
                                            src="https://www.semamart.com/wp-content/uploads/2023/12/Semamart-Logo-5-1024x193.png"
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
                                                    <label htmlFor="last`" className="form-label">
                                                        Password*
                                                    </label>
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        className="form-control"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        type="password"
                                                    />
                                                    {errors.password && touched.password ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.password}
                                                        </small>
                                                    ) : null}
                                                </div>
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
                                                <div className="col text-center actionButtons">
                                                  
                                                   
                                                     <Button
                                                        variant="outlined"
                                                        size="lg"
                                                        onClick={navigateToRegister}
                                                    >
                                                        New User? SignUp
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img
                                            src="https://www.semamart.com/wp-content/uploads/2023/12/doctor-in-face-mask-working-on-laptop-2021-09-02-17-15-33-utc-1024x683.jpg"
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
        </div>
    );
};

export default Login;