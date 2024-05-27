import { StockSchema } from "./StockEntrySchema";
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

//search functionality
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import fetchSearchResults from "../utils/fetchSearchResults.js";

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
  alignitems: center;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StockEntry = () => {
  const [prodnames, setProdNames] = useState([]);
  const [categoryarray, setCategoryArray] = useState([]);
  const [manufacturerarray, setManufacturerArray] = useState([]);
  const [upcarray, setUpcArray] = useState([]);
  const [typearray, setTypeArray] = useState([]);
  const [productidarray, setProductIdArray] = useState([]);
  const [category, setCategory] = useState(null);
  const [manufacturer, setManufacturer] = useState(null);
  const [productImageArray, setProductImageArray] = useState([]);
  const [upc, setUpc] = useState(null);
  const [type, setType] = useState(null);
  const [id, setId] = useState(null);
  const [doe, setDoe] = useState(null);
  const [dom, setDom] = useState(null);
  const hospitalid = localStorage.getItem("hospitalid");
  const [open, setOpen] = useState(false);
  const [isStockRegistered, setIsStockRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [stockEntries, setStockEntries] = useState([]);
  const [stockId, setStockId] = useState([]);
  const [stockProductArray, setStockProductArray] = useState([]);
  const [existQuantity, setExistQuantity] = useState([]);
  const [name, setName] = useState("");

  // State variables for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);

  // handle search input changes
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

  // handle product selection from search results
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

  // highlight the search term in the search results
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
          )
        )}
      </span>
    );
  };

  const bufferToBase64 = (buf) => {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buf));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  useEffect(() => {
    if (isStockRegistered) {
      const timer = setTimeout(() => {
        window.location.reload(); // Reload the page after the desired delay
      }, 3000); // Adjust the delay as needed (in milliseconds)

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
    initialValues,
    validationSchema: StockSchema,
    onSubmit: (values, action) => {
      const stockEntry = {
        hospitalid: localStorage.getItem("hospitalid"),
        productid: id,
        name: values.name,
        phone: values.phone,
        batchno: values.batchno,
        unitcost: values.unitcost,
        totalquantity: values.totalquantity,
        buffervalue: +values.totalquantity * 0.15,
        doe: doe ? doe.toDate() : null, // Convert doe to a Date object
        dom: dom ? dom.toDate() : null, // Convert dom to a Date object
        upccode: upc,
        productname: name,
        manufacturer: manufacturer,
      };

      // console.log("Adding stock entry:", stockEntry); // Debugging log

      // Add the stock entry to the stockEntries array
      setStockEntries([...stockEntries, stockEntry]);

      // Reset the form
      action.resetForm();
      setDoe(null);
      setDom(null);
    },
  });

  const handleSubmitAllStockEntries = async () => {
    try {
      for (const stockEntry of stockEntries) {
        // console.log("Submitting stock entry:", stockEntry); // Debugging log

        // // Log all values to ensure they are correct
        // console.log("hospitalid:", stockEntry.hospitalid);
        // console.log("productid:", stockEntry.productid);
        // console.log("name:", stockEntry.name);
        // console.log("phone:", stockEntry.phone);
        // console.log("batchno:", stockEntry.batchno);
        // console.log("unitcost:", stockEntry.unitcost);
        // console.log("totalquantity:", stockEntry.totalquantity);
        // console.log("buffervalue:", stockEntry.buffervalue);
        // console.log("doe:", stockEntry.doe?.toISOString());
        // console.log("dom:", stockEntry.dom?.toISOString());

        const response = await Axios.post(
          `${process.env.REACT_APP_BASE_URL}poststocks`,
          {
            hospitalid: stockEntry.hospitalid,
            productid: stockEntry.productid,
            name: stockEntry.name,
            phone: stockEntry.phone,
            batchno: stockEntry.batchno,
            unitcost: stockEntry.unitcost,
            totalquantity: stockEntry.totalquantity,
            buffervalue: stockEntry.buffervalue,
            doe: stockEntry.doe?.toISOString(), // Convert doe to ISO string
            dom: stockEntry.dom?.toISOString(), // Convert dom to ISO string
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // console.log("Stock entry submission response:", response); // Debugging log

        const history = {
          hospitalid: stockEntry.hospitalid,
          date: new Date().toLocaleDateString(),
          productid: stockEntry.productid,
          quantity: stockEntry.totalquantity,
          type: "Stock Entry",
        };

        const historyResponse = await Axios.post(
          `${process.env.REACT_APP_BASE_URL}posthistory`,
          history
        );

        // console.log("History entry submission response:", historyResponse); // Debugging log
      }

      setIsStockRegistered(true);
      setOpen(true);
      setStockEntries([]);
    } catch (error) {
      alert("Error Registering Stocks");
      console.error("Error creating Stocks:", error);
    }
  };

  return (
    <div>
      {isStockRegistered && (
        <PopupMessage message="Stock Registered Successfully" />
      )}
      {errorMessage && <PopupMessage message={errorMessage} />}
      <section
        className="p-5 w-100"
        style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-3">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col">
                      <p className="text-left h2 mb-3 mt-4">
                        Stock Information:
                      </p>

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
                              placeholder="Search Your Product"
                              aria-label="search"
                              value={searchTerm}
                              onChange={(e) => handleSearchChange(e)}
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
                      </div>
                      <div className="row mt-3">
                        <label htmlFor="firstname" className="form-label">
                          Product UPC/Product Name/Manufacturer
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
                        <label htmlFor="manufacturer" className="form-label">
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
                      <div className="row mt-3">
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
                          {productImage ? (
                            <img
                              src={productImage}
                              alt="Product"
                              style={{ maxWidth: "100%", maxHeight: "100%" }}
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
                      </div>

                      <div className="row mt-3">
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
                              label={
                                type === "Equipments"
                                  ? "Date of PM*"
                                  : "Date of Expiry*"
                              }
                              value={doe}
                              onChange={(newValue) => setDoe(newValue)}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                      <div className="row mt-3 justify-content-around">
                        <div className="col-3">
                          <Button
                            variant="outlined"
                            onClick={formik.resetForm}
                            size="large"
                          >
                            Clear
                          </Button>
                        </div>
                        <div className="col-3">
                          <Button
                            variant="contained"
                            onClick={formik.handleSubmit}
                            size="large"
                          >
                            Add Stock
                          </Button>
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
                            <td>
                              {stockEntry.dom instanceof Date
                                ? stockEntry.dom.toLocaleDateString()
                                : ""}
                            </td>
                            <td>
                              {stockEntry.doe instanceof Date
                                ? stockEntry.doe.toLocaleDateString()
                                : ""}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="col text-center actionButtons">
                    <Button
                      variant="primary"
                      size="lg"
                      type="button"
                      onClick={handleSubmitAllStockEntries}
                    >
                      Submit
                    </Button>
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
