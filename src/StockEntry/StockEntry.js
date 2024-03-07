import { StockSchema } from "./StockEntrySchema";
import Axios from "axios"
import { useState, React, CSSProperties } from 'react'
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


const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};




const initialValues = {
    productid: "",
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





    const getprod = async () => {
        try {
            
            const url = `http://localhost:4000/products`;
            const { data } = await axios.get(url);
           
             const prodnamesarray = new Array(data.document.length)
             const cat = new Array(data.document.length)
             const type = new Array(data.document.length)
             const manu = new Array(data.document.length)
             const upc = new Array(data.document.length)
             const id = new Array(data.document.length)

            
            for (let i = 0; i < data.document.length; i++) {
                prodnamesarray[i] = data.document[i].name;
                cat[i] = data.document[i].category;
                type[i] = data.document[i].producttype;
                manu[i] = data.document[i].manufacturer;
                upc[i] = data.document[i].upccode;
                id[i] = data.document[i]._id;
              
                
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
    const [open, setOpen] = useState(false);

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    
    let [name, setName] = useState("")

    
   
    
  
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


            const stock = {
                "productid": id,
                "batchno": values.batchno,
                "unitcost": values.unitcost,
                "totalquantity": values.totalquantity,
                "doe": doe,
                "dom": dom,
                

            };

            try {
                console.log("2")
                const loadUsers = async () => {
                    const response = await Axios.post("http://localhost:4000/poststocks", stock);
                    let userData = (await response).data;
                    //let id = (await response).data.id;
                    console.log(response);
                    console.log(userData);
                    //localStorage.setItem("token", userData)
                    //localStorage.setItem("id", id)
                    window.location = '/stockentry'
                   // setLoading(false);
                   // handleClickOpen();
                   alert("Stock Registered Successfully");
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

                                    <div class="col md-5 ">
                                    <br />   
                                    <br />
                                        <br />
                                        <br />
                                        <br />
                                       

                                        <div class="row  ">
                                            
                                            <img
                                                src="https://www.shutterstock.com/image-vector/camera-plus-line-icon-add-260nw-1589203135.jpg"
                                                height={300}
                                                alt=""
                                            />
                                        </div>
                                        <br />


                                        <div class="row align-items-right">
                                        
                                            <div class="col">
                                            
                                                <Button
                                                    variant="text"
                                                    size="large"
                                                    
                                                >
                                                    Add Product Image
                                                </Button>

                                            </div>

                                        </div>


                                    </div>
                                </div>
                                <div class="row">
                                    <div class="row">


                                        <p class="text-left h2 mb-3 mt-4">Stock Details:</p>
                                    
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
                                                        Total Quantity
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
                                            <div className="row mt-3">


                                                <div className="col ">
                                                    
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Date of Expiry"
                                                        value={doe}
                                                        onChange={(newValue) => setDoe(newValue)}
                                                    />
                                                    </LocalizationProvider>
                                                </div>
                                                <div className="col ">
                                                
                                                    
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Date of Manufacturing"
                                                        value={dom}
                                                        onChange={(newValue) => setDom(newValue)}
                                                    />
                                                    </LocalizationProvider>
                                                </div>
                                                

                                            </div>
                                            <br/>
                                            <br/>
                                            <div class="row justify-content-around">
                                                
                                                <div class="col-3">
                                                <Button variant='outlined' onClick= {resetForm} size='large' >Clear</Button>
                                                </div>
                                                <br/>
                                                <br/>
                                                <div class="col-3">
                                                <Button variant='contained' onClick= {handleSubmit} size='large'>Submit</Button>
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