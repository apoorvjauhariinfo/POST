import { StockSchema } from "./StockEntrySchema";
import Axios from "axios"
import { useState, React, CSSProperties, useEffect } from 'react'
import { useFormik } from "formik";
//import "./HospitalRegistration.css";
import { MenuItem,Button } from "@mui/material";
import { useNavigate, } from "react-router-dom";
import Box from '@mui/material/Box';
import axios from 'axios'
import { Select, FormControl, InputLabel,FormHelperText } from "@mui/material";
import {DatePicker} from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import LoaderOverlay from '../Loader/LoaderOverlay.js';
import "./StockEntry.css"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';







const initialValues = {
    productid: "",
    name:"",
    phone:"",
    batchno: "",
    unitcost: "",
    totalquantity: "",
    doe: "",
    dom: "",
    



};


const StockEntry = () => {
     const [prodnames,setProdNames] = useState([]);
     const [category,setCategory] = useState(null)
     const [manufacturer,setManufacturer] = useState(null)
     const [upc,setUpc] = useState(null)
     const [type,setType] = useState(null)
     const [id,setId] = useState(null)
     const [doe,setDoe] = useState(null)
     const [dom,setDom] = useState(null)
     const [stockid,setStockId] = useState([]);
     const [stockproductarray,setStockProductArray] = useState([]);
     const [existquantity,setExistQuantity] = useState([]);
     const [existflagval,setExistFlagVal] = useState(0)
     const [currentstockidval,setCurrentStockIdVal] = useState(null)
     const [existingquantityval,setExistingQuantityVal] = useState(null)
     const hospitalid = localStorage.getItem("hospitalid");
     const [open, setOpen] = useState(false);



     const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getstock = async () =>{
        try{
             const url = `https://hintel.semamart.com/stocks`;
            const { data } = await axios.get(url);
            const stockarray = new Array(data.document.length);
            const stockproductarray = new Array(data.document.length);
            const existquantity = new Array(data.document.length);

            for(let i = 0;i<data.document.length;i++){
                stockarray[i] = data.document[i]._id;
                stockproductarray[i] = data.document[i].productid;
                existquantity[i] = data.document[i].totalquantity;
            }
            setStockId(stockarray);
           // console.log("stockarray"+stockarray);
            setStockProductArray(stockproductarray);
           // console.log("stockproductarray"+stockproductarray);

            setExistQuantity(existquantity);
           // console.log("existquant"+existquantity);

            

       } catch (error) {
            console.log(error);
        }
    };

  getstock();


    const getprod = async () => {
        try {
            
            const url = `https://hintel.semamart.com/products`;
            const { data } = await axios.get(url);
           
             const prodnamesarray = new Array(data.document.length)
             const cat = new Array(data.document.length)
             const type = new Array(data.document.length)
             const manu = new Array(data.document.length)
             const upc = new Array(data.document.length)
             const id = new Array(data.document.length)

            let a = 0;
            for (let i = 0; i < data.document.length; i++) {
                if(data.document[i].hospitalid == hospitalid){
                prodnamesarray[a] = data.document[i].name;
                cat[a] = data.document[i].category;
                type[a] = data.document[i].producttype;
                manu[a] = data.document[i].manufacturer;
                upc[a] = data.document[i].upccode;
                id[a] = data.document[i]._id;
                    a++;
                }
              }
              
              setProdNames(prodnamesarray);
           // window.location = "/"
           const len = prodnames.length;
            let flag = -1;
            for (let a = 0; a < len; a++) {
                if (prodnames[a] == name) {
                    flag = a;
                    break;
                }
            }
              
              setCategory(cat[flag]);
              setType(type[flag]);
              setUpc(upc[flag]);
              setManufacturer(manu[flag]);
              setId(id[flag]);
           
        } catch (error) {
            console.log(error);
        }
       
    };

    getprod();

   
    



   
    let [color, setColor] = useState("#ffffff");
    
    let [name, setName] = useState("")

    
   
    
  
  
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
            let exist = 0;
            let currst = null;
            let curquant = null;
            let newDate = new Date()
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
            const fulldate = `${date}/${month<10?`0${month}`:`${month}`}/${year}`;

            console.log(stockid);
            console.log(existquantity);
            for(let a = 0;a<stockproductarray.length;a++) {
                if(stockproductarray[a].localeCompare(id) == 0){
                    console.log("stockproduct"+stockproductarray[a])
                    console.log("selectedprod"+id)
                   exist = 1;
                    currst = stockid[a];
                    curquant = existquantity[a];
                }
            }
            console.log("Current Stock"+currst);
    console.log("Exist Quantity"+curquant);



            const stock = {
                "hospitalid":localStorage.getItem("hospitalid"),
                "productid": id,
                "name":values.name,
                "phone":values.phone,
                "batchno": values.batchno,
                "unitcost": values.unitcost,
                "totalquantity": values.totalquantity,
                "buffervalue": +values.totalquantity * 0.15,
                "doe": doe,
                "dom": dom,
                

            };

            const history = {
                "hospitalid":localStorage.getItem("hospitalid"),
                "date" :fulldate,
                "productid": id,
                "quantity":values.totalquantity,
                "type":"Stock Entry,"

            }

            try {
                console.log("2")

              
                console.log("Exist flag "+exist);
                if(exist == 0){
                    const loadUsers = async () => {
                        const response = await Axios.post("https://hintel.semamart.com/poststocks", stock);
                        const historyresponse = await Axios.post("https://hintel.semamart.com/posthistory", history);
                        let userData = (await response).data;
                        //let id = (await response).data.id;
                        console.log(response);
                        console.log(historyresponse);
                        console.log(userData);
                        //localStorage.setItem("token", userData)
                        //localStorage.setItem("id", id)
                        window.location = '/stockentry'
                       // setLoading(false);
                       // handleClickOpen();
                       //alert("Stock Registered Successfully");
                       setOpen(true);
                    };
                    loadUsers();
                }
                else {
                    let updatedquantity = +curquant + parseInt(values.totalquantity);
                    console.log("Updated quantity: " + updatedquantity);
                    const update = {
                        productid: id,
                        
                        batchno: values.batchno,
                        unitcost: values.unitcost,
                        totalquantity: updatedquantity,
                        buffervalue: +updatedquantity * 0.15,
                        doe: doe,
                        dom: dom,
                    }


                 
                    const loadUsers = async () => {
                        try {
                            const res = await axios.put('https://hintel.semamart.com/updateexistingstocks/' + currst.toString(), {
                                _id: currst.toString(),
                                // productid: id,
                                 batchno: values.batchno,
                                 unitcost: values.unitcost,
                                totalquantity: updatedquantity,
                                 buffervalue: updatedquantity * 0.15,
                                 doe: doe,
                                 dom: dom,


                            });
                            const historyresponse = await Axios.post("https://hintel.semamart.com/posthistory", history);
                            window.location = '/stockentry'
                        // setLoading(false);
                        // handleClickOpen();
                        console.log("apires "+res);
                       // alert("Stock Updated Successfully");
                        setOpen(true);
                        


                        } catch (error) {
                            alert("Error Issuing Stock")
                            console.error("Error issuing issuuee update:", error);
                        }
                        
                    };
                    loadUsers();
                }

              
            } catch (error) {
                alert("Error Registering Stock")
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
                                <form onSubmit={handleSubmit}>
                                <div class="row">
                                    <div class="col">

                                        <p class="text-left h2 mb-3 mt-4">Stock Information:</p>
                                        
                                        <div className="row mt-3">
                                        <InputLabel  id="demo-simple-select-label">Product Name*</InputLabel>
                                                    <Select
                                                         sx={{ backgroundColor:"#FFFF" , height:"80%"   }}
                                                        labelId="demo-simple-select-label"
                                                        id="product-name"
                                                        value={name}
                                                        label="Product Name"
                                                        onChange={e => setName(e.target.value)}

                                                >
                                                    {prodnames.map((value, key) => (
                                                        <MenuItem
                                                            key={key}
                                                            value={value}>
                                                            {value}
                                                        </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="row mt-3">
                                                <label htmlFor="first" className="form-label">
                                                    Product UPC/Product Name/Manufacturer
                                                </label>
                                                <input
                                                    id="firstname"
                                                    name="firstname"
                                                    className="form-control"
                                                    placeholder={upc}
                                                    value={values.upccode}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={true}
                                                />
                                                {errors.firstname && touched.firstname ? (
                                                    <small className="text-danger mt-1">
                                                        {errors.firstname}
                                                    </small>
                                                ) : null}
                                            </div>
                                            
                                            <div className="row mt-3">
                                                <label htmlFor="last`" className="form-label">
                                                    Manufacturer
                                                </label>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    className="form-control"
                                                    value={values.phone}
                                                    placeholder={manufacturer}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                   
                                                    disabled={true}
                                                />
                                                {errors.phone && touched.phone ? (
                                                    <small className="text-danger mt-1">
                                                        {errors.phone}
                                                    </small>
                                                ) : null}
                                            </div>
                                            <div className="row mt-3">
                                               
                                                    <label htmlFor="first" className="form-label">
                                                        Product Type
                                                    </label>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        value={values.email}
                                                        placeholder={type}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled={true}
                                                    />
                                                    {errors.email && touched.email ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.email}
                                                        </small>
                                                    ) : null}
                                                

                                            </div>
                                            <div className="row mt-3">
                                               
                                                    <label htmlFor="first" className="form-label">
                                                        Product Category/Sub Category
                                                    </label>
                                                    <input
                                                        id="address"
                                                        name="address"
                                                        className="form-control"
                                                        placeholder = {category}
                                                        value={values.address}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        type="text"
                                                        disabled={true}
                                                    />
                                                    {errors.address && touched.address ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.address}
                                                        </small>
                                                    ) : null}
                                                
                                            </div>
                                        
                                    </div>
                                    <br/>
                                    <div class="col md-5 ">
                                    <br />   
                                    
                                       
                                       

                                        <div class="row  ">
                                            
                                           
                                        <Box
                                                sx={{
                                                    border: "1px solid black",
                                                    borderRadius: "5px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    width: "100%",
                                                    margin: "10px",
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
                                        </div>
                                        <br />


                                        <div class="row align-items-right">
                                        
                                            <div class="row">
                                            
                                                

                                            </div>

                                        </div>


                                    </div>
                                </div>
                                <div class="row">
                                    <div class="row">


                                        <p class="text-left h2 mb-3 mt-4">Vendor Details</p>
                                    
                                        <div className="row mt-3">
                                                <div className="col text-left">
                                                    <label htmlFor="first" className="form-label">
                                                        Name*
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
                                                <div className="col text-left">
                                                    <label htmlFor="first" className="form-label">
                                                        Phone Number*
                                                    </label>
                                                    <input
                                                        id="phone"
                                                        name="phone"
                                                        className="form-control"
                                                        value={values.phone}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        type="text"
                                                    />
                                                    {errors.phone && touched.phone ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.phone}
                                                        </small>
                                                    ) : null}
                                                </div>
                                               
                                            </div>
                                            
                                        <p class="text-left h2 mb-3 mt-4">Stock Details</p>
                                            <div className="row mt-3">
                                                <div className="col text-left">
                                                    <label htmlFor="first" className="form-label">
                                                        Batch Number*
                                                    </label>
                                                    <input
                                                        id="batchno"
                                                        name="batchno"
                                                        className="form-control"
                                                        value={values.batchno}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {errors.batchno && touched.batchno ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.batchno}
                                                        </small>
                                                    ) : null}
                                                </div>
                                                <div className="col text-left">
                                                    <label htmlFor="first" className="form-label">
                                                        Unit Cost*
                                                    </label>
                                                    <input
                                                        id="unitcost"
                                                        name="unitcost"
                                                        className="form-control"
                                                        value={values.unitcost}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        type="text"
                                                    />
                                                    {errors.unitcost && touched.unitcost ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.unitcost}
                                                        </small>
                                                    ) : null}
                                                </div>
                                                <div className="col text-left">
                                                    <label htmlFor="last`" className="form-label">
                                                        Total Quantity*
                                                    </label>
                                                    <input
                                                        id="totalquantity"
                                                        name="totalquantity"
                                                        className="form-control"
                                                        value={values.totalquantity}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        type="text"
                                                    />
                                                    {errors.totalquantity && touched.totalquantity ? (
                                                        <small className="text-danger mt-1">
                                                            {errors.totalquantity}
                                                        </small>
                                                    ) : null}
                                                </div>
                                            </div>
                                           
                                            <br/>
                                            <br/>
                                            <div className="row mt-3 justify-items-center">


                                                <div className="col text-center">
                                                       
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Date of Manufacturing*"
                                                        value={dom}
                                                        onChange={(newValue) => setDom(newValue)}
                                                    />
                                                    </LocalizationProvider>
                                                    </div>
                                                <div className="col text-center">
                                                
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Date of Expiry*"
                                                        value={doe}
                                                        backgroundColor="#ffffff"
                                                        onChange={(newValue) => setDoe(newValue)}
                                                    />
                                                    </LocalizationProvider>
                                                </div>
                                            </div>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <div class="row justify-content-around">
                                                <br/>
                                                <div class="col-3">
                                                <Button variant='outlined' onClick= {resetForm} size='large' >Clear</Button>
                                                </div>
                                                <br/>
                                                <br/>
                                                <div class="col-3">
                                                <Button variant='contained' onClick= {handleSubmit} size='large'>Add Stock</Button>
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
                                                        Stock Registered Successfully
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

export default StockEntry;