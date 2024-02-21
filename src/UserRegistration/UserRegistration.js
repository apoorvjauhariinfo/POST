import React from "react";
import { useFormik } from "formik";
import "./UserRegistration.css";
import { Button } from "react-bootstrap";
import { registrationSchema } from "./UserSchema";
import Axios from "axios"
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import HospitalRegistration from "../HospitalRegistration/HospitalRegistration";







const initialValues = {
    firstname: "",
    lastname:"",
    hospitalname: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    landmark: "",
    phone: "",
    registeras: "",


};


const UserRegistration = () => {
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


           /* Axios.get('http://localhost:4000/hospitals', {


            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

            const User = require("./schema.js"); */

            const user = {
                "hospitalname": values.hospitalname,
                "registeras": values.registeras,
                "address": values.address,
                "firstname": values.firstname,
                "lastname": values.lastname,
                "email": values.email,
                "phone": values.phone,
                "state": values.state,
                "district": values.district,
                "landmark": values.landmark,
                "pincode": values.pincode,
            };

            try {
                const response = Axios.post('http://localhost:4000/postusers', user);
               // alert("User Created Successfully")
                //return <HospitalRegistration/>
                ReactDOM.render(
                    <Router>
                      <HospitalRegistration />
                    </Router>,
                    document.getElementById('root')
                  );
                console.log("Post created:", response.data);
            } catch (error) {
                alert("Error Registering")
                console.error("Error creating post:", error);
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
                                        <p class="text-center h1 fw-bold mb-5 mt-4">User Registration</p>
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
                                                        value={values.firstname}
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
                                                        value={values.lastname}
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
                                                <div className="row mt-3">
                                                    <label htmlFor="last`" className="form-label">
                                                        Phone
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
                                                    <label htmlFor="first" className="form-label">
                                                         Email*
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
                                                         Address*
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
                                                        Hospital Name
                                                    </label>
                                                    <input
                                                        id="hospitalname"
                                                        name="hospitalname"
                                                        className="form-control"
                                                        value={values.hospitalname}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        type="text"
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
                                                        Register As*
                                                    </label>
                                                    <input
                                                        id="registeras"
                                                        name="registeras"
                                                        className="form-control"
                                                        value={values.registeras}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        type="text"
                                                    />
                                                    {errors.registeras && touched.registeras ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.registeras}
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
                                                        Register User
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
                                            src="https://www.semamart.com/wp-content/uploads/2024/01/medical-banner-with-doctor-working-laptop-1024x683.jpg"
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

export default UserRegistration;