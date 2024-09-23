import { ProductSchema } from "./ProductEntrySchema.js";
import Axios from "axios";
import { useState, useEffect, React } from "react";
import { useFormik } from "formik";
import "./ProductEntry.css";
import { Button } from "react-bootstrap";
import { getIconButtonUtilityClass } from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Select, InputLabel, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import PrintIcon from "@mui/icons-material/Print";

import LoaderOverlay from "../Loader/LoaderOverlay.js";
import PopupMessage from "../PopupMessage/PopupMessage.js";

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

const ProductEntry = () => {
  const [loading, setLoading] = useState(false);
  const [producttype, setProductType] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [emergency, setEmergency] = useState("");
  const [origin, setOrigin] = useState("");
  const [open, setOpen] = useState(false);
  const [isProductRegistered, setIsProductRegistered] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [formikErrors, setFormikErrors] = useState({});

  const [products, setProducts] = useState([]);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertText, setAlertText] = useState("");

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const removeProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const editProduct = async (index) => {
    const product = products[index];

    setProductType(product.producttype);
    setCategory(product.category);
    setSubCategory(product.subcategory);
    setOrigin(product.origin);
    setEmergency(product.emergencytype);

    formik.values.productImage = product.productImage;
    formik.values.upccode = product.upccode;
    formik.values.name = product.name;
    formik.values.manufacturer = product.manufacturer;
    formik.values.description = product.description;

    removeProduct(index);
  };

  useEffect(() => {
    if (isProductRegistered) {
      const timer = setTimeout(() => {
        window.location.reload(); // Reload the page after the desired delay
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
      { value: "Herbals", label: "Herbal Supplements" },
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
      { value: "Laparoscopy Instruments", label: "Laparoscopy Instruments" },

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
      { value: "Laparoscopy Equipment", label: "Laparoscopy Equipment" },
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
        for (const product of products) {
          const formData = new FormData();
          formData.append("hospitalid", localStorage.getItem("hospitalid"));
          formData.append("producttype", product.producttype);
          formData.append("category", product.category);
          formData.append("subcategory", product.subcategory);
          formData.append("upccode", product.upccode);
          formData.append("name", product.name);
          formData.append("manufacturer", product.manufacturer);
          formData.append("origin", product.origin);
          formData.append("emergencytype", product.emergencytype);
          formData.append("description", product.description);
          formData.append("productImage", product.productImage);

          await Axios.post(
            `${process.env.REACT_APP_BASE_URL}postproducts`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );
        }

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
  const checkUPCExists = async (upccode, hospitalid) => {
    console.log("upccode is " + upccode);
    console.log("hospitalid is " + hospitalid);
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BASE_URL}checkupc/${hospitalid}/${upccode}`,
      );

      return data.exists; // Assuming your backend returns { exists: true/false }
    } catch (error) {
      console.error("Error checking UPC code:", error);
      return false;
    }
  };
  const handleAddProduct = async () => {
    await formik.validateForm();
    formik.setTouched({
      producttype: true,
      category: true,
      subcategory: true,
      upccode: true,
      name: true,
      manufacturer: true,
      origin: true,
      emergencytype: true,
      description: true,
      productImage: true,
    });

    console.log(
      "Detialis are" +
        producttype +
        category +
        subcategory +
        origin +
        emergency +
        formik.values.upccode +
        formik.values.name +
        formik.values.manufacturer +
        formik.values.description,
    );

    if (
      !producttype ||
      !category ||
      !subcategory ||
      !origin ||
      !emergency ||
      !formik.values.productImage ||
      !formik.values.upccode ||
      !formik.values.name ||
      !formik.values.manufacturer ||
      !formik.values.description
      // !formik.isValid ||
      // !formik.dirty
    ) {
      if (!formik.values.productImage) {
        formik.setFieldError("productImage", "Please add a product image");
      }
      return;
    }
    const upcExists = await checkUPCExists(
      formik.values.upccode,
      localStorage.getItem("hospitalid"),
    );
    console.log("upc" + upcExists);

    if (upcExists) {
      formik.setErrors({
        upccode: "Product with this UPC code already exists",
      });
      return;
    }

    const existingProduct = products.find(
      (p) =>
        // p.producttype === producttype &&
        // p.category === category &&
        // p.subcategory === subcategory &&
        // p.upccode === formik.values.upccode &&
        // p.name === formik.values.name &&
        // p.manufacturer === formik.values.manufacturer &&
        // p.origin === origin &&
        // p.emergencytype === emergency,
        p.upccode === formik.values.upccode,
    );

    if (existingProduct) {
      setShowAlertDialog(true);
      setAlertText("Product already exists in the list.");
      // alert("Product already exists in the list.");
      return;
    }
    const product = {
      producttype,
      category,
      subcategory,
      upccode: formik.values.upccode,
      name: formik.values.name,
      manufacturer: formik.values.manufacturer,
      origin,
      emergencytype: emergency,
      description: formik.values.description,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),

      productImage: formik.values.productImage,
    };

    addProduct(product);
    formik.resetForm();
    setProductType("");
    setCategory("");
    setSubCategory("");
    setOrigin("");
    setEmergency("");
    setProductImage(null);
    formik.values.upccode = "";
    formik.values.name = "";
    formik.values.manufacturer = "";
    formik.values.description = "";
    formik.values.productImage = "";
  };

  const handleSubmitAllProducts = async () => {
    setLoading(true);
    try {
      for (const product of products) {
        const formData = new FormData();
        formData.append("hospitalid", localStorage.getItem("hospitalid"));
        formData.append("producttype", product.producttype);
        formData.append("category", product.category);
        formData.append("subcategory", product.subcategory);
        formData.append("upccode", product.upccode);
        formData.append("name", product.name);
        formData.append("manufacturer", product.manufacturer);
        formData.append("origin", product.origin);
        formData.append("emergencytype", product.emergencytype);
        formData.append("description", product.description);
        formData.append(
          "date",
          new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
        );
        formData.append("productImage", product.productImage);

        await Axios.post(
          `${process.env.REACT_APP_BASE_URL}postproducts`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }

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
        <PopupMessage message="Product is Registered Successfully" />
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
                          Product Type*
                        </InputLabel>
                        <Select
                          sx={{ backgroundColor: "#FFFF", height: "50%" }}
                          labelId="product-type-label"
                          id="product-type"
                          value={producttype}
                          label="Product Type"
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
                            Select Your Product Type
                          </small>
                        ) : null}
                      </div>
                      <div className="row mt-3 w-100">
                        <InputLabel id="category-label">Category*</InputLabel>
                        <Select
                          sx={{ backgroundColor: "#FFFF", height: "50%" }}
                          labelId="category-label"
                          id="category"
                          value={category}
                          label="Category"
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
                            Please Select Product Category
                          </small>
                        ) : null}
                      </div>
                      <div className="row mt-3 w-100">
                        <InputLabel id="subcategory-label">
                          Sub Category*
                        </InputLabel>
                        <Select
                          sx={{ backgroundColor: "#FFFF", height: "50%" }}
                          labelId="subcategory-label"
                          id="subcategory"
                          value={subcategory}
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
                        <input
                          id="upccode"
                          name="upc code"
                          className="form-control"
                          value={formik.values.upccode}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formikErrors.upccode && (
                          <small className="text-danger mt-1">
                            {formikErrors.upccode}
                          </small>
                        )}
                        {formik.errors.upccode && formik.touched.upccode && (
                          <small className="text-danger mt-1">
                            {formik.errors.upccode}
                          </small>
                        )}
                      </div>
                      <div className="row mt-3 w-100">
                        <label htmlFor="name" className="form-label">
                          Product Name*
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
                      <div className="row mt-3 w-100">
                        <label htmlFor="manufacturer" className="form-label">
                          Manufacturer*
                        </label>
                        <input
                          id="manufacturer"
                          name="manufacturer"
                          className="form-control"
                          value={formik.values.manufacturer}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.manufacturer &&
                        formik.touched.manufacturer ? (
                          <small className="text-danger mt-1">
                            {formik.errors.manufacturer}
                          </small>
                        ) : null}
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
                            overflow: "hidden", // Ensure the image does not exceed the container bounds
                          }}
                        >
                          {!formik.values.productImage && (
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
                              style={{
                                width: "100%", // Ensures the uploaded image fills the container
                                height: "100%",
                                objectFit: "cover", // Ensures the image covers the container without distortion
                              }}
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
                          variant="contained"
                          style={{
                            marginLeft: "20px",
                            backgroundColor: "#2E718A",
                            color: "white",
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#c45516";
                            e.target.style.color = "white";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#2E718A";
                            e.target.style.color = "white";
                          }}
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
                        <h4
                          style={{
                            marginTop: "20px",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            backgroundColor: "#fff",
                            fontSize: "16px",
                            lineHeight: "1.5",
                            textAlign: "center",
                            width: "80%",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          Standard Dimensions: 1:1, 1080x1080 pixels. <br />
                          File type: JPG, JPEG, PNG <br />
                          Maximum Size: 1 MB
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="row">
                      <div className="row w-120">
                        <label htmlFor="description" className="form-label">
                          Product Description*
                        </label>
                        <textarea
                          className="form-control"
                          id="description"
                          rows="3"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        ></textarea>
                        {formik.errors.description &&
                        formik.touched.description ? (
                          <small className="text-danger mt-1">
                            {formik.errors.description}
                          </small>
                        ) : null}
                      </div>
                      <br />
                      <div className="col text-center actionButtons">
                        <Button
                          variant="secondary"
                          size="lg"
                          onClick={formik.resetForm}
                        >
                          Clear
                        </Button>
                        <Button
                          variant="primary"
                          size="lg"
                          type="button"
                          onClick={handleAddProduct}
                          className="ml-2"
                        >
                          Add Product
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col text-center">
                      <h3>Products List</h3>
                    </div>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product Type</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>UPC</th>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Origin</th>
                        <th>Emergency Type</th>
                        <th>Actions</th>
                        {/* <th>Print</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={index}>
                          <td>{product.producttype}</td>
                          <td>{product.category}</td>
                          <td>{product.subcategory}</td>
                          <td>{product.upccode}</td>
                          <td>{product.name}</td>
                          <td>{product.manufacturer}</td>
                          <td>{product.origin}</td>
                          <td>{product.emergencytype}</td>
                          <td>
                            <IconButton
                              style={{
                                backgroundColor: "white",
                                color: "green",
                                transition: "background-color 0.3s, color 0.3s",
                              }}
                              onClick={() => editProduct(index)}
                            >
                              <EditIcon />
                            </IconButton>

                            <IconButton
                              style={{
                                backgroundColor: "white",
                                color: "red",
                                transition: "background-color 0.3s, color 0.3s",
                              }}
                              onClick={() => removeProduct(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </td>
                          {/* <td>

                            <IconButton
                              style={{
                                backgroundColor: "white",
                                transition: "background-color 0.3s, color 0.3s",
                              }}

                            // onClick={() => removeProduct(index)}
                            >
                              <PrintIcon />
                            </IconButton>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="col text-center actionButtons">
                    <Button
                      variant="primary"
                      size="lg"
                      type="button"
                      onClick={handleSubmitAllProducts}
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

export default ProductEntry;
