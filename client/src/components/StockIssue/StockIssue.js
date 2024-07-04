import { useState, useEffect, React, CSSProperties } from "react";
import { useFormik } from "formik";
import { MenuItem, Button, Select, InputLabel, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopupMessage from "../PopupMessage/PopupMessage.js";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import fetchSearchResults from "../utils/fetchSearchResults.js";

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
  productid: "",
  quantityissued: "",
};

const StockIssue = () => {
  const [prodnames, setProdNames] = useState([]);
  const [manufacturerarray, setManufacturerArray] = useState([]);
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

  useEffect(() => {
    if (isStockIssued) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000);
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
      const url = `${process.env.REACT_APP_BASE_URL}stocks`;
      const { data } = await axios.get(url);
      const stockid = new Array(data.document.length);
      const quantity = new Array(data.document.length);
      const productid = new Array(data.document.length);
      const bufferValues = new Array(data.document.length);

      let a = 0;
      for (let i = 0; i < data.document.length; i++) {
        if (data.document[i].hospitalid == hospitalid) {
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
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getprod = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}products`;
      const { data } = await axios.get(url);

      const prodnamesarray = new Array(data.document.length);
      const manu = new Array(data.document.length);
      const upc = new Array(data.document.length);
      const id = new Array(data.document.length);

      let a = 0;
      for (let i = 0; i < data.document.length; i++) {
        if (data.document[i].hospitalid == hospitalid) {
          prodnamesarray[a] = data.document[i].name;
          manu[a] = data.document[i].manufacturer;
          upc[a] = data.document[i].upccode;
          id[a] = data.document[i]._id;
          a++;
        }
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
      const stockIssue = {
        hospitalid: localStorage.getItem("hospitalid"),
        firstname: values.firstname,
        lastname: values.lastname,
        department: values.department,
        productid: id,
        quantityissued: values.quantityissued,
        manufacturer: manufacturer,
        productname: selectedProducts.name,
      };

      setBulkStockIssues([...bulkStockIssues, stockIssue]);

      setFieldValue("productid", "");
      setFieldValue("quantityissued", "");
      setSelectedProducts(null);
      setManufacturer("");
      setUpc("");
      setProductImage(null);
      setMaxQuantity("Please Wait Loading...");
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
          stockIssue.productid
        );

        if (productIndex === -1) {
          throw new Error(
            `Product with ID ${stockIssue.productid} not found in stock`
          );
        }

        const remainingQuantity =
          quantityarray[productIndex] - stockIssue.quantityissued;

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}postissues`,
          stockIssue
        );

        const history = {
          hospitalid: stockIssue.hospitalid,
          date: new Date().toLocaleDateString(),
          productid: stockIssue.productid,
          quantity: stockIssue.quantityissued,
          type: "Product Issued",
        };

        await axios.post(
          `${process.env.REACT_APP_BASE_URL}posthistory`,
          history
        );

        await axios.put(
          `${process.env.REACT_APP_BASE_URL}updatestocks/${stockidarray[productIndex]}`,
          {
            _id: stockidarray[productIndex],
            totalquantity: remainingQuantity,
          }
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
    } catch (error) {
      alert("Error Issuing Stocks: " + error.message);
      console.error("Error issuing stock:", error);
    }
  };

  return (
    <div>
      {isStockIssued && <PopupMessage message="Stock Issued Successfully" />}
      {errorMessage && <PopupMessage message={errorMessage} />}
      <section
        className="p-5 w-100"
        style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
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
                              Department*
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
                      </div>
                      <div className="row">
                        <br />
                        <br />
                        <br />
                        <p className="text-left h3 mb-3 mt-4">Stock Issued:</p>
                        <div className="col">
                          <div className="row">
                            <InputLabel id="product-name-label">
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
                          <div className="row">
                            <label
                              htmlFor="quantityissued"
                              className="form-label"
                            >
                              Quantity Issued*
                            </label>
                            <input
                              id="quantityissued"
                              name="quantityissued"
                              className="form-control"
                              placeholder={`Available Quantity : ${maxquantity}`}
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
                              margin: "10px",
                              height: 200,
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
                      <br />
                      <div className="row mt-3 justify-content-end button-row">
                        <div className="d-flex justify-content-end">
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setFieldValue("productid", "");
                              setFieldValue("quantityissued", "");
                              setSelectedProducts(null);
                              setManufacturer("");
                              setUpc("");
                              setProductImage(null);
                              setMaxQuantity("Please Wait Loading...");
                              setSearchTerm("");
                            }}
                            className="mr-3"
                          >
                            Clear
                          </Button>
                          <div className="button-spacing"></div>
                          <Button variant="contained" onClick={handleSubmit}>
                            Add
                          </Button>
                        </div>
                      </div>
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
                            <Button
                              variant="danger"
                              onClick={() => removeStockIssue(index)}
                            >
                              Remove
                            </Button>
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
    </div>
  );
};

export default StockIssue;
