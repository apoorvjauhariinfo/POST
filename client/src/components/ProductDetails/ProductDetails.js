import Axios from "axios";
import { useState, useEffect, React } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import "./ProductEntry.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import LoaderOverlay from "../Loader/LoaderOverlay.js";
import PopupMessage from "../PopupMessage/PopupMessage.js";

import AlertDialog from "../UI/AlertDialog";

const ProductDetails = () => {
  const location = useLocation();
  const { state } = location;
  const { id, requestid } = state || {};
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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
  const [issueDetails, setIssueDetails] = useState([]);
  const [stockDetails, setStockDetails] = useState([]);

  const [stockid, setStockId] = useState();
  const [issueid, setIssueId] = useState([]);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertText, setAlertText] = useState("");

  const bufferToBase64 = (buf) => {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buf));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const deletestock = async (stockid) => {
    console.log("stockidis:" + stockid);

    if (stockid != null) {
      setLoading(true);
      const stockresponse = await Axios.delete(
        `${process.env.REACT_APP_BASE_URL}deletestock/${stockid.toString()}`,
      );
      setLoading(false);
      console.log(stockresponse);
    } else {
      console.log("No Stock Found");
    }
  };
  const deleteissue = async (issueid) => {
    console.log("issuedidis" + issueid);
    if (issueid != null) {
      const issuedresponse = await Axios.delete(
        `${process.env.REACT_APP_BASE_URL}deleteissued/${issueid.toString()}`,
      );

      console.log(issuedresponse);
    } else {
      console.log("No Issued Found");
    }
  };

  const updaterequest = async (requestid) => {
    console.log("requestid" + requestid);
    if (requestid != null) {
      setLoading(true);
      const response = await Axios.put(
        `${process.env.REACT_APP_BASE_URL}updaterequests/` +
          requestid.toString(),
        {
          _id: requestid.toString(),
          status: "accepted",
        },
      );
      setLoading(false);
      console.log(response);
    } else {
      console.log("No Issued Found");
    }
  };

  const getprod = async () => {
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_BASE_URL}productbyid/${id}`;
      const { data } = await Axios.get(url);
      const products = data.product;
      setLoading(false);
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

      // Fetch stock details after product details are fetched
      setLoading(true);
      const stockUrl = `${process.env.REACT_APP_BASE_URL}stockbyproductid/${id}`;
      const stockResponse = await Axios.get(stockUrl);
      setLoading(false);
      if (stockResponse.data.stockDetails) {
        setStockDetails(stockResponse.data.stockDetails);
        setStockId(stockResponse.data.stockDetails[0]._id);
      } else {
        setStockDetails([]);
        setStockId(null);
      }

      // Fetch issue details after product details are fetched
      setLoading(true);
      const issueUrl = `${process.env.REACT_APP_BASE_URL}issuebyproductid/${id}`;
      const issueResponse = await Axios.get(issueUrl);
      setLoading(false);
      if (issueResponse.data.issueDetails) {
        setIssueDetails(issueResponse.data.issueDetails);
        setIssueId(issueResponse.data.issueDetails[0]._id);
      } else {
        setIssueDetails([]);
        setIssueId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getprod();
  }, []);

  const navigate = useNavigate();
  const navigateToVerify = () => {
    navigate("/requeststatus");
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const navigateToProceed = () => {
    console.log("stockid:" + stockid);
    console.log("issueid:" + issueid);
    console.log("requestid:" + requestid);

    try {
      const deleteproduct = async () => {
        console.log("productidis" + id);
        if (id != null) {
          setLoading(true);
          const response = await Axios.delete(
            `${process.env.REACT_APP_BASE_URL}deleteproduct/${id.toString()}`,
          );
          setLoading(false);
          console.log(response);
        } else {
          console.log("No such product associated");
        }
      };
      console.log("stockid is" + stockid);
      console.log("issue id is" + issueid);

      if (stockid != null && stockid != "") {
        deletestock(stockid);
      }
      if (issueid != null && issueid != "") {
        deleteissue(issueid);
      }
      deleteproduct();
      handleCloseDialog();

      setShowAlertDialog(true);
      setAlertText("Your Product is deleted successfully");
      // alert("Your Product is deleted successfully");
      if (requestid != null && requestid != "") updaterequest(requestid);
      navigateToVerify();
    } catch (error) {
      handleCloseDialog();

      setShowAlertDialog(true);
      setAlertText("Error deleting product");
      // alert("Error deleting product");
      console.error("Error deleting product:", error);
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
        style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
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
                      <p>{initialproducttype}</p>
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Category:</label>
                      <p>{initialcategory}</p>
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Sub Category:</label>
                      <p>{initialsubcategory}</p>
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Product UPC:</label>
                      <p>{initialupccode}</p>
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Product Name:</label>
                      <p>{initialname}</p>
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Manufacturer:</label>
                      <p>{initialmanufacturer}</p>
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Product Origin:</label>
                      <p>{initialorigin}</p>
                    </div>
                    <div className="row mt-4 w-100">
                      <label className="form-label">Emergency Type:</label>
                      <p>{initialemergencytype}</p>
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
                    <div className="row w-120">
                      <label className="form-label">Product Description:</label>
                      <p>{initialdescription}</p>
                    </div>
                    <br />
                    <div className="row">
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
                    </div>
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
                        onClick={handleOpenDialog}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Product Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={navigateToProceed} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductDetails;
