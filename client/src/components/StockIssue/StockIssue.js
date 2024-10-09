import { useState, useEffect, React, CSSProperties } from "react";
import { useFormik } from "formik";
import { MenuItem, Button, Select, InputLabel, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopupMessage from "../PopupMessage/PopupMessage.js";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import fetchSearchResults from "../utils/fetchSearchResults.js";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import PrintIcon from "@mui/icons-material/Print";
import "./StockIssue.css";
import AlertDialog from "../UI/AlertDialog.js";

const SearchIconWrapper = styled.div`
  padding: 0 16px;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const initialValues = {
  firstname: "",
  lastname: "",
  department: "",
  subdepartment: "",
  productid: "",
  quantityissued: "",
};

const StockIssue = () => {
  const [prodnames, setProdNames] = useState([]);
  const [manufacturerarray, setManufacturerArray] = useState([]);
  const [rowsVisible, setRowsVisible] = useState(false);
  const [upcarray, setUpcArray] = useState([]);
  const [idarray, setIdArray] = useState([]);
  const [stockidarray, setStockIdArray] = useState([]);
  const [quantityarray, setQuantityArray] = useState([]);
  const [bufferValues, setBufferValues] = useState([]);
  const [productinstockidarray, setProductInStockIdArray] = useState([]);
  const [manufacturer, setManufacturer] = useState(null);
  const [upc, setUpc] = useState(null);
  const [id, setId] = useState(null);
  const [department, setDepartment] = useState([]);
  const [stockid, setStockId] = useState(null);
  const [maxquantity, setMaxQuantity] = useState("Please Select a Product");
  const hospitalid = localStorage.getItem("hospitalid");
  const [open, setOpen] = useState(false);
  const [isStockIssued, setIsStockIssued] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [bulkStockIssues, setBulkStockIssues] = useState([]);
  const [bufferStock, setBufferStock] = useState(0);
  const [stockOut, setStockOut] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [quantityError, setQuantityError] = useState("");

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  useEffect(() => {
    if (isStockIssued) {
      const timer = setTimeout(() => {
        // window.location.reload();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isStockIssued]);

  const handleSearchChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim().length >= 3) {
      try {
        const results = await fetchSearchResults(term);
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleProductSelect = (product) => {
    setRowsVisible(true);
    setSelectedProducts(product);
    setUpc(product.upccode);
    setManufacturer(product.manufacturer);
    setId(product._id);
    setSearchTerm(product.name); // Set the search term to the selected product's name
    setSearchResults([]);
    const imageData = product.productImage;
    if (imageData && imageData.data) {
      const base64String = bufferToBase64(imageData.data);
      setProductImage(`data:image/jpeg;base64,${base64String}`);
    } else {
      setProductImage(null);
    }

    const productIndex = productinstockidarray.indexOf(product._id);
    if (
      productIndex === -1 ||
      quantityarray[productIndex] === 0 ||
      quantityarray[productIndex] === null
    ) {
      setStockId(null);
      setMaxQuantity("Stock Out");
    } else {
      setStockId(stockidarray[productIndex]);
      setMaxQuantity(quantityarray[productIndex]);
    }
  };

  const bufferToBase64 = (buf) => {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buf));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const getstock = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stockbyhospitalid/${hospitalid}`;
      const { data } = await axios.get(url);
      const stockid = new Array(data.document.length);
      const quantity = new Array(data.document.length);
      const productid = new Array(data.document.length);
      const bufferValues = new Array(data.document.length);

      let a = 0;
      for (let i = 0; i < data.document.length; i++) {
          if(data.document[i].totalquantity > 0){
          stockid[a] = data.document[i]._id;
          productid[a] = data.document[i].productid;
          quantity[a] = data.document[i].totalquantity;
          bufferValues[a] = data.document[i].buffervalue;
          a++;
          }
        
      }
      setStockIdArray(stockid);
      setQuantityArray(quantity);
      setProductInStockIdArray(productid);
      setBufferValues(bufferValues);
    } catch (error) {
      console.log(error);
    }
  };

  const getdep = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}departments`;
      const { data } = await axios.get(url);
      for (let a = 0; a < data.document.length; a++) {
        if (data.document[a].hospitalid == hospitalid) {
          let len = JSON.parse(data.document[a].department).length;
          const deplist = new Array(len);
          for (let i = 0; i < len; i++) {
            deplist[i] = JSON.parse(data.document[a].department)[i];
          }
          setDepartment(deplist);
          console.log("department are " + department);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subdepartment = [
    "ICU",
    "CCU",
    "OPD",
    "HDU",
    "PICU",
    "NICU",
    "CSSD",
    "Admin",
    "Kitchen",
    "Nursery",
    "Pharmacy",
    "Radiology",
    "Laboratory",
    "Ambulance",
    "Front Office",
    "Private Ward",
    "General Ward",
    "Pediatric Ward",
    "Labour Room",
    "Housekeeping",
    "Operation Theatre",
    "Semi-private Ward",
    "Pre-operative Room",
    "Post-operative Room",
    "Emergency Department",
  ];

  const fieldLabels = {
    firstname: "First Name",
    lastname: "Last Name",
    department: "Department",
    subdepartment: "Sub-Department",
    productid: "Product",
    quantityissued: "Quantity",
    quantityerror: "Quantity Should be less than Availaible Quantity",
  };

  const getprod = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}productbyhospitalid/${hospitalid}`;
      const { data } = await axios.get(url);

      const prodnamesarray = new Array(data.products.length);
      const manu = new Array(data.products.length);
      const upc = new Array(data.products.length);
      const id = new Array(data.products.length);

      let a = 0;
      for (let i = 0; i < data.products.length; i++) {
          prodnamesarray[a] = data.products[i].name;
          manu[a] = data.products[i].manufacturer;
          upc[a] = data.products[i].upccode;
          id[a] = data.products[i]._id;
          a++;
        
      }

      setProdNames(prodnamesarray);
      setManufacturerArray(manu);
      setUpcArray(upc);
      setIdArray(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdep();
    getprod();
    getstock();
  }, []);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    onSubmit: (values, action) => {
      let formErrors = {};

      // Validate firstname
      if (!values.firstname) formErrors.firstname = "First Name is required";
      if (!values.lastname) formErrors.lastname = "Last Name is required";
      if (!values.department) formErrors.department = "Department is required";
      if (!values.subdepartment)
        formErrors.subdepartment = "Subdepartment is required";
      if (!selectedProducts.name) formErrors.productid = "Product is required";
      if (!values.quantityissued)
        formErrors.quantityissued = "Quantity issued is required";

      // Check if quantity issued exceeds maxQuantity
      if (parseFloat(values.quantityissued) > parseFloat(maxquantity)) {
        formErrors.quantityerror = `Quantity issued cannot exceed ${maxquantity}`;
        setQuantityError(formErrors.quantityerror);
      } 
      else {
        setQuantityError(""); // Clear error if quantity is valid
      }
      if (maxquantity == "Stock Out") {
        formErrors.quantityerror = `Cannot Issue`;
        setQuantityError(formErrors.quantityerror);
      } 
      else {
        setQuantityError(""); // Clear error if quantity is valid
      }
      

      // If there are any errors, show the dialog and don't proceed
      if (Object.keys(formErrors).length > 0) {
        setMissingFields(Object.keys(formErrors));
        setOpenDialog(true);
        return;
      }

      const stockIssue = {
        hospitalid: localStorage.getItem("hospitalid"),
        firstname: values.firstname,
        lastname: values.lastname,
        department: values.department,
        subdepartment: values.subdepartment,
        productid: id,
        quantityissued: values.quantityissued,
        manufacturer: manufacturer,
        productname: selectedProducts.name,
      };

      console.log("details" + stockIssue.subdepartment);

      setBulkStockIssues([...bulkStockIssues, stockIssue]);
      // setFieldValue("firstname", "");
      // setFieldValue("lastname", "");
      setFieldValue("productid", "");
      setFieldValue("quantityissued", "");
      // setFieldValue("department", "");
      // setFieldValue("subdepartment", "");
      setFieldValue("searchTerm", "");
      setSearchTerm("");

      setSelectedProducts(null);
      setManufacturer("");
      setUpc("");
      setProductImage(null);
      setMaxQuantity("Search Your Product");
      
    },
  });

  const removeStockIssue = (index) => {
    const updatedIssues = [...bulkStockIssues];
    updatedIssues.splice(index, 1);
    setBulkStockIssues(updatedIssues);
  };

  const handleSubmitAllStockIssues = async () => {
    try {
      for (const stockIssue of bulkStockIssues) {
        const productIndex = productinstockidarray.indexOf(
          stockIssue.productid,
        );

        if (productIndex === -1) {
          throw new Error(
            `Product with ID ${stockIssue.productid} not found in stock`,
          );
        }

        const remainingQuantity =
          quantityarray[productIndex] - stockIssue.quantityissued;

        console.log("stock is" + stockIssue);
        console.log("stock value" + stockIssue.subdepartment);
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}postissues`,
          stockIssue,
        );


        //For the general History Record.
        const history = {
          hospitalid: stockIssue.hospitalid,
          date: new Date().toLocaleDateString(),
          productid: stockIssue.productid,
          quantity: stockIssue.quantityissued,
          type: "Product Issued",
          remark: "valid",
        };

        await axios.post(
          `${process.env.REACT_APP_BASE_URL}posthistory`,
          history,
        );

        //History when product enters the buffer stock state
        if (remainingQuantity <= bufferValues[productIndex] && remainingQuantity > 0) {
          console.log("Entered Buffer State")
          const bufferHistory = {
            hospitalid: stockIssue.hospitalid,
            date: new Date().toLocaleDateString(),
            productid: stockIssue.productid,
            quantity: remainingQuantity,
            type: "Buffer Stock",
            remark: "valid",
          };
       

        await axios.post(
          `${process.env.REACT_APP_BASE_URL}posthistory`,
          bufferHistory,
        );
      }

      //History when product enters the stock out state.
      if (remainingQuantity == 0) {
        console.log("Entered Stock Out State")

        const bufferHistory = {
          hospitalid: stockIssue.hospitalid,
          date: new Date().toLocaleDateString(),
          productid: stockIssue.productid,
          quantity: stockIssue.quantityissued,
          type: "Stock Out",
          remark: "valid",
        };
     

      await axios.post(
        `${process.env.REACT_APP_BASE_URL}posthistory`,
        bufferHistory,
      );
    }

        await axios.put(
          `${process.env.REACT_APP_BASE_URL}updatestocks/${stockidarray[productIndex]}`,
          {
            _id: stockidarray[productIndex],
            totalquantity: remainingQuantity,
          },
        );

        // Update stock status based on remaining quantity
        if (remainingQuantity <= 0) {
          setStockOut((prev) => prev + 1);
        } else if (remainingQuantity <= bufferValues[productIndex]) {
          setBufferStock((prev) => prev + 1);
        }
      }
      setIsStockIssued(true);
      setOpen(true);
      setBulkStockIssues([]);
      window.location.reload();
    } catch (error) {
      setShowAlertDialog(true);
      // alert("Error Issuing Stocks: " + error.message);
      console.error("Error issuing stock:", error);
    }
  };

  return (
    <div>
      {isStockIssued && <PopupMessage message="Stock Issued Successfully" />}
      {errorMessage && <PopupMessage message={errorMessage} />}
      <AlertDialog
        onClose={() => setShowAlertDialog(false)}
        open={showAlertDialog}
        text={"Error Issuing Stocks"}
      />
      <section
        className="p-5 w-100"
        style={{ backgroundColor: "#eeeee", borderRadius: ".5rem .5rem 0 0" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-3">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col">
                      <p className="text-left h3 mb-3 mt-4">Issued To:</p>
                      <div className="row">
                        <div className="col">
                          <label htmlFor="firstname" className="form-label">
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
                          <label htmlFor="lastname" className="form-label">
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
                            <InputLabel id="department-label">
                              Scope*
                            </InputLabel>
                            <Select
                              sx={{ backgroundColor: "#FFFF", height: "50%" }}
                              labelId="department-label"
                              id="department"
                              name="department"
                              value={values.department}
                              label="Department"
                              onChange={(e) => {
                                handleChange(e);
                                setFieldValue("department", e.target.value);
                              }}
                              onBlur={handleBlur}
                            >
                              {department.map((value, key) => (
                                <MenuItem key={key} value={value}>
                                  {value}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                        </div>
                        <div className="col">
                          <div className="row">
                            <InputLabel id="department-label">
                              Department*
                            </InputLabel>
                            <Select
                              sx={{ backgroundColor: "#FFFF", height: "50%" }}
                              labelId="department-label"
                              id="subdepartment"
                              name="subdepartment"
                              value={values.subdepartment}
                              label="Sub Department"
                              onChange={(e) => {
                                handleChange(e);
                                setFieldValue("subdepartment", e.target.value);
                              }}
                              onBlur={handleBlur}
                            >
                              {subdepartment.map((value, key) => (
                                <MenuItem key={key} value={value}>
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
                        <p className="text-left h3 mb-3 mt-4">Stock Issued:</p>
                        <div className="col">
                          <div className="row">
                            <InputLabel id="product-name-label">
                              UPC/Product Name*
                            </InputLabel>
                            <div style={{ position: "relative" }}>
                              <SearchContainer>
                                <SearchIconWrapper>
                                  <SearchIcon
                                    style={{
                                      position: "absolute",
                                      top: "50%",
                                      left: "19px",
                                      transform: "translateY(-50%)",
                                    }}
                                  />
                                </SearchIconWrapper>
                                <input
                                  placeholder="Search Your Product"
                                  aria-label="search"
                                  value={searchTerm}
                                  onChange={handleSearchChange}
                                  style={{
                                    width: "100%",
                                    paddingLeft: "50px",
                                    paddingTop: "8px",
                                    paddingBottom: "8px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                  }}
                                />
                              </SearchContainer>
                              {searchResults.length > 0 && (
                                <div
                                  style={{
                                    position: "absolute",
                                    backgroundColor: "white",
                                    width: "100%",
                                    zIndex: 1,
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                  }}
                                >
                                  {searchResults.map((product) => (
                                    <div
                                      key={product._id}
                                      style={{
                                        padding: "8px",
                                        cursor: "pointer",
                                        fontSize: "16px",
                                      }}
                                      onClick={() =>
                                        handleProductSelect(product)
                                      }
                                    >
                                      {product.name}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <br />
                          <div className="row">
                            <div className="col text-left">
                              <label htmlFor="upc" className="form-label">
                                Product UPC
                              </label>
                              <input
                                id="upc"
                                name="upc"
                                className="form-control"
                                placeholder={upc}
                                value={values.upc}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                disabled
                              />
                            </div>
                          </div>
                          <br />
                          <div className="row">
                            <div className="col text-left">
                              <label
                                htmlFor="manufacturer"
                                className="form-label"
                              >
                                Manufacturer
                              </label>
                              <input
                                id="manufacturer"
                                name="manufacturer"
                                className="form-control"
                                value={values.manufacturer}
                                placeholder={manufacturer}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled
                              />
                            </div>
                          </div>

                          <br />
                          <div className="row">
                            <div className="col text-left">
                              <label
                                htmlFor="quantityissued"
                                className="form-label"
                              >
                                Quantity To Be Issued*
                              </label>
                              <input
                                id="quantityissued"
                                name="quantityissued"
                                className="form-control"
                                value={values.quantityissued}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.quantityissued &&
                              touched.quantityissued ? (
                                <small className="text-danger mt-1">
                                  {errors.quantityissued}
                                </small>
                              ) : null}
                            </div>
                            <div className="col text-left">
                              <label
                                htmlFor="quantityissued"
                                className="form-label"
                              >
                                Available Quantity
                              </label>
                              <input
                                id="availquantity"
                                name="availquantity"
                                className="form-control"
                                placeholder={`${maxquantity}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly
                              />
                            </div>
                          </div>
                          <br />
                          <br />
                          <br />
                          <br />
                          <div className="row mt-3 justify-content-end button-row">
                            <div className="d-flex justify-content-end">
                              <div className="actionButtons">
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    setFieldValue("productid", "");
                                    setFieldValue("quantityissued", "");
                                    setSelectedProducts(null);
                                    setManufacturer("");
                                    setUpc("");
                                    setProductImage(null);
                                    setMaxQuantity("Search Your Product");
                                    setSearchTerm("");
                                  }}
                                  className="mr-3"
                                >
                                  Clear
                                </Button>
                              </div>
                              <div className="button-spacing"></div>
                              <div className="actionButtons">
                                <Button
                                  variant="contained"
                                  onClick={handleSubmit}
                                >
                                  Add
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                        <div className="col">
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
                              overflow: "hidden",
                            }}
                          >
                            {productImage ? (
                              <img
                                src={productImage}
                                alt="Product"
                                style={{
                                  width: "100%", // Ensures the uploaded image fills the container
                                  height: "100%",
                                  objectFit: "cover", // Ensures the image covers the container without distortion
                                }}
                              />
                            ) : (
                              <img
                                width="96"
                                height="96"
                                src="http://img.icons8.com/color/96/add-image.png"
                                alt="add-image"
                              />
                            )}
                          </Box>
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                </form>
                <div className="row mt-4">
                  <h3>Stock Issues</h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Manufacturer</th>
                        <th>Quantity Issued</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkStockIssues.map((issue, index) => (
                        <tr key={index}>
                          <td>{issue.productname}</td>
                          <td>{issue.manufacturer}</td>
                          <td>{issue.quantityissued}</td>
                          <td>
                            <IconButton
                              style={{
                                backgroundColor: "white",
                                color: "red",
                                transition: "background-color 0.3s, color 0.3s",
                              }}
                              onClick={() => removeStockIssue(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="col text-center actionButtons">
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSubmitAllStockIssues}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Missing Information</DialogTitle>
        <DialogContent>
          <p>The following fields are missing:</p>
          <ul>
            {missingFields.map((field) => (
              <li key={field}>{fieldLabels[field]}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StockIssue;
