import { ProductSchema } from "./ProductEntrySchema";
import Axios from "axios"
import { useState, React, CSSProperties } from 'react'
import { useFormik } from "formik";
import "./ProductEntry.css";
import { Button } from "react-bootstrap";
import { useNavigate, } from "react-router-dom";
import Box from '@mui/material/Box';
import { Select, FormControl, InputLabel,FormHelperText } from "@mui/material";
import { MenuItem } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import LoaderOverlay from '../Loader/LoaderOverlay.js';








const initialValues = {
    producttype: "",
    category: "",
    subcategory:"",
    upccode: "",
    name: "",
    manufacturer: "",
    origin:"",
    emergencytype: "",
    description: "",




};


const ProductEntry = () => {

    let [loading, setLoading] = useState(false);
    let [producttype, setProductType] = useState("")
    let [category, setCategory] = useState("")
    let [subcategory, setSubCategory] = useState("")
    let [emergency, setEmergency] = useState("")
    let [origin, setOrigin] = useState("")
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const selectionChangeHandler = (event) => {
        setProductType(event.target.value);
    };
    const selectionChangeHandler2 = (event) => {
        setCategory(event.target.value);
    };
    const selectionChangeHandler3 = (event) => {
        setEmergency(event.target.value);
    };
    
    const selectionChangeHandler5 = (event) => {
        setSubCategory(event.target.value);
    };
    const selectionChangeHandler6 = (event) => {
        setOrigin(event.target.value);
    };
    const prodMap = {
        "Pharmaceuticals": [
            { value: "Pharmaceuticals", label: "Pharmaceuticals" },

            { value: "Dietary", label: "Dietarty Supplements" },
            { value: "Ayush", label: "Ayush Medicines" },
            { value: "Medical", label: "Medical Consumables" }
        ],
        "Equipments": [{ value: "Furniture", label: "Medical Furniture" },
        { value: "Instruments", label: "Medical Instruments" },
        { value: "Equipments", label: "Medical Equipments" }],

    };
    const subcatMap = {
        "Pharmaceuticals": [
            { value: "Cardiovascular", label: "Cardiovascular Medications" },

            { value: "Hormones", label: "Hormones" },
            { value: "Inhalable", label: "Inhalable Medications" },
            { value: "Oral", label: "Oral Medications" },
            { value: "Topical", label: "Topical Medications" }
        ],
        "Dietary": [{ value: "Amino", label: "Amino Acid Supplements" },
        { value: "Probiotics", label: "Prebiotics and Prebiotics" },
        { value: "Skincare", label: "Skincare Neutraceuticals" },
        { value: "Supplements", label: "Supplements" },
        { value: "Vitamins", label: "Vitamins and Minerals" }],
        "Ayush": [{ value: "Ayurvedic", label: "Ayurvedic Medicines" },
        { value: "Herbal", label: "Herbal Extracts" },
        { value: "HerbalS", label: "Herbal Supplements" }],
        "Medical": [{ value: "Cathelers", label: "Cathelers and Tubes" },
        { value: "Dental", label: "Dental Consumables" },
        { value: "Infection", label: "Infection Control Consumables" },
        { value: "Laboratory", label: "Laboratory Consumables" },
        { value: "Radiology", label: "Radiology Consumables" },
        { value: "Respiratory", label: "Respiratory Consumables" },
        { value: "Surgical", label: "Surgical Consumables" },
        { value: "Wound", label: "Wound Care Supplies" }],
        "Furniture": [{ value: "Bed", label: "Patient Bed Furniture" },
        { value: "Seating", label: "Seating Furniture" },
        { value: "Storage", label: "Storage Furniture" },
        { value: "Diagnostic Furniture", label: "Diagnostic Furniture" },
        { value: "Patient Room Furniture", label: "Patient Room Furniture" },
        { value: "Rehabilitation Furniture", label: "Rehabilitation Furniture" },
        { value: "Laboratory Furniture", label: "Laboratory Furniture" },
        { value: "Waiting Area Furniture", label: "Waiting Area Furniture" },
        { value: "Surgical Room Furniture", label: "Surgical Room Furniture" },
        { value: "Privacy Furniture", label: "Privacy Furniture" }],
        "Instruments": [{ value: "Diagnostic Instruments", label: "Diagnostic Instruments" },
        { value: "Surgical Instruments", label: "Surgical Instruments" },
        { value: "Endoscopy Instruments", label: "Endoscopy Instruments" },
        { value: "Orthopedic Instruments", label: "Orthopedic Instruments" },
        { value: "Dental Instruments", label: "Dental Instruments" },
        { value: "Gynecological and Obstetric Instruments", label: "Gynecological and Obstetric Instruments" },
        { value: "Cardiac Instruments", label: "Cardiac Instruments" },
        { value: "Microsurgical Instruments", label: "Microsurgical Instruments" },
        { value: "Neurosurgical Instruments", label: "Neurosurgical Instruments " },
        { value: "Urological Instruments", label: "Urological Instruments" }],

        "Equipments": [{ value: "Diagnostic Equipment", label: "Diagnostic Equipment" },
        { value: "Monitoring Equipment", label: "Monitoring Equipment" },
        { value: "Therapeutic Equipment", label: "Therapeutic Equipment" },
        { value: "Surgical Equipment", label: "Surgical Equipment" },
        { value: "Rehabilitation Equipment", label: "Rehabilitation Equipment" },
        { value: "Patient Care Equipment", label: "Patient Care Equipment" },
        { value: "Laboratory Equipment", label: "Laboratory Equipment" },
        { value: "Emergency Medical Equipment", label: "Emergency Medical Equipment" },
        { value: "Radiation Therapy Equipment", label: "Radiation Therapy Equipment" }]

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
                "hospitalid":localStorage.getItem("hospitalid"),
                "producttype": producttype,
                "category": category,
                "subcategory":subcategory,
                "upccode": values.upccode,
                "name": values.name,
                "manufacturer": values.manufacturer,
                "origin":origin,
                "emergencytype": emergency,
                "description": values.description,
              

            };

            try {
                console.log("2")
                const loadUsers = async () => {
                    setLoading(true);
                    const response = await Axios.post("http://hintel.semamart.com/postproducts", product);
                    window.location = '/productentry'
                    setLoading(false);
                    setOpen(true);

                    
                    
                };
                loadUsers();

             
            } catch (error) {
                alert("Error Registering/Product Already Exist")
                console.error("Error creating Product:", error);
                setLoading(false);

            }
            action.resetForm();
        },
    });

    return (
        <div>
             <LoaderOverlay loading={loading}/>
            <section
                class="p-5 w-100"
                style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
            >
                <div class="row">
                    <div class="col">
                        <div class="card text-black" style={{ borderRadius: "25px" }}>
                            <div class="card-body p-md-3">
                            <form onSubmit={handleSubmit}>
                                <div class="row">
                                    <div class="col">

                                        <p class="text-left h2  mb-3 mt-4">Product Information:</p>
                                        

                                            <div className="row mt-3  w-100">
                                                
                                                    <InputLabel  id="demo-simple-select-label">Product Type*</InputLabel>
                                                    <Select
                                                         sx={{ backgroundColor:"#FFFF" , height:"50%"   }}
                                                        labelId="demo-simple-select-label"
                                                        id="product-type"
                                                        value={producttype}
                                                        label="Product Type"
                                                        onChange={selectionChangeHandler}
                                                    >
                                                        <MenuItem value={"Pharmaceuticals"}>Pharmaceutical</MenuItem>
                                                        <MenuItem value={"Equipments"}>Equipment</MenuItem>
                                                        
                                                    </Select>
                                                    {errors.producttype && touched.producttype ? (
                                                    <small className="text-danger mt-1">
                                                        {errors.producttype}
                                                    </small>
                                                ) : null}

                                               
                                            </div>
                                            <div className="row mt-3 w-100">
                                               
                                                    <InputLabel id="demo-simple-select-label">Category*</InputLabel>
                                                    <Select
                                                     sx={{ backgroundColor:"#FFFF", height:"50%"   }}
                                                        labelId="demo-simple-select-label"
                                                        id="category"
                                                        value={category}
                                                        label="category"
                                                        onChange={selectionChangeHandler2}
                                                        className="form-control"
                                                    >


                                                        {prodMap[producttype]
                                                            ? prodMap[producttype].map(function (item) {
                                                                return <MenuItem value={item.value}>{item.label}</MenuItem>;
                                                            })
                                                            : ""}
                                                    </Select>
                                                    {errors.category && touched.category ? (
                                                    <small className="text-danger mt-1">
                                                        {errors.category}
                                                    </small>
                                                ) : null}

                                               
                                            </div>
                                            <div className="row mt-3 w-100">
                                               
                                                    <InputLabel id="demo-simple-select-label">Sub Category*</InputLabel>
                                                    <Select
                                                     sx={{ backgroundColor:"#FFFF", height:"50%"   }}
                                                        labelId="demo-simple-select-label"
                                                        id="category"
                                                        value={subcategory}
                                                        label="category"
                                                        onChange={selectionChangeHandler5}
                                                        className="form-control"
                                                    >


                                                        {subcatMap[category]
                                                            ? subcatMap[category].map(function (item) {
                                                                return <MenuItem value={item.value}>{item.label}</MenuItem>;
                                                            })
                                                            : ""}
                                                    </Select>
                                                    {errors.category && touched.category ? (
                                                    <small className="text-danger mt-1">
                                                        {errors.category}
                                                    </small>
                                                ) : null}

                                               
                                            </div>
                                            <div className="row mt-3 w-100">
                                                <label htmlFor="last`" className="form-label">
                                                    Product UPC/Product Name/Manufacturer*
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
                                                        Product Name*
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
                                                        Manufacturer*
                                                    </label>
                                                    <input
                                                        id="manufacturer"
                                                        name="manufacturer"
                                                        className="form-control"
                                                        value={values.manufacturer}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {errors.manufacturer && touched.manufacturer ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.manufacturer}
                                                        </small>
                                                    ) : null}
                                                
                                            </div>
                                            
                                            <div className="row mt-3 w-100">
                                            <InputLabel id="demo-simple-select-label">Product Origin*</InputLabel>
                                                    <Select
                                                     sx={{ backgroundColor:"#FFFF", height:"50%"   }}
                                                        labelId="demo-simple-select-label"
                                                        id="category"
                                                        value={origin}
                                                        label="origin"
                                                        onChange={selectionChangeHandler6}
                                                        className="form-control"
                                                    >


                                                <MenuItem value={"USA"}>USA</MenuItem>
                                                <MenuItem value={"KOREA"}>Korea</MenuItem>
                                                <MenuItem value={"INDIA"}>India</MenuItem>
                                                <MenuItem value={"AUSTRALIA"}>Australia</MenuItem>
                                            </Select>
                                            </div>
                                            <div className="row mt-4 w-100" backgroundColor="#FFFF">
                                            
                                                
                                                   
                                                        <InputLabel id="demo-simple-select-label">Emergency Type*</InputLabel>
                                                       
                                                        <Select
                                                            sx={{ backgroundColor:"#FFFF" , height:"50%"   }}
                                                            labelId="demo-simple-select-label"
                                                            id="emergencytype"
                                                            value={emergency}
                                                            label="emergencytype"
                                                            onChange={selectionChangeHandler3}
                                                        >
                                                            <MenuItem value={"Critical"}>Critical</MenuItem>
                                                            <MenuItem value={"Non Critical"}>Non-Critical</MenuItem>
                                                        </Select>
                                                        {errors.emergencytype && touched.emergencytype ? (
                                                    <small className="text-danger mt-1">
                                                        {errors.emergencytype}
                                                    </small>
                                                ) : null}

                                               
                                                
                                            </div>
                                        
                                    </div>

                                    <div class="col md-5 ">
                                        <br />
                                            <br />
                                            <br />
                                            <br />


                                            <Box
                                                sx={{
                                                    border: "1px solid black",
                                                    borderRadius: "5px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    width: "100%",
                                                    height: 500,
                                                }}
                                            >
                                                <img
                                                    width="96"
                                                    height="96"
                                                    src="https://img.icons8.com/color/96/add-image.png"
                                                    alt="add-image"
                                                />
                                            </Box>
                                            <br />


                                            <div class="row w-100">



                                        <Button
                                                        variant="primary"
                                                        size="lg"
                                                        //onClick={handleSubmit}
                                                    >
                                                       Add Product Image
                                                    </Button>
                                            

                                        </div>


                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="row">


                                       
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
                                                        Add Product
                                                    </Button>
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
                                                        Prodect is Registered Successfully
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    
                                                    <Button onClick={handleClose} autoFocus>
                                                        OK
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                                </div>
                                            </div>

                                        
                                    </div>


                                 </div>
                         </form>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default ProductEntry;