import { useState, React } from "react";
import { Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import "./ProductEntry.css";

import LoaderOverlay from "../Loader/LoaderOverlay.js";

import AlertDialog from "../UI/AlertDialog";
import { useParams } from "react-router-dom";

export default function ViewProduct() {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertText, setAlertText] = useState("");
  const { id: productId } = useParams();
  console.log(productId);

  return (
    <div>
      {/* <LoaderOverlay loading={loading} /> */}
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
                      <p>initialproducttype</p>
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Category:</label>
                      <p>initialcategory</p>
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Sub Category:</label>
                      <p>initialsubcategory</p>
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Product UPC:</label>
                      <p>initialupccode</p>
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Product Name:</label>
                      <p>initialname</p>
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Manufacturer:</label>
                      <p>initialmanufacturer</p>
                    </div>
                    <div className="row mt-3 w-100">
                      <label className="form-label">Product Origin:</label>
                      <p>initialorigin</p>
                    </div>
                    <div className="row mt-4 w-100">
                      <label className="form-label">Emergency Type:</label>
                      <p>initialemergencytype</p>
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
                        {/* {initialproductimage && ( */}
                        {/*   <img */}
                        {/*     src={initialproductimage} */}
                        {/*     alt="product-preview" */}
                        {/*     style={{ maxWidth: "100%", maxHeight: "100%" }} */}
                        {/*   /> */}
                        {/* )} */}
                      </Box>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="row">
                    <div className="row w-120">
                      <label className="form-label">Product Description:</label>
                      <p>initialdescription</p>
                    </div>
                    <br />
                    <div className="row">
                      <label className="form-label">Stock Details:</label>
                      <div className="stock-details">
                        {/* {stockDetails.length > 0 ? ( */}
                        {/*   stockDetails.map((stock, index) => ( */}
                        {/*     <div key={index} className="stock-item"> */}
                        {/*       <p>Unit Cost: {stock.unitcost}</p> */}
                        {/*       <p>Total Quantity: {stock.totalquantity}</p> */}
                        {/*       <p>Buffer Value: {stock.buffervalue}</p> */}
                        {/*     </div> */}
                        {/*   )) */}
                        {/* ) : ( */}
                        {/*   <p>No Stocks Associated with this product</p> */}
                        {/* )} */}
                      </div>
                    </div>
                    <div className="row">
                      <label className="form-label">Issue Details:</label>
                      {/* <div className="issue-details"> */}
                      {/*   {issueDetails.length > 0 ? ( */}
                      {/*     issueDetails.map((issue, index) => ( */}
                      {/*       <div key={index} className="issue-item"> */}
                      {/*         <p>Quantity Issued: {issue.quantityissued}</p> */}
                      {/*       </div> */}
                      {/*     )) */}
                      {/*   ) : ( */}
                      {/*     <p>No Issues Associated with this product</p> */}
                      {/*   )} */}
                      {/* </div> */}
                    </div>
                    <div className="col text-center actionButtons">
                      <Button
                        variant="secondary"
                        size="lg"
                        // onClick={navigateToVerify}
                      >
                        Back
                      </Button>
                      <Button
                        variant="secondary"
                        size="lg"
                        // onClick={navigateToProceed}
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
    </div>
  );
}
