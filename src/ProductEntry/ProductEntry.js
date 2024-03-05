import { ProductSchema } from "./ProductEntrySchema";
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
    producttype: "",
    category: "",
    upccode: "",
    name: "",
    manufacturer: "",
    emergencytype: "",
    description: "",
    



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
        { value: "Mi", label: "Medical Instruments" },
        { value: "Me", label: "Medical Equipments" }],

      };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();
    const navigateToVerify = () => {
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
        validationSchema: ProductSchema,
        onSubmit: (values, action) => {
            console.log("1")


            const product = {
                "producttype": producttype,
                "category": category,
                "upccode": values.upccode,
                "name": values.name,
                "manufacturer": values.manufacturer,
                "emergencytype": emergency,
                "description": values.description,
              

            };

            try {
                console.log("2")
                const loadUsers = async () => {
                    setLoading(true);
                    const response = await Axios.post("http://localhost:4000/postproducts", product);
                    let userData = (await response).data.token;
                    let id = (await response).data.id;
                    console.log(userData);
                    //localStorage.setItem("token", userData)
                    //localStorage.setItem("id", id)
                    alert("Product Registered Successfully")
                    
                    
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
                alert("Error Registering/Product Already Exist")
                console.error("Error creating Product:", error);
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
                                                        id="category"
                                                        value={category}
                                                        label="category"
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
                                                    id="upccode"
                                                    name="upccode"
                                                    className="form-control"
                                                    value={values.upccode}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                
                                                   
                                                />
                                                {errors.upccode && touched.upccode ? (
                                                    <small className="text-danger mt-1">
                                                        {errors.upccode}
                                                    </small>
                                                ) : null}
                                            </div>
                                            <div className="row mt-3 w-100 ">
                                                    <label htmlFor="first" className="form-label">
                                                        Product Name
                                                    </label>
                                                    <input
                                                        id="name"
                                                        name="name"
                                                        className="form-control"
                                                        value={values.name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {errors.name && touched.name ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.name}
                                                        </small>
                                                    ) : null}
                                                

                                            </div>
                                            <div className="row mt-3 w-100">
                                                
                                                    <label htmlFor="first" className="form-label">
                                                        Manufacturer
                                                    </label>
                                                    <input
                                                        id="manufacturer"
                                                        name="manufacturer"
                                                        className="form-control"
                                                        value={values.manufacturer}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        type="text"
                                                    />
                                                    {errors.manufacturer && touched.manufacturer ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.manufacturer}
                                                        </small>
                                                    ) : null}
                                                
                                            </div>
                                            <div className="row mt-4 w-100" backgroundColor="#FFFF">
                                            
                                                
                                                    <FormControl fullWidth backgroundColor="#FFFF">
                                                        <InputLabel id="demo-simple-select-label">Emergency Type*</InputLabel>
                                                       
                                                        <Select
                                                            sx={{ backgroundColor:"#FFFF" , height:"80%"   }}
                                                            labelId="demo-simple-select-label"
                                                            id="emergencytype"
                                                            value={emergency}
                                                            label="emergencytype"
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
                                                    variant="text"
                                                    size="large"
                                                    
                                                >
                                                    Add Product Image+
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
                                                      id="description"
                                                       rows="3"   
                                                       value={values.description}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}>

                                                        </textarea>

                                                    {errors.description && touched.description ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.description}
                                                        </small>
                                                    ) : null}
                                                


                                            </div>

                                            <br />


                                            <div class="row justify-content-around">
                                                
                                                <div class="col-3">
                                                <Button variant='outlined' size='large' onClick={resetForm}>Clear</Button>
                                                </div>
                                                <br/>
                                                <br/>
                                                <div class="col-3">
                                                <Button variant='contained' size='large'onClick={handleSubmit}>Register</Button>
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