import React from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import { loginAuth } from "./LoginAuth.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link,useNavigate } from "react-router-dom";
const initialValues = {
    email: "",
};





const EnterOtp = () => {
    const param = useParams();

    const navigate = useNavigate();
    const navigateToVerify = () => {
        navigate('/dashboard');
    }
 
const otp = localStorage.getItem("token");
const id = localStorage.getItem("id");
const code = otp.toString();

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
           // console.log(JSON.parse(localStorage.getItem('token')));
           
         
          if(values.email == code.substring(1,5)){
           
                        try {
                            const verifyEmailUrl = async () => {
                                try {
                                    const url = `http://localhost:4000/api/users/${id}/verify/${otp}`;
                                    const { data } = await axios.get(url);
                                    console.log(data);
                                    window.location = "/"
                                } catch (error) {
                                    console.log(error);
                                }
                            };
                            verifyEmailUrl();
                           // window.location = "/"
                            
                        } catch (error) {
                            console.log(error);
                        }
                
          }  
          else{
            alert("Wrong Code")
          }

            

			
            

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
                                        <p class="text-center h1 fw-bold mb-5 mt-4">Verify</p>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="row mt-3">
                                                    <label htmlFor="first" className="form-label">
                                                        Verification Code*
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
                                                
                                        
                                            </div>
                                           
                                           
                                            
                                           
                                            <div className="row mt-3">
                                               
                                                   

                                                    <Button
                                                        variant="primary"
                                                        size="lg"
                                                        onClick={handleSubmit}
                                                    >
                                                        Verify
                                                    </Button>
                                                
                                            </div>
                                            <div className="row mt-3">
                                                <br />
                                                <div className="col text-center actionButtons">
                                                  
                                                   
                                                     <Button
                                                        variant="outlined"
                                                        size="lg"
                                                        onClick={navigateToVerify}
                                                    >
                                                        Skip Verification
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

export default EnterOtp;