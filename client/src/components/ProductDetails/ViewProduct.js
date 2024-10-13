import { useState, React } from "react";
import Box from "@mui/material/Box";
import "./ProductEntry.css";

import LoaderOverlay from "../Loader/LoaderOverlay.js";

import AlertDialog from "../UI/AlertDialog";
import { useParams } from "react-router-dom";
import useGetProductViewData from "../../pages/viewProductDetails/hooks.viewProduct.js";

export default function ViewProduct({ page }) {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertText, setAlertText] = useState("");
  const { id: productId } = useParams();

  const {
    resData,
    fetchingState,
    stockData: stockDetails,
    issueData: issueDetails,
  } = useGetProductViewData(productId);

  let totalQuantity = 0;

  if (
    (page === "avail" || page === "buffer") &&
    stockDetails &&
    stockDetails.length > 0
  ) {
    stockDetails.forEach((stock) => {
      totalQuantity = +stock.totalquantity;
    });
  }

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
                      {page === "avail" && (
                        <div className="row w-120">
                          <label className="form-label">Total Quantity:</label>
                          <p>{totalQuantity}</p>
                        </div>
                      )}
                      {page === "buffer" && (
                        <div className="row w-120">
                          <label className="form-label">Total Quantity:</label>
                          <p>{totalQuantity}</p>
                        </div>
                      )}
                      {page === "stockentry" && (
                        <div className="row" style={{ marginTop: "20px" }}>
                          <label className="form-label">Stock Details:</label>
                          <div className="stock-details">
                            {stockDetails.length > 0 ? (
                              stockDetails.map((stock, index) => (
                                <div
                                  key={index}
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr 1fr",
                                    gap: "10px 10px",
                                    marginBottom: "20px",
                                    padding: "10px",
                                  }}
                                >
                                  <article>
                                    <span className="form-label">
                                      Unit Cost:{" "}
                                    </span>
                                    <span> {stock.unitcost}</span>
                                  </article>
                                  <article>
                                    <span className="form-label">
                                      Total Quantity:{" "}
                                    </span>
                                    <span>{stock.totalquantity}</span>
                                  </article>
                                  <article>
                                    <span className="form-label">
                                      Buffer Value:{" "}
                                    </span>
                                    <span>{stock.buffervalue}</span>
                                  </article>
                                  <article>
                                    <span className="form-label">Date: </span>
                                    <span>
                                      {new Date(
                                        stock.dateAdded,
                                      ).toLocaleDateString("en-IN")}
                                    </span>
                                  </article>
                                  <article>
                                    <span className="form-label">Vendor: </span>
                                    <span>{stock.vendorName}</span>
                                  </article>
                                  <article>
                                    <span className="form-label">
                                      Vendor Phone:{" "}
                                    </span>
                                    <span>{stock.vendorPhone}</span>
                                  </article>
                                  <article>
                                    <span className="form-label">
                                      Batch No:{" "}
                                    </span>
                                    <span>{stock.batchno}</span>
                                  </article>
                                  <article>
                                    <span className="form-label">GST: </span>
                                    <span>{stock.gst}</span>
                                  </article>
                                  <article>
                                    <span className="form-label">
                                      Date of Manufacturing:{" "}
                                    </span>
                                    <span>{stock.dom}</span>
                                  </article>
                                  <article>
                                    <span className="form-label">
                                      Date of Expiration:{" "}
                                    </span>
                                    <span>{stock.doe}</span>
                                  </article>
                                </div>
                              ))
                            ) : (
                              <p>No Stocks Associated with this product</p>
                            )}
                          </div>
                        </div>
                      )}
                      {page === "stockissue" && (
                        <div className="row" style={{ marginTop: "20px" }}>
                          <label className="form-label">Issue Details:</label>
                          <div className="issue-details">
                            {issueDetails.length > 0 ? (
                              issueDetails.map((issue, index) => (
                                <div
                                  key={index}
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr 1fr",
                                    gap: "10px 10px",
                                    marginBottom: "20px",
                                    padding: "10px",
                                  }}
                                >
                                  <article>
                                    <span className="form-label">
                                      Quantity Issued:{" "}
                                    </span>
                                    <span>{issue.quantityissued}</span>
                                  </article>
                                  <article>
                                    <span className="form-label">
                                      Issued to:{" "}
                                    </span>
                                    <span>
                                      {issue.firstname + " " + issue.lastname}
                                    </span>
                                  </article>
                                  <article>
                                    <span className="form-label">Scope: </span>
                                    <span>{issue.department}</span>
                                  </article>
                                  <article>
                                    <span className="form-label">
                                      Department:{" "}
                                    </span>
                                    <span>{issue.subdepartment}</span>
                                  </article>
                                  <article>
                                    <span className="form-label">Date: </span>
                                    <span>
                                      {new Date(
                                        issue.dateAdded,
                                      ).toLocaleDateString("en-IN")}
                                    </span>
                                  </article>
                                </div>
                              ))
                            ) : (
                              <p>No Issues Associated with this product</p>
                            )}
                          </div>
                        </div>
                      )}
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
