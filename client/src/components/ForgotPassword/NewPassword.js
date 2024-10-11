import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap"; // Added Bootstrap's Grid System
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // Get location object

  // Function to get query parameters
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      token: params.get("token"),
      role: params.get("role"),
    };
  };

  // Extract token and role from query params
  const { token, role } = getQueryParams();
  console.log(role);

  const handleClose = () => {
    setOpen(false);
    if (role === "admin") navigate("/adminlogin");
    else navigate("/login");
  };
  
  const handleErrorClose = () => setErrorOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setErrorOpen(true);
      setLoading(false);
      return;
    }

    try {
      let url;
      if (role === "user") {
        url = `${process.env.REACT_APP_BASE_URL}reset-password/user/changepasswordbytoken`;
      } else if (role === "admin") {
        url = `${process.env.REACT_APP_BASE_URL}reset-password/admin/changepasswordbytoken`;
      } else {
        url = `${process.env.REACT_APP_BASE_URL}reset-password/inventory-manager/changepasswordbytoken`;
      }

      // Uncomment when ready to send the request
      //   const response = {stat};
      const response = await axios.post(url, { token, newPassword: password });
      console.log("Role:", url);

      if (response.status === 200) {
        setOpen(true);
      }
    } catch (err) {
      setErrorMessage(
        "There was an issue resetting the password. Please try again."
      );
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <div className="new-password-form shadow p-4 rounded">
            <h2 className="text-center mb-4">Reset Password</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </Button>
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </Button>
                </div>
              </Form.Group>

              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="btn-lg1234 w-100"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Success Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your password has been successfully reset.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ backgroundColor: "#2E718A", color: "white" }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={errorOpen} onClose={handleErrorClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleErrorClose}
            style={{ backgroundColor: "#2E718A", color: "white" }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NewPassword;
