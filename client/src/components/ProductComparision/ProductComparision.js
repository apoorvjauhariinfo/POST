import Axios from "axios";
import { useState, useEffect, React } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import "./ProductEntry.css";

import LoaderOverlay from "../Loader/LoaderOverlay.js";
import PopupMessage from "../PopupMessage/PopupMessage.js";

import AlertDialog from "../UI/AlertDialog";

const ProductComparision = () => {
  const location = useLocation();
  const { state } = location;
  const { id, requestid, requesttype } = state || {};
  const [loading, setLoading] = useState(false);

  const [initialname, setInitialName] = useState();
  const [initialproducttype, setInitialProductType] = useState();
  const [initialcategory, setInitialCategory] = useState();
  const [initialsubcategory, setInitialSubcategory] = useState();
  const [initialupccode, setInitialUpcCode] = useState();
  const [initialmanufacturer, setInitialManufacturer] = useState();
  const [initialorigin, setInitialOrigin] = useState();
  const [initialdescription, setInitialDescription] = useState();
  const [initialemergencytype, setInitialEmergencyType] = useState();
  const [initialproductimage, setInitialProductImage] = useState();

  const [updatedname, setUpdatedName] = useState();
  const [updatedproducttype, setUpdatedProducttype] = useState();
  const [updatedcategory, setUpdatedCategory] = useState();
  const [updatedsubcategory, setUpdatedSubCategory] = useState();
  const [updatedupccode, setUpdatedUpcCode] = useState();
  const [updatedmanufacturer, setUpdatedManufacturer] = useState();
  const [updateorigin, setUpdateOrigin] = useState();
  const [updateddescription, setUpdatedDescription] = useState();
  const [updatedemergency, setUpdatedEmergency] = useState();

  const [issueDetails, setIssueDetails] = useState([]);
  const [stockDetails, setStockDetails] = useState([]);
  const [stockid, setStockId] = useState();
  const [issueid, setIssueId] = useState([]);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertText, setAlertText] = useState("");

  function stringToDemand(requesttype) {
    const values = requesttype.split(", ");

    return {
      _id: values[0],
      hospitalid: values[1],
      producttype: values[2],
      category: values[3],
      subcategory: values[4],
      upccode: values[5],
      name: values[6],
      manufacturer: values[7],
      origin: values[8],
      emergencytype: values[9],
      description: values[10],
    };
  }

  const demandObject = stringToDemand(requesttype);
  console.log("demandobject is " + demandObject.name);

  const bufferToBase64 = (buf) => {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buf));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  // const deletestock = async (stockid) => {
  //   console.log("stockidis:" + stockid)

  //   if(stockid!=null){
  //   const stockresponse = await Axios.delete(
  //     `${process.env.REACT_APP_BASE_URL}deletestock/${stockid.toString()}`
  //   );

  //   console.log(stockresponse);
  // }
  // else{
  //   console.log("No Stock Found")
  // }

  // };
  // const deleteissue = async (issueid) => {
  //   console.log("issuedidis" + issueid);
  //   if(issueid!=null){
  //   const issuedresponse = await Axios.delete(
  //     `${process.env.REACT_APP_BASE_URL}deleteissued/${issueid.toString()}`
  //   );

  //   console.log(issuedresponse);
  // }
  // else{
  //   console.log("No Issued Found");
  // }

  // };

  const updaterequest = async (requestid) => {
    console.log("requestid" + requestid);
    if (requestid != null) {
      const response = await Axios.put(
        `${process.env.REACT_APP_BASE_URL}updaterequests/` +
          requestid.toString(),
        {
          _id: requestid.toString(),
          status: "accepted",
        },
      );

      console.log(response);
    } else {
      console.log("No Issued Found");
    }
  };

  console.log("demand is" + requesttype);
  const getprod = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}productbyid/${id}`;
      const { data } = await Axios.get(url);
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

      // // Fetch stock details after product details are fetched
      // const stockUrl = `${process.env.REACT_APP_BASE_URL}stockbyproductid/${id}`;
      // const stockResponse = await Axios.get(stockUrl);
      // setStockDetails(stockResponse.data.stockDetails);
      // setStockId(stockResponse.data.stockDetails[0]._id);

      // // Fetch issue details after product details are fetched
      // const issueUrl = `${process.env.REACT_APP_BASE_URL}issuebyproductid/${id}`;
      // const issueResponse = await Axios.get(issueUrl);
      // setIssueDetails(issueResponse.data.issueDetails);
      // setIssueId(issueResponse.data.issueDetails[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getprod();
  }, []);

  //To compare the value of requesttype details and original product details.
  const compareprod = () => {
    console.log("initialname is" + initialname);
    console.log("updatedname is" + demandObject.name);
    if (initialname != demandObject.name) {
    }
  };
  compareprod();

  const navigate = useNavigate();
  const navigateToVerify = () => {
    navigate("/requeststatus");
  };
  const navigateToRequestStatus = () => {
    navigate("/requeststatus");
  };

  const navigateToProceed = async () => {
    alert("Are you sure you want to proceed?");
    console.log("stockid:" + stockid);
    console.log("issueid:" + issueid);
    console.log("requestid:" + requestid);
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_BASE_URL}updateexistingproduct/` +
          id.toString(),
        {
          _id: id.toString(),
          hospitalid: localStorage.getItem("hospitalid"),
          producttype: demandObject.producttype,
          category: demandObject.category,
          subcategory: demandObject.subcategory,
          upccode: demandObject.upccode,
          name: demandObject.name,
          manufacturer: demandObject.manufacturer,
          origin: demandObject.origin,
          emergencytype: demandObject.emergencytype,
          description: demandObject.description,
          // productImage : formik.values.productImage || initialproductimage,
        },
      );
      let userData = (await response).data;
      console.log(userData);
      if (requestid != null && requestid != "") updaterequest(requestid);
      setShowAlertDialog(true);
      setAlertText("Product is updated successfully");
      // alert("Product is updated successfully")
      setLoading(false);
      navigateToRequestStatus();
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
      <AlertDialog
        open={showAlertDialog}
        onClose={() => setShowAlertDialog(false)}
        text={alertText}
      />
      <section
        className="p-5 w-100"
        style={{ backgroundColor: "#eeeee", borderRadius: "0 0 0 0" }}
      >
        <div className="row">
          <div className="col">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-3">
                <div className="row">
                  <div className="col">
                    <p className="text-left h2 mb-3 mt-4">
                      Product Information:
                    </p>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Product Type:</label>
                      {initialproducttype !== demandObject.producttype ? (
                        <div className="product-name-box">
                          <p>
                            Changed from{" "}
                            <span style={{ color: "#c45516", fontSize: 15 }}>
                              {initialproducttype}
                            </span>{" "}
                            to{" "}
                            <span style={{ color: "#2E718A", fontSize: 15 }}>
                              {demandObject.producttype}
                            </span>
                          </p>
                        </div>
                      ) : (
                        <p>{initialproducttype}</p>
                      )}
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Category:</label>
                      {initialcategory !== demandObject.category ? (
                        <div className="product-name-box">
                          <p>
                            Changed from{" "}
                            <span style={{ color: "#c45516", fontSize: 15 }}>
                              {initialcategory}
                            </span>{" "}
                            to{" "}
                            <span style={{ color: "#2E718A", fontSize: 15 }}>
                              {demandObject.category}
                            </span>
                          </p>
                        </div>
                      ) : (
                        <p>{initialcategory}</p>
                      )}
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Sub Category:</label>

                      {initialsubcategory !== demandObject.subcategory ? (
                        <div className="product-name-box">
                          <p>
                            Changed from{" "}
                            <span style={{ color: "#c45516", fontSize: 15 }}>
                              {initialsubcategory}
                            </span>{" "}
                            to{" "}
                            <span style={{ color: "#2E718A", fontSize: 15 }}>
                              {demandObject.subcategory}
                            </span>
                          </p>
                        </div>
                      ) : (
                        <p>{initialsubcategory}</p>
                      )}
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Product UPC:</label>
                      {initialupccode !== demandObject.upccode ? (
                        <div className="product-name-box">
                          <p>
                            Changed from{" "}
                            <span style={{ color: "#c45516", fontSize: 15 }}>
                              {initialupccode}
                            </span>{" "}
                            to{" "}
                            <span style={{ color: "#2E718A", fontSize: 15 }}>
                              {demandObject.upccode}
                            </span>
                          </p>
                        </div>
                      ) : (
                        <p>{initialupccode}</p>
                      )}
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Product Name:</label>

                      {initialname !== demandObject.name ? (
                        <div className="product-name-box">
                          <p>
                            Changed from{" "}
                            <span style={{ color: "#c45516", fontSize: 15 }}>
                              {initialname}
                            </span>{" "}
                            to{" "}
                            <span style={{ color: "#2E718A", fontSize: 15 }}>
                              {demandObject.name}
                            </span>
                          </p>
                        </div>
                      ) : (
                        <p>{initialname}</p>
                      )}
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Manufacturer:</label>

                      {initialmanufacturer !== demandObject.manufacturer ? (
                        <div className="product-name-box">
                          <p>
                            Changed from{" "}
                            <span style={{ color: "#c45516", fontSize: 15 }}>
                              {initialmanufacturer}
                            </span>{" "}
                            to{" "}
                            <span style={{ color: "#2E718A", fontSize: 15 }}>
                              {demandObject.manufacturer}
                            </span>
                          </p>
                        </div>
                      ) : (
                        <p>{initialmanufacturer}</p>
                      )}
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Origin:</label>

                      {initialorigin !== demandObject.origin ? (
                        <div className="product-name-box">
                          <p>
                            Changed from{" "}
                            <span style={{ color: "#c45516", fontSize: 15 }}>
                              {initialorigin}
                            </span>{" "}
                            to{" "}
                            <span style={{ color: "#2E718A", fontSize: 15 }}>
                              {demandObject.origin}
                            </span>
                          </p>
                        </div>
                      ) : (
                        <p>{initialorigin}</p>
                      )}
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Emergency Type:</label>

                      {initialemergencytype !== demandObject.emergencytype ? (
                        <div className="product-name-box">
                          <p>
                            Changed from{" "}
                            <span style={{ color: "#c45516", fontSize: 15 }}>
                              {initialemergencytype}
                            </span>{" "}
                            to{" "}
                            <span style={{ color: "#2E718A", fontSize: 15 }}>
                              {demandObject.emergencytype}
                            </span>
                          </p>
                        </div>
                      ) : (
                        <p>{initialemergencytype}</p>
                      )}
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
                        {initialproductimage && (
                          <img
                            src={initialproductimage}
                            alt="product-preview"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                        )}
                      </Box>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="row">
                    <div className="row v-120">
                      <label className="form-label">Product Description:</label>

                      {initialdescription !== demandObject.description ? (
                        <div className="product-name-box">
                          <p>
                            Changed from{" "}
                            <span style={{ color: "#c45516", fontSize: 15 }}>
                              {initialdescription}
                            </span>{" "}
                            to{" "}
                            <span style={{ color: "#2E718A", fontSize: 15 }}>
                              {demandObject.description}
                            </span>
                          </p>
                        </div>
                      ) : (
                        <p>{initialdescription}</p>
                      )}
                    </div>
                    <br />
                    {/* <div className="row">
                      <label className="form-label">Stock Details:</label>
                      <div className="stock-details">
                        {stockDetails.length > 0 ? (
                          stockDetails.map((stock, index) => (
                            <div key={index} className="stock-item">
                              <p>Unit Cost: {stock.unitcost}</p>
                              <p>Total Quantity: {stock.totalquantity}</p>
                              <p>Buffer Value: {stock.buffervalue}</p>
                            </div>
                          ))
                        ) : (
                          <p>No Stocks Associated with this product</p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <label className="form-label">Issue Details:</label>
                      <div className="issue-details">
                        {issueDetails.length > 0 ? (
                          issueDetails.map((issue, index) => (
                            <div key={index} className="issue-item">
                              <p>Quantity Issued: {issue.quantityissued}</p>
                            </div>
                          ))
                        ) : (
                          <p>No Issues Associated with this product</p>
                        )}
                      </div>
                    </div> */}
                    <div className="col text-center actionButtons">
                      <Button
                        variant="secondary"
                        size="lg"
                        onClick={navigateToVerify}
                      >
                        Back
                      </Button>
                      <Button
                        variant="secondary"
                        size="lg"
                        onClick={navigateToProceed}
                      >
                        Edit
                      </Button>
                    </div>
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

export default ProductComparision;
