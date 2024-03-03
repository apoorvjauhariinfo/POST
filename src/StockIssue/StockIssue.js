import { StockIssueSchema } from "./StockIssueSchema";
import Axios from "axios"
import { useState, React, CSSProperties } from 'react'
import { useFormik } from "formik";
//import "./HospitalRegistration.css";
import { Button } from "react-bootstrap";
import { useNavigate, } from "react-router-dom";
import Box from '@mui/material/Box';
import { Select , FormControl,InputLabel} from "@mui/material";
import { MenuItem } from "@mui/material";


const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};




const initialValues = {
    firstname: "",
    lastname: "",
    hospitalname: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    landmark: "",
    phone: "",
    registeras: "",
    password: "",



};


const StockIssue = () => {
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
    const navigateToVerify = () => {
        navigate('/verify');
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
        validationSchema: StockIssueSchema,
        onSubmit: (values, action) => {
            console.log("1")


            const post = {
                "firstname": values.firstname,
                "lastname": values.lastname,
                "email": values.email,
                "password": values.password,
                "address": values.address,
                "phone": values.phone,
                "landmark": values.landmark,
                "pincode": values.pincode,
                "district": values.district,
                "state": values.state,
                "hospitalname": values.hospitalname,
                "registeras": values.registeras,
                "verified": false,

            };

            try {
                console.log("2")
                const loadUsers = async () => {
                    setLoading(true);
                    const response = await Axios.post("http://localhost:4000/api/users", post);
                    let userData = (await response).data.token;
                    let id = (await response).data.id;
                    console.log(userData);
                    localStorage.setItem("token", userData)
                    localStorage.setItem("id", id)
                    //window.location = '/verify'
                    setLoading(false);
                    handleClickOpen();
                };
                loadUsers();

                /*try {
                    return await Axios.get('http://localhost:4000/api/users').then(content => content.data);
                  } catch (error) {
                    throw {
                      code: error.code,
                      message: error.message,
                      responseStatus: error.response?.status,
                      url
                    };
                  }*/
                /*Axios.post('http://localhost:4000/api/users',post).then(response => {
                    localStorage.setItem("token", response.message);
                    console.log(response.message)
                  });*/



                // const { user: res } =  Axios.post(url, post);
                // localStorage.setItem("token", response.message);
                //console.show(response.message)
                // window.location = "/login";
                //return <HospitalRegistration/>
                /* ReactDOM.render(
                     <Router>
                       <Login />
                     </Router>,
                     document.getElementById('root')
                   );*/
            } catch (error) {
                alert("Error Registering/User Already Exist")
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
                            <div class="card-body p-md-3">
                                <div class="col">
                                    <div class="row mt-3">

                                        <p class="text-left h3 mb-3 mt-4">Issued To:</p>
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

                                                <div className="col mt-3">
                                                    <FormControl fullWidth backgroundColor="#0000">
                                                        <InputLabel id="demo-simple-select-label">Department</InputLabel>
                                                        <Select
                                                         sx={{ backgroundColor:"#FFFF", height:"60%"   }}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={5}
                                                            label="Age"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={"Department Civil"}>Department 1</MenuItem>
                                                            <MenuItem value={"Department Mechanical"}>Department 2</MenuItem>
                                                            <MenuItem value={"Department Chemical"}>Department 3</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <br />
                                                <br />
                                                <br />

                                                <p class="text-left h3  mb-3 mt-4">Stock Issued:</p>
                                                <div className="col">
                                                    <div className="row">
                                                        <div className="row">
                                                            <label htmlFor="first" className="form-label">
                                                                Product UPC/Product Name/Manufacturer
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

                                                        <div className="row">

                                                            <div className="col text-left">
                                                                <label htmlFor="first" className="form-label">
                                                                    Product Name
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
                                                            <div className="col text-left">
                                                                <label htmlFor="last`" className="form-label">
                                                                    Manufacturer
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
                                                        <div className="row">
                                                            <label htmlFor="last`" className="form-label">
                                                                Quantity Issued*
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
                                                </div>
                                                <div className="col">
                                                    <div class="col md-5 ">



                                                        <div class="row  mt-3">

                                                            <img
                                                           src="https://www.shutterstock.com/image-vector/camera-plus-line-icon-add-260nw-1589203135.jpg"
                                                                height={200}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <br />


                                                        <div class="row align-items-right">

                                                            <div class="col">

                                                                <Button
                                                                    variant="primary"
                                                                    size="lg"
                                                                    onClick={resetForm}
                                                                >
                                                                    Add +
                                                                </Button>

                                                            </div>

                                                        </div>


                                                    </div>
                                                </div>
                                            </div>


                                        </form>
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

export default StockIssue;