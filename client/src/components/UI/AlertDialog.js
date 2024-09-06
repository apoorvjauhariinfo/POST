import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function AlertDialog({ onClose, open, text }) {
  return (
    <Dialog onClose={onClose} open={open} fullWidth={true} maxWidth="sm">
      <DialogTitle>Alert</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1c647c",
            "&:hover": {
              backgroundColor: "green",
            },
          }}
          onClick={onClose}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
