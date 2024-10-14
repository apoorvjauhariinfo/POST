import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, useNavigate } from "react-router-dom";
import "./forgotPassword.css";

const AdminForgotPassword= () => {
  const [email, setEmail] = useState(""); // Email state
  const [check, setCheck] = useState(false); // Checkbox state
  const [open, setOpen] = useState(false); // Success dialog
  const [errorOpen, setErrorOpen] = useState(false); // Error dialog
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const [loginNavigate,setLoginNavigate] = useState(false);
  // Close dialogs
  const handleClose = () => {setOpen(false);setLoginNavigate(true)};
  const handleErrorClose = () => setErrorOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setErrorMessage(""); // Clear any previous errors
    
    // Validate email before making the request
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setErrorMessage("Invalid email address");
      setErrorOpen(true);
      setLoading(false);
      return;
    }

    const url = `${process.env.REACT_APP_BASE_URL}reset-password/admin`
      // console.log(url)
    try {
      const response = await axios.post(
        url,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      

      if (response.status === 200) {
        
        setOpen(true); // Open success dialog
        // setTimeout(60)
        
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setErrorMessage("User not found");
      } else {
        setErrorMessage(
          "There was an issue sending the reset link. Please try again."
        );
      }
      setErrorOpen(true); // Open error dialog
    } finally {
      setLoading(false);
    }
  };
  if(loginNavigate){
    navigate('/adminlogin')}
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2 className="text-center mb-5">Forgot Password?</h2>
        <form >
          <div className="row">
            <div className="col">
              <label htmlFor="email" className="form-label">
                Enter Your Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

         

          <Link to="/adminlogin" style={{ color: "#1E90FF", textDecoration: "none" }}>
            Login?
          </Link>

          <div className="row mt-4">
            <div className="col text-center">
              <Button
                variant="primary"
                type="submit"
                className="btn-lg1234"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Sending..." : "Continue"}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Success"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A reset password link has been sent to your email.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ backgroundColor: "#2E718A", color: "white" }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={errorOpen} onClose={handleErrorClose}>
        <DialogTitle>{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorClose} style={{ backgroundColor: "#2E718A", color: "white" }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminForgotPassword;
