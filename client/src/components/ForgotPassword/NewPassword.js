import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [passwordError, setPasswordError] = useState(""); // New state for password error
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

  const handleClose = () => {
    setOpen(false);
    if (role === "admin") navigate("/adminlogin");
    else navigate("/login");
  };

  const handleErrorClose = () => setErrorOpen(false);

  // Password validation function
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!minLength) return "Password must be at least 8 characters long.";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter.";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter.";
    if (!hasDigit) return "Password must contain at least one digit.";
    if (!hasSpecialChar) return "Password must contain at least one special character.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Validate password
    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      setLoading(false);
      return;
    }

    // Clear password error if valid
    setPasswordError("");

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

      const response = await axios.post(url, { token, newPassword: password });

      if (response.status === 200) {
        setOpen(true);
      }
    } catch (err) {
      setErrorMessage("There was an issue resetting the password. Please try again.");
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
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
                {passwordError && (
                  <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>
                    {passwordError}
                  </div>
                )}
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
          <DialogContentText>Your password has been successfully reset.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ backgroundColor: "#2E718A", color: "white" }}>
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
          <Button onClick={handleErrorClose} style={{ backgroundColor: "#2E718A", color: "white" }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NewPassword;
