import React from "react";
import { useFormik } from "formik";
import "./HospitalRegistration.css";
import { Button } from "react-bootstrap";
import { registrationSchema } from "./HospitalSchema";
import Axios from "axios"
import Dashboard from "../Dashboard/Dashboard";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";







const initialValues = {
    hospitalname: "",
    billingname: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    landmark: "",
    phone: "",
    ceanumber: "",


};


const HospitalRegistration = () => {
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

            const hospital = {
                "hospitalname": values.hospitalname,
                "billingname": values.billingname,
                "address": values.address,
                "ceanumber": values.ceanumber,
                "email": values.email,
                "phone": values.phone,
                "state": values.state,
                "district": values.district,
                "landmark": values.landmark,
                "pincode": values.pincode,
            };

            try {
                const response = Axios.post('http://localhost:4000/posthospitals', hospital);
                alert("Hospital Registered Successfully")
                ReactDOM.render(
                    <Router>
                      <Dashboard />
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
                                        <p class="text-center h1 fw-bold mb-5 mt-4">Hospital Registration</p>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="row mt-3">
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
                                                <div className="row mt-3">
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
                                                    {errors.first && touched.first ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.first}
                                                        </small>
                                                    ) : null}
                                                </div>
                                                <div className="row mt-3">
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
                                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img
                                            src="https://www.semamart.com/wp-content/uploads/2023/12/pexels-chokniti-khongchum-3938022-1024x684.jpg"
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

export default HospitalRegistration;