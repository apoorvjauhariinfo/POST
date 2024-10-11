import Box from "@mui/material/Box";
import Header from "../Dashboard/Components/header.js";
import NewSidebar from "../Dashboard/new_sidebar";
import { useState, useEffect } from "react";
import RequestStatus from "./RequestStatus.js";
import ImRequestStatusScreen from "../../pages/ImRequestStatus/ImRequestStatusScreen.js";

function RequestStatusScreen() {
  const isIm = localStorage.getItem("inventorymanagerid") !== null;

  return (
    <Box
      sx={{
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      {isIm ? <ImRequestStatusScreen /> : <RequestStatus />}
    </Box>
  );
}

export default RequestStatusScreen;
