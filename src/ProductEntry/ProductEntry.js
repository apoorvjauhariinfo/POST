import { StockSchema } from "./ProductEntrySchema";
import Axios from "axios"
import { useState, React, CSSProperties } from 'react'
import { useFormik } from "formik";
import "./ProductEntry.css";
//import { Button } from "react-bootstrap";
import { useNavigate, } from "react-router-dom";
import Box from '@mui/material/Box';
import { Select, FormControl, InputLabel,FormHelperText } from "@mui/material";
import { MenuItem,Button } from "@mui/material";


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


const ProductEntry = () => {
    const [open, setOpen] = useState(false);

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    let[producttype,setProductType] = useState("")
    let[category,setCategory] = useState("")
    let[emergency,setEmergency] = useState("")


    const selectionChangeHandler = (event) => {
        setProductType(event.target.value);
      };
      const selectionChangeHandler2 = (event) => {
        setCategory(event.target.value);
      };
      const selectionChangeHandler3 = (event) => {
        setEmergency(event.target.value);
      };
    const prodMap = {
        "Ph": [
            { value: "Ph", label: "Pharmaceuticals" },

            { value: "Dt", label: "Dietarty Supplements" },
            { value: "Am", label: "Ayush Medicines" },
            { value: "Mc", label: "Medical Consumables" }
        ],
        "Eq": [{ value: "Mf", label: "Medical Furniture" },
        { value: "Mf", label: "Medical Instruments" },
        { value: "Mf", label: "Medical Equipments" }],

      };
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
        validationSchema: StockSchema,
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
                    <div class="col">
                        <div class="card text-black" style={{ borderRadius: "25px" }}>
                            <div class="card-body p-md-3">
                                <div class="row">
                                    <div class="col">

                                        <p class="text-left h2  mb-3 mt-4">Product Information:</p>
                                        <form onSubmit={handleSubmit}>

                                            <div className="row mt-3  w-100">
                                                <FormControl   fullWidth backgroundColor="#FFFF" >
                                                    <InputLabel  id="demo-simple-select-label">Product Type</InputLabel>
                                                    <Select
                                                         sx={{ backgroundColor:"#FFFF" , height:"80%"   }}
                                                        labelId="demo-simple-select-label"
                                                        id="product-type"
                                                        value={producttype}
                                                        label="Product Type"
                                                        onChange={selectionChangeHandler}
                                                    >
                                                        <MenuItem value={"Ph"}>Pharmaceutical</MenuItem>
                                                        <MenuItem value={"Eq"}>Equipment</MenuItem>
                                                        
                                                    </Select>

                                                </FormControl>
                                            </div>
                                            <div className="row mt-3 w-100">
                                                <FormControl fullWidth backgroundColor="#FFFF">
                                                    <InputLabel id="demo-simple-select-label">Category*</InputLabel>
                                                    <Select
                                                     sx={{ backgroundColor:"#FFFF", height:"80%"   }}
                                                        labelId="demo-simple-select-label"
                                                        id="Category"
                                                        value={category}
                                                        label="Category"
                                                        onChange={selectionChangeHandler2}
                                                    >


                                                        {prodMap[producttype]
                                                            ? prodMap[producttype].map(function (item) {
                                                                return <MenuItem value={item.value}>{item.label}</MenuItem>;
                                                            })
                                                            : ""}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="row mt-3 w-100">
                                                <label htmlFor="last`" className="form-label">
                                                    Product UPC/Product Name/Manufacturer
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
                                            <div className="row mt-3 w-100 ">
                                                    <label htmlFor="first" className="form-label">
                                                        Product Name
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
                                            <div className="row mt-3 w-100">
                                                
                                                    <label htmlFor="first" className="form-label">
                                                        Manufacturer
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
                                            <div className="row mt-4 w-100" backgroundColor="#FFFF">
                                            
                                                
                                                    <FormControl fullWidth backgroundColor="#FFFF">
                                                        <InputLabel id="demo-simple-select-label">Emergency Type*</InputLabel>
                                                       
                                                        <Select
                                                            sx={{ backgroundColor:"#FFFF" , height:"80%"   }}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={emergency}
                                                            label="Emergency"
                                                            onChange={selectionChangeHandler3}
                                                        >
                                                            <MenuItem value={"Cr"}>Critical</MenuItem>
                                                            <MenuItem value={"Is"}>Issued</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                
                                            </div>
                                        </form>
                                    </div>

                                    <div class="col md-5 ">
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        
                                        
                                        <div class="row w-100 ">

                                            <img
                                                src="https://www.shutterstock.com/image-vector/camera-plus-line-icon-add-260nw-1589203135.jpg"
                                                height={400}
                                                
                                                alt=""
                                            />
                                        </div>
                                        <br />


                                        <div class="row w-100">

                                           

                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    
                                                >
                                                    Add Product Image
                                                </Button>

                                            

                                        </div>


                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="row">


                                        <form onSubmit={handleSubmit}>
                                            <div className="row w-120" >
                                                
                                                    <label htmlFor="first" className="form-label">
                                                        Product Description*
                                                    </label>
                                           
                                                      <textarea 
                                                      class="form-control" 
                                                      id="exampleFormControlTextarea1"
                                                       rows="3"   
                                                       value={values.firstname}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}>

                                                        </textarea>

                                                    {errors.firstname && touched.firstname ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.firstname}
                                                        </small>
                                                    ) : null}
                                                


                                            </div>

                                            <br />


                                            <div class="row justify-content-around">
                                                
                                                <div class="col-3">
                                                <Button variant='outlined' size='large' >Clear</Button>
                                                </div>
                                                <br/>
                                                <br/>
                                                <div class="col-3">
                                                <Button variant='contained' size='large'>Sumbit</Button>
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

export default ProductEntry;