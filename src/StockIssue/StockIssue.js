import { StockIssueSchema } from "./StockIssueSchema";
import Axios from "axios"
import { useState, React, CSSProperties } from 'react'
import { useFormik } from "formik";
//import "./HospitalRegistration.css";
import { MenuItem,Button } from "@mui/material";
import { useNavigate, } from "react-router-dom";
import Box from '@mui/material/Box';
import axios from 'axios'
import { Select , FormControl,InputLabel} from "@mui/material";
import LoaderOverlay from '../Loader/LoaderOverlay.js';



const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};




const initialValues = {
    firstname: "",
    lastname: "",
    department: "",
    productid: "",
    quantityissued: "",
    



};


const StockIssue = () => {
    const [prodnames,setProdNames] = useState([]);
    const [manufacturer,setManufacturer] = useState(null)
    const [upc,setUpc] = useState(null)
    const [id,setId] = useState(null)
    const [department,setDepartment] = useState([])
    

    let [name, setName] = useState("")
    let [dep,setDep] = useState("")

    const getprod = async () => {
        try {
            
            const url = `http://localhost:4000/products`;
            const { data } = await axios.get(url);
          
             const prodnamesarray = new Array(data.document.length)
             //const cat = new Array(data.document.length)
             //const type = new Array(data.document.length)
             const manu = new Array(data.document.length)
             const upc = new Array(data.document.length)
             const id = new Array(data.document.length)
                    
            
            for (let i = 0; i < data.document.length; i++) {
                prodnamesarray[i] = data.document[i].name;
                //cat[i] = data.document[i].category;
                //type[i] = data.document[i].producttype;
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
              
              
              
              setUpc(upc[flag]);
              setManufacturer(manu[flag]);
              setId(id[flag]);
           
        } catch (error) {
            console.log(error);
        }
       
    };

    getprod();

    
    const getdep = async () => {
        try {
            
            const url = `http://localhost:4000/departments`;
            const { data } = await axios.get(url);
            let l = JSON.parse(data.document[0].department).length;
            const deplist = new Array(l)
            for(let i = 0;i<l;i++)
            {
                deplist[i] = JSON.parse(data.document[0].department)[i];
            }
            setDepartment(deplist)
        } catch (error) {
            console.log(error);
        }
       
    };

    getdep();





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


            const stock = {
                "firstname": values.firstname,
                "lastname": values.lastname,
                "department": dep,
                "productid": id,
                "quantityissued": values.quantityissued,
                

            };

            try {
                console.log("2")
                const loadUsers = async () => {
                    setLoading(true);
                    const response = await Axios.post("http://localhost:4000/postissues", stock);
                    let userData = (await response).data;
                  //  let id = (await response).data.id;
                    console.log(userData);
                    window.location = '/stockissue'
                   // localStorage.setItem("token", userData)
                   // localStorage.setItem("id", id)
                    //window.location = '/verify'
                    //setLoading(false);
                   // handleClickOpen();
                   alert("Stock Issued Successfully");

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
                alert("Error Issuing Stock")
                console.error("Error issuing post:", error);
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
                                                <div className="col">
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
                                                <div className="col">
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

                                                <div className="col">
                                                <div className="row">  
                                                <InputLabel  id="demo-simple-select-label">Department*</InputLabel>
                                                    <Select
                                                         sx={{ backgroundColor:"#FFFF" , height:"50%"   }}
                                                        labelId="demo-simple-select-label"
                                                        id="department"
                                                        value={dep}
                                                        label="Department"
                                                        onChange={e => setDep(e.target.value)}

                                                >
                                                    {department.map((value, key) => (
                                                        <MenuItem
                                                            key={key}
                                                            value={value}>
                                                            {value}
                                                        </MenuItem>
                                                    ))}

                                                </Select>
                                                    
                                                </div>
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
                                                            <InputLabel id="demo-simple-select-label">Product Name*</InputLabel>
                                                            <Select
                                                                sx={{ backgroundColor: "#FFFF", height: "50%" }}
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
                                                        <br />
                                                        <div className="row">

                                                            <div className="col text-left">
                                                                <label htmlFor="first" className="form-label">
                                                                Product UPC
                                                                </label>
                                                                <input
                                                                    id="lastname"
                                                                    name="lastname"
                                                                    className="form-control"
                                                                    placeholder={upc}
                                                                    value={values.upccode}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    type="text"
                                                                    disabled={true}
                                                                />
                                                                
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
                                                                    placeholder={manufacturer}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    disabled={true}
                                                                />
                                                                
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="last`" className="form-label">
                                                                Quantity Issued*
                                                            </label>
                                                            <input
                                                                id="quantityissued"
                                                                name="quantityissued"
                                                                className="form-control"
                                                                value={values.quantityissued}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                               
                                                            />
                                                            {errors.quantityissued && touched.quantityissued ? (
                                                                <small className="text-danger mt-1">
                                                                    {errors.quantityissued}
                                                                </small>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className="col">
                                                    <br/>
                                                    <div class="col md-5 ">






                                                        <div class="row align-items-center">

                                                            <div class="row">
                                                                <Box
                                                                    sx={{
                                                                        border: "1px solid black",
                                                                        borderRadius: "5px",
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        alignItems: "center",
                                                                        width: "100%",
                                                                        margin: "10px",
                                                                        height: 200,
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

                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                            <div class="row justify-content-around">
                                                
                                                <div class="col-3">
                                                <Button variant='outlined' size='large' onClick= {resetForm}>Clear</Button>
                                                </div>
                                                <br/>
                                                <br/>
                                                <div class="col-3">
                                                <Button variant='contained' size='large' onClick= {handleSubmit}>Issue Stock</Button>
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