import { useState, React, CSSProperties } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { useFormik } from "formik";
//import "./HospitalRegistration.css";
import { Button } from "react-bootstrap";
import { loginAuth } from "./LoginAuth.js";
import Axios from "axios"
import { useNavigate, } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
const initialValues = {
    email: "",
    password: "",



};


const AdminLogin = () => {
    const [open, setOpen] = useState(false);
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();
    const navigateToRegister = () => {
        navigate('/');
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
                setLoading(true);
                // const response = await Axios.get("http://localhost:4000/users", { params: { "email": values.email, "password": values.password } })
                // let userData = (await response).data.document._id;
                // let email = (await response).data.document.email;
                // let hospitalname = (await response).data.document.hospitalname;
                // let password = (await response).data.document.password;
                // localStorage.setItem("id", userData)
                // localStorage.setItem("email", email)
                // localStorage.setItem("hospitalname", hospitalname)
                // console.log(userData);
                
                if (values.email == "pratibha" && values.password == "Pratibha7231@") {
                    localStorage.setItem("adminid", "pratibha");
                    window.location = '/admindashboard'
                    setLoading(false);
                }
                else if (values.email == "admin1" && values.password == "Admin7231@") {
                    localStorage.setItem("adminid", "admin1");
                    window.location = '/admindashboard'
                    setLoading(false);
                }
                else if (values.email == "admin2" && values.password == "Admin9111@") {
                    localStorage.setItem("adminid", "admin2");
                    window.location = '/admindashboard'
                    setLoading(false);
                }
                else {
                    //alert("No Such User")
                    handleClickOpen();
                    setLoading(false);
                }
                // localStorage.setItem("token", userData)

                // window.location = '/verify'
            };
            loadUsers();


            action.resetForm();
        },
    });


    return (
        <div className='sweet-loading'>
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
                                            <p class="text-center h1 fw-bold mb-5 mt-4">Welcome  Admin</p>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="row mt-3">
                                                        <label htmlFor="first" className="form-label">
                                                            Administrator ID*
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
                                                    <ClipLoader
                                                        color={color}
                                                        loading={loading}
                                                        cssOverride={override}
                                                        size={100}
                                                        aria-label="Loading Spinner"
                                                        data-testid="loader"
                                                    />
                                                       <div className="row mt-3">



                                                        <Button
                                                            variant="primary"
                                                            size="lg"
                                                            onClick={handleSubmit}
                                                        >
                                                            Access Hospitals
                                                        </Button>

                                                    </div>
                                                    <div className="row mt-3">
                                                        <br />
                                                        <div className="col text-center actionButtons">


                                                           
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <br />
                                                        <div className="col text-center actionButtons">


                                                            <Button
                                                                variant="secondary"
                                                                size="small"
                                                                onClick={navigateToRegister}
                                                            >
                                                                Back to Hospital Panel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>





                                            </form>
                                        </div>
                                        <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img
                                                src="http://www.semamart.com/wp-content/uploads/2023/12/MicrosoftTeams-image-39-1536x900.png"
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
                                                    {"Login Error"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        No Such User Exists? Try Again
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>Login</Button>
                                                    <Button onClick={navigateToRegister} autoFocus>
                                                        SignUp
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

export default AdminLogin;