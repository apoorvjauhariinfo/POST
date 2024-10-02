import { ProductSchema } from "./ProductEntrySchema.js";
import axios from "axios";
import { useState, useEffect, React } from "react";
import { useFormik } from "formik";
import "./ProductEntry.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Select, InputLabel, MenuItem } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Modal } from 'react-bootstrap';

import LoaderOverlay from "../Loader/LoaderOverlay.js";
import PopupMessage from "../PopupMessage/PopupMessage.js";
import {
  faEye,
  faEyeSlash,
  faEdit,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AlertDialog from "../UI/AlertDialog";

const initialValues = {
  producttype: "",
  category: "",
  subcategory: "",
  upccode: "",
  name: "",
  manufacturer: "",
  origin: "",
  emergencytype: "",
  description: "",
  productImage: null,
};

const ProductEdit = () => {
  const location = useLocation();
  const { state } = location;
  const { id } = state || {};
  const hospitalid = localStorage.getItem("hospitalid");
  const [loading, setLoading] = useState(false);

  //Hooks for Initital Values
  const [initialname, setInitialName] = useState(null);
  const [initialproducttype, setInitialProductType] = useState(null);
  const [initialcategory, setInitialCategory] = useState(null);
  const [initialsubcategory, setInitialSubcategory] = useState(null);
  const [initialupccode, setInitialUpcCode] = useState(null);
  const [initialmanufacturer, setInitialManufacturer] = useState(null);
  const [initialorigin, setInitialOrigin] = useState(null);
  const [initialdescription, setInitialDescription] = useState(null);
  const [initialemergencytype, setInitialEmergencyType] = useState(null);
  const [initialproductimage, setInitialProductImage] = useState(null);
  const [image, setImage] = useState(null);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [alertText, setAlertText] = useState("");

  const [producttype, setProductType] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [emergency, setEmergency] = useState("");
  const [origin, setOrigin] = useState("");
  const [upccode, setUpccode] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isProductRegistered, setIsProductRegistered] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [editableFields, setEditableFields] = useState({
    producttype: false,
    category: false,
    subcategory: false,
    upccode: false,
    name: false,
    manufacturer: false,
    origin: false,
    emergencytype: false,
    description: false,
    productImage: false,
  });

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const bufferToBase64 = (buf) => {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buf));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const getprod = async () => {
    try {
      // console.log(process.env.REACT_APP_BASE_URL);
      const url = `${process.env.REACT_APP_BASE_URL}productbyid/${id}`;

      const { data } = await axios.get(url);
      // const products = data.products[0]._id;
      console.log("Products are " + data.product);

      const products = data.product;
      setInitialName(products[0].name);
      setInitialProductType(products[0].producttype);
      setInitialCategory(products[0].category);
      setInitialSubcategory(products[0].subcategory);
      setInitialUpcCode(products[0].upccode);
      setInitialManufacturer(products[0].manufacturer);
      setInitialOrigin(products[0].origin);
      setInitialDescription(products[0].description);
      setInitialEmergencyType(products[0].emergencytype);
      const imageData = products[0].productImage;
      if (imageData && imageData.data) {
        const base64String = bufferToBase64(imageData.data);
        setInitialProductImage(`data:image/jpeg;base64,${base64String}`);
      } else {
        setInitialProductImage(null);
      }

      // setProductType(initialproducttype);
      // setCategory(initialcategory);
      // setSubCategory(initialsubcategory);
      setOrigin(initialorigin);
      setEmergency(initialemergencytype);

      console.log("producttype" + initialproducttype);
      console.log("category" + initialcategory);
      console.log("subcategory" + initialsubcategory);
      console.log("upccode" + initialupccode);
      console.log("manufacturer" + initialmanufacturer);
      console.log("origin" + initialorigin);
      console.log("emergencytype" + initialemergencytype);
      console.log("description" + initialdescription);
      console.log("Product image" + initialproductimage);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getprod();
  }, [initialproducttype == null]);

  const toggleEditable = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const removeProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  useEffect(() => {
    if (isProductRegistered) {
      const timer = setTimeout(() => {
        navigate("/totalproduct"); // Reload the page after the desired delay
      }, 3000); // Adjust the delay as needed (in milliseconds)

      return () => clearTimeout(timer);
    }
  }, [isProductRegistered]);

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
    Pharmaceuticals: [
      { value: "Pharmaceuticals", label: "Pharmaceuticals" },
      { value: "Dietary", label: "Dietary Supplements" },
      { value: "Ayush", label: "Ayush Medicines" },
      { value: "Medical", label: "Medical Consumables" },
    ],
    Equipments: [
      { value: "Furniture", label: "Medical Furniture" },
      { value: "Instruments", label: "Medical Instruments" },
      { value: "Equipments", label: "Medical Equipments" },
    ],
    Consumables: [{ value: "Consume", label: "Consumable Items" }],
  };

  const subcatMap = {
    Pharmaceuticals: [
      { value: "Cardiovascular", label: "Cardiovascular Medications" },
      { value: "Hormones", label: "Hormones" },
      { value: "Inhalable", label: "Inhalable Medications" },
      { value: "Oral", label: "Oral Medications" },
      { value: "Topical", label: "Topical Medications" },
    ],
    Dietary: [
      { value: "Amino", label: "Amino Acid Supplements" },
      { value: "Probiotics", label: "Probiotics and Prebiotics" },
      { value: "Skincare", label: "Skincare Neutraceuticals" },
      { value: "Supplements", label: "Supplements" },
      { value: "Vitamins", label: "Vitamins and Minerals" },
    ],
    Ayush: [
      { value: "Ayurvedic", label: "Ayurvedic Medicines" },
      { value: "Herbal", label: "Herbal Extracts" },
      { value: "HerbalS", label: "Herbal Supplements" },
    ],
    Medical: [
      { value: "Catheters", label: "Catheters and Tubes" },
      { value: "Dental", label: "Dental Consumables" },
      { value: "Infection", label: "Infection Control Consumables" },
      { value: "Laboratory", label: "Laboratory Consumables" },
      { value: "Radiology", label: "Radiology Consumables" },
      { value: "Respiratory", label: "Respiratory Consumables" },
      { value: "Surgical", label: "Surgical Consumables" },
      { value: "Wound", label: "Wound Care Supplies" },
    ],
    Furniture: [
      { value: "Bed", label: "Patient Bed Furniture" },
      { value: "Seating", label: "Seating Furniture" },
      { value: "Storage", label: "Storage Furniture" },
      { value: "Diagnostic Furniture", label: "Diagnostic Furniture" },
      { value: "Patient Room Furniture", label: "Patient Room Furniture" },
      { value: "Rehabilitation Furniture", label: "Rehabilitation Furniture" },
      { value: "Laboratory Furniture", label: "Laboratory Furniture" },
      { value: "Waiting Area Furniture", label: "Waiting Area Furniture" },
      { value: "Surgical Room Furniture", label: "Surgical Room Furniture" },
      { value: "Privacy Furniture", label: "Privacy Furniture" },
    ],
    Instruments: [
      { value: "Diagnostic Instruments", label: "Diagnostic Instruments" },
      { value: "Surgical Instruments", label: "Surgical Instruments" },
      { value: "Endoscopy Instruments", label: "Endoscopy Instruments" },
      { value: "Orthopedic Instruments", label: "Orthopedic Instruments" },
      { value: "Dental Instruments", label: "Dental Instruments" },
      {
        value: "Gynecological and Obstetric Instruments",
        label: "Gynecological and Obstetric Instruments",
      },
      { value: "Cardiac Instruments", label: "Cardiac Instruments" },
      {
        value: "Microsurgical Instruments",
        label: "Microsurgical Instruments",
      },
      {
        value: "Neurosurgical Instruments",
        label: "Neurosurgical Instruments",
      },
      { value: "Urological Instruments", label: "Urological Instruments" },
    ],
    Equipments: [
      { value: "Diagnostic Equipment", label: "Diagnostic Equipment" },
      { value: "Monitoring Equipment", label: "Monitoring Equipment" },
      { value: "Therapeutic Equipment", label: "Therapeutic Equipment" },
      { value: "Surgical Equipment", label: "Surgical Equipment" },
      { value: "Rehabilitation Equipment", label: "Rehabilitation Equipment" },
      { value: "Patient Care Equipment", label: "Patient Care Equipment" },
      { value: "Laboratory Equipment", label: "Laboratory Equipment" },
      {
        value: "Emergency Medical Equipment",
        label: "Emergency Medical Equipment",
      },
      {
        value: "Radiation Therapy Equipment",
        label: "Radiation Therapy Equipment",
      },
    ],
    Consume: [
      { value: "Catheters and Tubes", label: "Catheters and Tubes" },
      { value: "Dental Consumables", label: "Dental Consumables" },
      {
        value: "Infection Control Consumables",
        label: "Infection Control Consumables",
      },
      { value: "Laboratory Consumables", label: "Laboratory Consumables" },
      { value: "Radiology Consumables", label: "Radiology Consumables" },
      { value: "Respiratory Consumables", label: "Respiratory Consumables" },
      { value: "Surgical Consumables", label: "Surgical Consumables" },
      {
        value: "Wound Care Supplies",
        label: "Wound Care Supplies",
      },
    ],
  };

  const navigate = useNavigate();
  const navigateToVerify = () => {
    navigate("/");
  };

  const formik = useFormik({
    initialValues,

    validationSchema: ProductSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("hospitalid", localStorage.getItem("hospitalid"));
        formData.append("producttype", producttype);
        formData.append("category", category);
        formData.append("subcategory", subcategory);
        formData.append("upccode", upccode);
        formData.append("name", name);
        formData.append("manufacturer", manufacturer);
        formData.append("origin", origin);
        formData.append("emergencytype", emergency);
        formData.append("description", description);
        formData.append("productImage", productImage);

        await axios.put(
          `${process.env.REACT_APP_BASE_URL}updateexistingproduct/` +
            id.toString(),
          { formData },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        setLoading(false);
        setIsProductRegistered(true);
        setOpen(true);
      } catch (error) {
        setShowAlertDialog(true);
        setAlertText("Error Registering Products");
        // alert("Error Registering Products");
        console.error("Error creating Products:", error);
        setLoading(false);
      }
      action.resetForm();
    },
  });

  
