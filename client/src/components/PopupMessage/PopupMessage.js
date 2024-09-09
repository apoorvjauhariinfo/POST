import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "react-bootstrap";

const PopupMessage = ({ message, duration = 500000 ,visibility}) => {
  const [isVisible, setIsVisible] = useState(false || visibility);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  const handleDialogClose = () => {
    visibility=false;
    setIsVisible(false);
  };
// console.log("fhf")
  return (
    <Dialog open={isVisible} onClose={handleDialogClose}>
      {/* <DialogTitle>Registration Successful</DialogTitle> */}
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDialogClose}
          style={{
            backgroundColor: "#2E718A",
            color: "white",
            border: "none",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupMessage;
