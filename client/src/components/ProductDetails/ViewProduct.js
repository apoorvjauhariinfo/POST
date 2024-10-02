import { useState, React } from "react";
import { Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import "./ProductEntry.css";

import LoaderOverlay from "../Loader/LoaderOverlay.js";

import AlertDialog from "../UI/AlertDialog";
import { useParams } from "react-router-dom";
import useGetProductViewData from "../../pages/viewProductDetails/hooks.viewProduct.js";

export default function ViewProduct() {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertText, setAlertText] = useState("");
  const { id: productId } = useParams();

  const {
    resData,
    fetchingState,
    stockData: stockDetails,
    issueData: issueDetails,
  } = useGetProductViewData(productId);

  if (fetchingState === "loading") return <LoaderOverlay loading={true} />;

  if (fetchingState === "error")
    return (
      <div style={{ display: "grid", placeItems: "center", height: "90vh" }}>
        <p style={{ fontSize: "2rem" }}>Something went wrong</p>
      </div>
    );

  if (fetchingState === "success")
    return (
      <div>
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
                        <p>{resData.producttype}</p>
                      </div>
                      <div className="row mt-3 w-100">
                        <label className="form-label">Category:</label>
                        <p>{resData.category}</p>
                      </div>
                      <div className="row mt-3 w-100">
                        <label className="form-label">Sub Category:</label>
                        <p>{resData.subcategory}</p>
                      </div>
                      <div className="row mt-3 w-100">
                        <label className="form-label">Product UPC:</label>
                        <p>{resData.upccode}</p>
                      </div>
                      <div className="row mt-3 w-100">
                        <label className="form-label">Product Name:</label>
                        <p>{resData.name}</p>
                      </div>
                      <div className="row mt-3 w-100">
                        <label className="form-label">Manufacturer:</label>
                        <p>{resData.manufacturer}</p>
                      </div>
                      <div className="row mt-3 w-100">
                        <label className="form-label">Product Origin:</label>
                        <p>{resData.origin}</p>
                      </div>
                      <div className="row mt-4 w-100">
                        <label className="form-label">Emergency Type:</label>
                        <p>{resData.emergencytype}</p>
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
                          <img
                            src={resData.productImage}
                            alt="product-preview"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                        </Box>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="row">
                      <div className="row w-120">
                        <label className="form-label">
                          Product Description:
                        </label>
                        <p>{resData.description}</p>
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
                      {/* <div className="col text-center actionButtons"> */}
                      {/*   <Button */}
                      {/*     variant="secondary" */}
                      {/*     size="lg" */}
                      {/*     // onClick={navigateToVerify} */}
                      {/*   > */}
                      {/*     Back */}
                      {/*   </Button> */}
                      {/*   <Button */}
                      {/*     variant="secondary" */}
                      {/*     size="lg" */}
                      {/*     // onClick={navigateToProceed} */}
                      {/*   > */}
                      {/*     Delete */}
                      {/*   </Button> */}
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}