const handleConfirmation = async () => {
  setShowConfirmDialog(true);
};
const handleConfirmEdit = async () => {
  // Your code to edit the product details
  setShowConfirmDialog(false);
  handleSubmitAllProducts();
};
  const handleSubmitAllProducts = async () => {
    // setLoading(true);
    try {
      const formData = new FormData();
      formData.append("hospitalid", localStorage.getItem("hospitalid"));
      formData.append("producttype", producttype || initialproducttype);
      formData.append("category", category || initialcategory);
      formData.append("subcategory", subcategory || initialsubcategory);
      formData.append("upccode", formik.values.upccode || initialupccode);
      formData.append("name", formik.values.name);
      formData.append(
        "manufacturer",
        formik.values.manufacturer || initialmanufacturer,
      );
      formData.append("origin", origin || initialorigin);
      formData.append("emergencytype", emergency || initialemergencytype);
      formData.append(
        "description",
        formik.values.description || initialdescription,
      );
      formData.append(
        "productImage",
        formik.values.productImage || initialproductimage,
      );

      console.log(
        "formdata is:" +
          formData.get("producttype") +
          formData.get("category") +
          formData.get("subcategory") +
          formData.get("upccode") +
          formData.get("name") +
          formData.get("manufacturer") +
          formData.get("origin") +
          formData.get("emergencytype") +
          formData.get("description"),
      );

      const demand = {
        _id: id.toString(),
        hospitalid: localStorage.getItem("hospitalid"),
        producttype: producttype || initialproducttype,
        category: category || initialcategory,
        subcategory: subcategory || initialsubcategory,
        upccode: formik.values.upccode || initialupccode,
        name: formik.values.name || initialname,
        manufacturer: formik.values.manufacturer || initialmanufacturer,
        origin: origin,
        emergencytype: emergency,
        description: formik.values.description || initialdescription,
      };
      function demandToString(demand) {
        return [
          demand._id,
          demand.hospitalid,
          demand.producttype,
          demand.category,
          demand.subcategory,
          demand.upccode,
          demand.name,
          demand.manufacturer,
          demand.origin,
          demand.emergencytype,
          demand.description,
        ].join(", ");
      }
      const request = {
        userid: localStorage.getItem("id"),
        hospitalid: localStorage.getItem("hospitalid"),
        inventorymanagerid: localStorage.getItem("inventorymanagerid"),
        productid: id,
        demand: demandToString(demand),
        status: "pending",
        requestdate: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      };
      try {
        const postRequest = async () => {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}postrequests`,
            request,
          );

          console.log(response);
        };
        postRequest();
      } catch (error) {
        setShowAlertDialog(true);
        setAlertText("Error Posting Request");
        // alert("Error Posting Request");
        console.error("Error creating request:", error);
      }
      setShowAlertDialog(true);
      setAlertText("Your Request is submitted To HOH successfully");
      // alert("Your Request is submitted To HOH successfully");
      // const response = await axios.put(
      //   `${process.env.REACT_APP_BASE_URL}updateexistingproduct/`+ id.toString(),
      //    {
      //     _id : id.toString(),
      //     hospitalid : localStorage.getItem("hospitalid"),
      //     producttype : producttype ||initialproducttype ,
      //     category : category || initialcategory,
      //     subcategory : subcategory || initialsubcategory,
      //     upccode : formik.values.upccode || initialupccode,
      //     name : formik.values.name || initialname,
      //     manufacturer : formik.values.manufacturer || initialmanufacturer,
      //     origin : origin,
      //     emergencytype : emergency,
      //     description : formik.values.description || initialdescription,
      //    // productImage : formik.values.productImage || initialproductimage,

      //    },
      // );
      // let userData = (await response).data;
      // console.log(userData);

      setLoading(false);
      setIsProductRegistered(true);
      setOpen(true);
    } catch (error) {
      setShowAlertDialog(true);
      setAlertText("Error Registering Products");
      // alert("Error Registering Products");
      console.error("Error creating Products:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <LoaderOverlay loading={loading} />
      {isProductRegistered && (
        <PopupMessage message="Product is Updated Successfully" />
      )}
      <AlertDialog
        open={showAlertDialog}
        onClose={() => setShowAlertDialog(false)}
        text={alertText}
      />
      <section
        className="p-5 w-100"
        style={{ backgroundColor: "#eeeee", borderRadius: ".5rem .5rem 0 0" }}
      >
        <div className="row">
          <div className="col">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-3">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col">
                      <p className="text-left h2 mb-3 mt-4">
                        Product Information:
                      </p>
                      <div className="row mt-3 w-100">
                        <InputLabel id="product-type-label">
                          Current Product Type: {initialproducttype}
                        </InputLabel>
                        <Select
                          sx={{ backgroundColor: "#FFFF", height: "50%" }}
                          labelId="product-type-label"
                          id="product-type"
                          value={producttype}
                          label={initialproducttype}
                          placeholder={initialproducttype}
                          onChange={selectionChangeHandler}
                        >
                          <MenuItem value={"Pharmaceuticals"}>
                            Pharmaceutical
                          </MenuItem>
                          <MenuItem value={"Equipments"}>Equipment</MenuItem>
                          <MenuItem value={"Consumables"}>Consumable</MenuItem>
                        </Select>
                        {!producttype && formik.touched.producttype ? (
                          <small className="text-danger mt-1">
                            Please Select The Product Type
                          </small>
                        ) : null}
                      </div>
                      <div className="row mt-3 w-100">
                        <InputLabel id="category-label">
                          Current Product Category: {initialcategory}
                        </InputLabel>
                        <Select
                          sx={{ backgroundColor: "#FFFF", height: "50%" }}
                          labelId="category-label"
                          id="category"
                          value={category}
                          label="Category"
                          placeholder={initialcategory}
                          onChange={selectionChangeHandler2}
                        >
                          {prodMap[producttype]
                            ? prodMap[producttype].map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                  {item.label}
                                </MenuItem>
                              ))
                            : ""}
                        </Select>
                        {!category && formik.touched.category ? (
                          <small className="text-danger mt-1">
                            Please select a product category
                          </small>
                        ) : null}
                      </div>
                      <div className="row mt-3 w-100">
                        <InputLabel id="subcategory-label">
                          Current Product Subcategory: {initialsubcategory}
                        </InputLabel>
                        <Select
                          sx={{ backgroundColor: "#FFFF", height: "50%" }}
                          labelId="subcategory-label"
                          id="subcategory"
                          value={subcategory}
                          placeholder={initialsubcategory}
                          label="Sub Category"
                          onChange={selectionChangeHandler5}
                        >
                          {subcatMap[category]
                            ? subcatMap[category].map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                  {item.label}
                                </MenuItem>
                              ))
                            : ""}
                        </Select>
                        {!subcategory && formik.touched.subcategory ? (
                          <small className="text-danger mt-1">
                            Please Select Product Subcategory
                          </small>
                        ) : null}
                      </div>
                      <div className="row mt-3 w-100">
                        <label htmlFor="upccode" className="form-label">
                          Product UPC*
                        </label>
                        <div className="input-group">
                          <input
                            id="upccode"
                            name="upccode"
                            className="form-control"
                            placeholder={initialupccode}
                            value={formik.values.upccode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={!editableFields.upccode}
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text"
                              onClick={() => toggleEditable("upccode")}
                            >
                              <FontAwesomeIcon
                                icon={editableFields.upccode ? faLock : faEdit}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3 w-100">
                        <label htmlFor="name" className="form-label">
                          Product Name*
                        </label>
                        <div className="input-group">
                          <input
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder={initialname}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={!editableFields.name}
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text"
                              onClick={() => toggleEditable("name")}
                            >
                              <FontAwesomeIcon
                                icon={editableFields.name ? faLock : faEdit}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3 w-100">
                        <label htmlFor="manufacturer" className="form-label">
                          Manufacturer*
                        </label>
                        <div className="input-group">
                          <input
                            id="manufacturer"
                            name="manufacturer"
                            className="form-control"
                            placeholder={initialmanufacturer}
                            value={formik.values.manufacturer}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={!editableFields.manufacturer}
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text"
                              onClick={() => toggleEditable("manufacturer")}
                            >
                              <FontAwesomeIcon
                                icon={
                                  editableFields.manufacturer ? faLock : faEdit
                                }
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3 w-100">
                        <InputLabel id="origin-label">
                          Product Origin*
                        </InputLabel>
                        <Select
                          sx={{ backgroundColor: "#FFFF", height: "50%" }}
                          labelId="origin-label"
                          id="origin"
                          value={origin}
                          label="Origin"
                          onChange={selectionChangeHandler6}
                        >
                          <MenuItem value={"USA"}>USA</MenuItem>
                          <MenuItem value={"KOREA"}>Korea</MenuItem>
                          <MenuItem value={"INDIA"}>India</MenuItem>
                          <MenuItem value={"AUSTRALIA"}>Australia</MenuItem>
                        </Select>
                        {!origin && formik.touched.origin ? (
                          <small className="text-danger mt-1">
                            Please Select Product Origin
                          </small>
                        ) : null}
                      </div>
                      <div className="row mt-4 w-100">
                        <InputLabel id="emergencytype-label">
                          Emergency Type*
                        </InputLabel>
                        <Select
                          sx={{ backgroundColor: "#FFFF", height: "50%" }}
                          labelId="emergencytype-label"
                          id="emergencytype"
                          value={emergency}
                          label="Emergency Type"
                          onChange={selectionChangeHandler3}
                        >
                          <MenuItem value={"Critical"}>Critical</MenuItem>
                          <MenuItem value={"Non Critical"}>
                            Non-Critical
                          </MenuItem>
                        </Select>
                        {!emergency && formik.touched.emergencytype ? (
                          <small className="text-danger mt-1">
                            Please Select Emergency Type
                          </small>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-5">
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
                          }}
                        >
                          {initialproductimage ? (
                            <img
                              src={initialproductimage}
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
                          {formik.values.productImage && (
                            <img
                              src={URL.createObjectURL(
                                formik.values.productImage,
                              )}
                              alt="product-preview"
                              style={{ maxWidth: "100%", maxHeight: "100%" }}
                            />
                          )}
                          <input
                            type="file"
                            name="productImage"
                            onChange={(e) => {
                              setProductImage(e.target.files[0]);
                              formik.setFieldValue(
                                "productImage",
                                e.target.files[0],
                              );
                            }}
                            style={{ display: "none" }}
                            id="product-image-input"
                          />
                        </Box>
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={(e) => {
                            e.preventDefault();
                            document
                              .getElementById("product-image-input")
                              .click();
                          }}
                          className="image-upload-button"
                        >
                          {formik.values.productImage
                            ? "Change Image"
                            : "Add Product Image"}
                        </Button>
                        {formik.errors.productImage &&
                        formik.touched.productImage ? (
                          <small className="text-danger mt-1">
                            {formik.errors.productImage}
                          </small>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="row">
                      <div className="row w-120">
                        <label htmlFor="description" className="form-label">
                          Product Description*
                        </label>
                        <div className="input-group">
                          <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            placeholder={initialdescription}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={!editableFields.description}
                          ></textarea>
                          <div className="input-group-append">
                            <span
                              className="input-group-text"
                              onClick={() => toggleEditable("description")}
                            >
                              <FontAwesomeIcon
                                icon={editableFields.state ? faLock : faEdit}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="col text-center actionButtons">
                        <Button
                          variant="secondary"
                          size="lg"
                          onClick={formik.resetForm}
                        >
                          Back
                        </Button>
                        <Button
                          variant="primary"
                          size="lg"
                          type="button"
                          onClick={handleConfirmation}
                          className="ml-2"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal show={showConfirmDialog} onHide={() => setShowConfirmDialog(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Changes</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Are you sure you want to edit this product details?
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowConfirmDialog(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleConfirmEdit}>
      Yes
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
};

export default ProductEdit;
