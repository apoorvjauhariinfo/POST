import Axios from "axios";
import { useState, React, useEffect } from "react";
import { useFormik } from "formik";
import { MenuItem, Button, Box, Select, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PopupMessage from "../PopupMessage/PopupMessage.js";
import "./StockEntry.css";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
// Search functionality
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import fetchSearchResults from "../utils/fetchSearchResults.js";
import dayjs from "dayjs";
import AlertDialog from "../UI/AlertDialog";

const initialValues = {
  productid: "",
  name: "",
  phone: "",
  batchno: "",
  unitcost: "",
  totalquantity: "",
  doe: "",
  dom: "",
};

// Add styled components for the search input and results container
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

const StockEntry = () => {
  const hospitalid = localStorage.getItem("hospitalid");
  const [gst, setGST] = useState(""); // Add a new state variable for GST rate
  const [grandtotal, setGrandTotal] = useState(0); // Add a new state variable for
  const [category, setCategory] = useState(null);
  const [manufacturer, setManufacturer] = useState(null);
  const [upc, setUpc] = useState(null);
  const [type, setType] = useState(null);
  const [id, setId] = useState(null);
  const [doe, setDoe] = useState(null);
  const [dom, setDom] = useState(null);
  const [open, setOpen] = useState(false);
  const [isStockRegistered, setIsStockRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [stockEntries, setStockEntries] = useState([]);
  const [stockId, setStockId] = useState([]);
  const [stockProductArray, setStockProductArray] = useState([]);
  const [existQuantity, setExistQuantity] = useState([]);
  const [name, setName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [quantityError, setQuantityError] = useState("");

  // State variables for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertText, setAlertText] = useState("");

  // Handle search input changes
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

  // Handle product selection from search results
  const handleProductSelect = (product) => {
    setSelectedProducts(product);
    setCategory(product.category);
    setType(product.producttype);
    setUpc(product.upccode);
    setManufacturer(product.manufacturer);
    setId(product._id);
    setName(product.name);
    setSearchTerm("");
    setSearchResults([]);
    const imageData = product.productImage;
    if (imageData && imageData.data) {
      const base64String = bufferToBase64(imageData.data);
      setProductImage(`data:image/jpeg;base64,${base64String}`);
    } else {
      setProductImage(null); // Set to null if no data found
    }
  };

  const fieldLabels = {
    name: "Name",
    phone: "Phone Number",
    batchno: "Batch Number",
    unitcost: "Unit Cost",
    totalquantity: "Total Quantity",
    gst: "GST Slab %",
    dom: "Date of Manufacturing",
    doe: "Date of Expiry",
    productname: "Select Product Name",
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const StockSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .required("Phone Number is required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Enter Valid Phone Number")
      .max(10, "Enter Valid Phone Number"),
    batchno: Yup.number().required("Batch Number is required"),
    unitcost: Yup.number()
      .typeError("Unit cost must be a number")
      .required("Unit cost is required"),
    totalquantity: Yup.number()
      .typeError("Total quantity must be a number")
      .required("Total quantity is required"),
    gst: Yup.string().required("Select Your GST Slab"),
    dom: Yup.string().required("Date of Manufacture is required"),
    doe: Yup.string().required("Date of Expiry is required"),
    productname: Yup.string().required("Product Name is required"),
  });

  const bufferToBase64 = (buf) => {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buf));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  // Function to highlight search term in search results
  const highlightSearchTerm = (text) => {
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <b key={index} style={{ color: "black" }}>
              {part}
            </b>
          ) : (
            <span key={index}>{part}</span>
          ),
        )}
      </span>
    );
  };

  useEffect(() => {
    if (isStockRegistered) {
      const timer = setTimeout(() => {
        //window.location.reload(); // Reload the page after the desired delay
      }, 1000); // Adjust the delay as needed (in milliseconds)

      return () => clearTimeout(timer);
    }
  }, [isStockRegistered]);

  const getstock = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks`;
      const { data } = await axios.get(url);
      const stockarray = new Array(data.document.length);
      const stockproductarray = new Array(data.document.length);
      const existquantity = new Array(data.document.length);

      for (let i = 0; i < data.document.length; i++) {
        stockarray[i] = data.document[i]._id;
        stockproductarray[i] = data.document[i].productid;
        existquantity[i] = data.document[i].totalquantity;
      }
      setStockId(stockarray);
      setStockProductArray(stockproductarray);
      setExistQuantity(existquantity);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getstock(); // Call getstock() when component mounts or dependencies change
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      batchno: "",
      unitcost: "",
      totalquantity: "",
      gst: "",
      dom: "",
      doe: "",
      productname: "",
    },
    validationSchema: StockSchema,
    // validateOnChange: false,  // Disables validation on field change
    // validateOnBlur: false,
    onSubmit: (values, action) => {
      let exist = false;
      let currStockId = null;
      let currentQuantity = null;

      for (let i = 0; i < stockProductArray.length; i++) {
        if (stockProductArray[i] === id) {
          exist = true;
          currStockId = stockId[i];
          currentQuantity = existQuantity[i];
          break;
        }
      }

      const stockEntry = {
        hospitalid: localStorage.getItem("hospitalid"),
        productid: id,
        name: values.name,
        phone: values.phone,
        batchno: values.batchno,
        unitcost: values.unitcost,
        totalquantity: values.totalquantity,
        gst: values.gst,
        grandtotal: grandtotal, // Calculate the grand total by adding 15% GST
        buffervalue: +values.totalquantity * 0.15,
        doe: values.doe, // Convert doe to a Date object
        dom: values.dom, // Convert dom to a Date object
        upccode: upc,
        productname: values.productname,
        manufacturer: manufacturer,
        exist,
        currStockId,
        currentQuantity,
      };
      console.log("Stock Entry:", stockEntry.doe);
      // Add the stock entry to the stockEntries array
      setStockEntries([...stockEntries, stockEntry]);

      // Reset the form fields except for the search term
      action.resetForm();
      setSelectedProducts(null);
      setUpc(""); // Example of resetting external state
      setManufacturer(""); // Example of resetting external state
      setType(""); // Example of resetting external state
      setCategory(""); // Example of resetting external state
      setDoe(null);
      setDom(null);
      setProductImage(null);
    },
  });

  const removeStockEntry = (index) => {
    const updatedEntries = [...stockEntries];
    updatedEntries.splice(index, 1);
    setStockEntries(updatedEntries);
  };

  const handleSubmitAllStockEntries = async () => {
    try {
      for (const stockEntry of stockEntries) {
        const {
          exist,
          currStockId,
          currentQuantity,
          hospitalid,
          productid,
          name,
          phone,
          batchno,
          unitcost,
          totalquantity,
          gst,
          grandtotal,
          doe,
          dom,
          upccode,
          productname,
          manufacturer,
        } = stockEntry;

        const fulldate = new Date().toLocaleDateString();

        const history = {
          hospitalid,
          date: fulldate,
          productid,
          quantity: totalquantity,
          type: "Stock Entry",
        };

        // if (!exist) {
        const response = await Axios.post(
          `${process.env.REACT_APP_BASE_URL}poststocks`,
          {
            hospitalid,
            productid,
            name,
            phone,
            batchno,
            unitcost,
            totalquantity,
            gst,
            grandtotal,
            buffervalue: totalquantity * 0.15,
            doe: doe, // Convert doe to ISO string
            dom: dom, // Convert dom to ISO string
            upccode,
            productname,
            manufacturer,
          },
        );

        const historyresponse = await Axios.post(
          `${process.env.REACT_APP_BASE_URL}posthistory`,
          history,
        );
      }

      setIsStockRegistered(true);
      setOpen(true);
      setStockEntries([]);
    } catch (error) {
      setShowAlertDialog(true);
      setAlertText("Error Registering Stocks");
      // alert("Error Registering Stocks");
      console.error("Error creating Stocks:", error);
    }
  };

  const clearAllFields = () => {
    formik.resetForm();
    setSearchTerm("");
    setSelectedProducts(null);
    setCategory(null);
    setType(null);
    setUpc(null);
    setManufacturer(null);
    setGST(0);
    setGrandTotal(0);
    setId(null);
    setName("");
    setDoe(null);
    setDom(null);
    setProductImage(null);
  };

  useEffect(() => {
    const calculateGrandTotal = () => {
      const totalCost = formik.values.unitcost * formik.values.totalquantity;
      const gstAmount = (gst / 100) * totalCost;
      const grandTotal = totalCost + gstAmount;
      setGrandTotal(grandTotal.toFixed(2));
    };

    calculateGrandTotal();
  }, [formik.values.unitcost, formik.values.totalquantity, gst]);

  const formatDate = (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "");

  return (
    <form onSubmit={formik.handleSubmit}>
      <AlertDialog
        onClose={() => setShowAlertDialog(false)}
        open={showAlertDialog}
        text={alertText}
      />
      <div>
        {isStockRegistered && (
          <PopupMessage message="Stock Registered Successfully" />
        )}
        {errorMessage && <PopupMessage message={errorMessage} />}
        <section
          className="p-5 w-100"
          style={{ backgroundColor: "#eeeee", borderRadius: ".5rem .5rem 0 0" }}
        >
          <div className="row">
            <div className="col-12">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-3">
                  <div className="row">
                    <div className="col">
                      <p className="text-left h2 mb-3 mt-4">
                        Stock Information:
                      </p>

                      {/* Product Search and Details Section */}
                      <div className="row mt-3">
                        <InputLabel id="demo-simple-select-label">
                          Product Name*
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
                              placeholder={
                                selectedProducts
                                  ? selectedProducts.name
                                  : "Search Your Product"
                              }
                              aria-label="search"
                              value={formik.values.productname} // Bind Formik's value
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "productname",
                                  e.target.value,
                                ); // Update Formik's state
                                handleSearchChange(e); // Call custom search handler
                              }}
                              onBlur={formik.handleBlur} // Handle blur with Formik
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
                                  onClick={() => handleProductSelect(product)}
                                >
                                  {highlightSearchTerm(product.name)}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {!selectedProducts && formik.touched.productname ? (
                          <div className="mt-1">
                            <small className="text-danger">
                              Please Select a Product
                            </small>
                          </div>
                        ) : null}
                      </div>
                      {/* Other input fields */}
                      <div className="row mt-3">
                        <label htmlFor="firstname" className="form-label">
                          Product UPC
                        </label>
                        <input
                          id="firstname"
                          name="firstname"
                          className="form-control"
                          placeholder={upc}
                          value={formik.values.upccode}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={true}
                        />
                      </div>

                      <div className="row mt-3">
                        <label htmlFor="firstname" className="form-label">
                          Manufacturer
                        </label>
                        <input
                          id="manufacturer"
                          name="manufacturer"
                          className="form-control"
                          value={formik.values.manufacturer}
                          placeholder={manufacturer}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={true}
                        />
                      </div>
                      <div className="row mt-3">
                        <label htmlFor="email" className="form-label">
                          Product Type
                        </label>
                        <input
                          id="email"
                          name="email"
                          className="form-control"
                          value={formik.values.email}
                          placeholder={type}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={true}
                        />
                      </div>
                      <div className="row mt-3">
                        <label htmlFor="address" className="form-label">
                          Product Category/Sub Category
                        </label>
                        <input
                          id="address"
                          name="address"
                          className="form-control"
                          placeholder={category}
                          value={formik.values.address}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col md-5 ">
                      <div className="image-upload-container">
                        <Box
                          sx={{
                            border: "1px solid black",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: 500,
                            overflow: "hidden", // Ensures the image does not extend beyond the container bounds
                          }}
                        >
                          {productImage ? (
                            <img
                              src={productImage}
                              alt="Product"
                              style={{
                                width: "100%", // Ensures the image fills the container
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
                  </div>
                  <div className="row">
                    <div className="row">
                      <p className="text-left h2 mb-3 mt-4">Vendor Details</p>

                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="name" className="form-label">
                            Name*
                          </label>
                          <input
                            id="name"
                            name="name"
                            className="form-control"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.name && formik.touched.name ? (
                            <small className="text-danger mt-1">
                              {formik.errors.name}
                            </small>
                          ) : null}
                        </div>
                        <div className="col text-left">
                          <label htmlFor="phone" className="form-label">
                            Phone Number*
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            className="form-control"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                          />
                          {formik.errors.phone && formik.touched.phone ? (
                            <small className="text-danger mt-1">
                              {formik.errors.phone}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <p className="text-left h2 mb-3 mt-4">Stock Details</p>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="batchno" className="form-label">
                            Batch Number*
                          </label>
                          <input
                            id="batchno"
                            name="batchno"
                            className="form-control"
                            value={formik.values.batchno}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.batchno && formik.touched.batchno ? (
                            <small className="text-danger mt-1">
                              {formik.errors.batchno}
                            </small>
                          ) : null}
                        </div>
                        <div className="col text-left">
                          <label htmlFor="unitcost" className="form-label">
                            Unit Cost*
                          </label>
                          <input
                            id="unitcost"
                            name="unitcost"
                            className="form-control"
                            value={formik.values.unitcost}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                          />
                          {formik.errors.unitcost && formik.touched.unitcost ? (
                            <small className="text-danger mt-1">
                              {formik.errors.unitcost}
                            </small>
                          ) : null}
                        </div>
                        <div className="col text-left">
                          <label htmlFor="totalquantity" className="form-label">
                            Total Quantity*
                          </label>
                          <input
                            id="totalquantity"
                            name="totalquantity"
                            className="form-control"
                            value={formik.values.totalquantity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                          />
                          {formik.errors.totalquantity &&
                          formik.touched.totalquantity ? (
                            <small className="text-danger mt-1">
                              {formik.errors.totalquantity}
                            </small>
                          ) : null}
                        </div>
                        <div className="col text-left">
                          <label htmlFor="gst" className="form-label">
                            GST Rate*
                          </label>
                          <select
                            id="gst"
                            name="gst"
                            className="form-control"
                            value={formik.values.gst} // Bind Formik's value
                            onChange={formik.handleChange} // Handle change with Formik
                            onBlur={formik.handleBlur} // Handle blur with Formik
                          >
                            <option value="">Select GST Rate</option>
                            <option value="0">0%</option>
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18">18%</option>
                            <option value="28">28%</option>
                          </select>
                          {formik.touched.gst && formik.errors.gst ? (
                            <small className="text-danger mt-1">
                              {formik.errors.gst}{" "}
                              {/* Show Formik's error message */}
                            </small>
                          ) : null}
                        </div>

                        <div className="col text-left">
                          <label htmlFor="totalquantity" className="form-label">
                            Grand Total*
                          </label>
                          <input
                            id="grandtotal"
                            name="grandtotal"
                            className="form-control"
                            value={grandtotal}
                            placeholder={grandtotal}
                            type="text"
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-center">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Date of Manufacturing*"
                              value={
                                formik.values.dom
                                  ? dayjs(formik.values.dom, "DD/MM/YYYY")
                                  : null
                              }
                              onChange={(newValue) => {
                                if (newValue && newValue.isAfter(dayjs())) {
                                  setShowAlertDialog(true);
                                  setAlertText(
                                    "Invalid Date. Please select a date before the current date.",
                                  );
                                  // alert("Invalid Date. Please select a date before the current date.");
                                  formik.setFieldValue("dom", ""); // Reset if invalid
                                } else {
                                  formik.setFieldValue(
                                    "dom",
                                    newValue
                                      ? newValue.format("DD/MM/YYYY")
                                      : "",
                                  );
                                  formik.setFieldValue("doe", ""); // Reset DOE when DOM is selected
                                }
                              }}
                              onBlur={() => formik.setFieldTouched("dom", true)}
                              maxDate={dayjs()} // Disable dates after the current date
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                          {formik.touched.dom && formik.errors.dom ? (
                            <div className="mt-1">
                              <small className="text-danger">
                                {formik.errors.dom}
                              </small>
                            </div>
                          ) : null}
                        </div>

                        <div className="col text-center mt-3">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label={
                                formik.values.type === "Equipments"
                                  ? "Date of PM*"
                                  : "Date of Expiry*"
                              }
                              value={
                                formik.values.doe
                                  ? dayjs(formik.values.doe, "DD/MM/YYYY")
                                  : null
                              }
                              onChange={(newValue) => {
                                if (
                                  formik.values.dom &&
                                  newValue &&
                                  newValue.isBefore(
                                    dayjs(formik.values.dom, "DD/MM/YYYY"),
                                  )
                                ) {
                                  setShowAlertDialog(true);
                                  setAlertText(
                                    "Invalid Date. Please select a date after the Date of Manufacturing.",
                                  );
                                  // alert(
                                  //   "Invalid Date. Please select a date after the Date of Manufacturing.",
                                  // );
                                  formik.setFieldValue(
                                    "doe",
                                    formik.values.dom,
                                  ); // Set to DOM if invalid
                                } else {
                                  formik.setFieldValue(
                                    "doe",
                                    newValue
                                      ? newValue.format("DD/MM/YYYY")
                                      : "",
                                  );
                                }
                              }}
                              onBlur={() => formik.setFieldTouched("doe", true)}
                              minDate={
                                formik.values.dom
                                  ? dayjs(formik.values.dom, "DD/MM/YYYY")
                                  : undefined
                              } // Restrict to dates after DOM
                              disabled={!formik.values.dom} // Disable DOE field when DOM is not selected
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </LocalizationProvider>
                          {formik.touched.doe && formik.errors.doe ? (
                            <div className="mt-1">
                              <small className="text-danger">
                                {formik.errors.doe}
                              </small>
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="row mt-3 button-row">
                        <div className="d-flex justify-content-end">
                          <div className=" actionButtons">
                            <Button
                              variant="contained"
                              onClick={clearAllFields}
                              size="large"
                              className="mr-3"
                            >
                              Clear
                            </Button>
                          </div>
                          <div className="button-spacing"></div>{" "}
                          <div className="actionButtons">
                            {/* Add this div for spacing */}
                            <Button
                              variant="contained"
                              size="large"
                              onClick={() => {
                                console.log("Button Clicked");
                                formik.handleSubmit();
                              }}
                            >
                              Add Stock
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <h3>Stock Entries</h3>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>UPC</th>
                          <th>Name</th>
                          <th>Mfg.</th>
                          <th>Vendor</th>
                          <th>Batch No.</th>
                          <th>Unit Cost</th>
                          <th>Qty.</th>
                          <th>Date of Mfg.</th>
                          <th>Date of Exp./PM.</th>
                          <th>GST Rate</th>
                          <th>Grand Total</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stockEntries.map((stockEntry, index) => (
                          <tr key={index}>
                            <td>{stockEntry.upccode}</td>
                            <td>{stockEntry.productname}</td>
                            <td>{stockEntry.manufacturer}</td>
                            <td>{stockEntry.name}</td>
                            <td>{stockEntry.batchno}</td>
                            <td>{stockEntry.unitcost}</td>
                            <td>{stockEntry.totalquantity}</td>
                            <td>{stockEntry.dom}</td>
                            <td>{stockEntry.doe}</td>
                            {/* <td>
                                {stockEntry.dom instanceof Date
                                  ? stockEntry.dom.toLocaleDateString()
                                  : ""}
                              </td>
                              <td>
                                {stockEntry.doe instanceof Date
                                  ? stockEntry.doe.toLocaleDateString()
                                  : ""}
                              </td> */}
                            <td>{stockEntry.gst}</td>
                            <td>{stockEntry.grandtotal}</td>
                            <td>
                              <IconButton
                                variant="contained"
                                style={{
                                  marginLeft: "20px",
                                  backgroundColor: "white",
                                  color: "red",
                                  transition:
                                    "background-color 0.3s, color 0.3s",
                                }}
                                onMouseOver={(e) => {
                                  e.target.style.backgroundColor = "#c45516";
                                  e.target.style.color = "white";
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.backgroundColor = "#2E718A";
                                  e.target.style.color = "white";
                                }}
                                onClick={() => removeStockEntry(index)}
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
                      onClick={handleSubmitAllStockEntries}
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
                <li key={field}>{field}</li>
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
    </form>
  );
};

export default StockEntry;
