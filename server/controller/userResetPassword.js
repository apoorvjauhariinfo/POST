const express = require("express");
const router = express.Router(); // Initialize the router
const jwt = require("jsonwebtoken"); // For generating tokens
const bcrypt = require("bcrypt"); // For hashing passwords
const nodemailer = require("nodemailer"); // For sending email
const User = require("../model/userschema.js");
const fs = require("fs");
const path = require("path");
const InventoryManager = require("../model/inventorymanager");
const Admin = require("../model/admin");

const fortendUrl =process.env.URL ;  // replece front end url

const sendMailForresetPasswordForUser = async (req, res) => {
  const { email } = req.body;
  

  try {
    const user = await User.findOne({ email });
    //   console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate the reset token
    const token = jwt.sign({ userId: user._id }, "yourSecretKey", {
      expiresIn: "10m",
    });

    // Construct the reset link using the token
    const role = "user";
    const resetLink = `${fortendUrl}/reset-password?token=${token}&role=${role}`;


    // Read the HTML template and replace the placeholder
    const emailTemplate = fs.readFileSync(
      path.join(__dirname, "resetPasswordTemplate.html"),
      "utf8"
    );
    const htmlContent = emailTemplate.replace("{{resetLink}}", resetLink);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "hintelsemamart@gmail.com", // Replace with your email
        pass: "frsvchpqbzwpvgyd", // Replace with your actual app password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Use the HTML content instead of plain text
    const mailOptions = {
      from: "hintelsemamart@gmail.com",
      to: email,
      subject: "Reset Password",
      html: htmlContent, // Send the formatted HTML email
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};

const changePasswordByMailForUser = async (req, res) => {
  const { token, newPassword } = req.body; // Assuming the token and new password are sent in the request body
  console.log(token)
  try {
    // Verify the reset token
    const decoded = jwt.verify(token, "yourSecretKey"); // Ensure the key matches what was used in sendMailForresetPassword
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password

    // Update the user's password
    user.password = newPassword;
    await user.save();
    //   console.log("done")
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Token expired" });
    }
    return res
      .status(500)
      .json({ message: "Invalid token or something went wrong", error: err });
  }
};

const sendMailForresetPasswordForInventory = async (req, res) => {
  const { email } = req.body;
  // console.log("fdsfi",email)
  try {
    const user = await InventoryManager.findOne({ email });
    //   console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate the reset token
    const token = jwt.sign({ userId: user._id }, "yourSecretKey", {
      expiresIn: "10m",
    });

    // Construct the reset link using the token
    const role = "inventory";
    const resetLink = `${fortendUrl}/reset-password?token=${token}&role=${role}`;

    // Read the HTML template and replace the placeholder
    const emailTemplate = fs.readFileSync(
      path.join(__dirname, "resetPasswordTemplate.html"),
      "utf8"
    );
    const htmlContent = emailTemplate.replace("{{resetLink}}", resetLink);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "hintelsemamart@gmail.com", // Replace with your email
        pass: "frsvchpqbzwpvgyd", // Replace with your actual app password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Use the HTML content instead of plain text
    const mailOptions = {
      from: "hintelsemamart@gmail.com",
      to: email,
      subject: "Reset Password",
      html: htmlContent, // Send the formatted HTML email
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};

const changePasswordByMailForInventory = async (req, res) => {
  const { token, newPassword } = req.body; // Assuming the token and new password are sent in the request body

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, "yourSecretKey"); // Ensure the key matches what was used in sendMailForresetPassword
    const userId = decoded.userId;

    // Find the user by ID
    const user = await InventoryManager.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password

    // Update the user's password
    user.password = newPassword;
    await user.save();
    //   console.log("done")
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Token expired" });
    }
    return res
      .status(500)
      .json({ message: "Invalid token or something went wrong", error: err });
  }
};

const sendMailForresetPasswordForAdmin = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Admin.findOne({ email });
    //   console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate the reset token
    const token = jwt.sign({ userId: user._id }, "yourSecretKey", {
      expiresIn: "10m",
    });

    // Construct the reset link using the token
    const role = "admin";
    const resetLink = `${fortendUrl}/reset-password?token=${token}&role=${role}`;

    // Read the HTML template and replace the placeholder
    const emailTemplate = fs.readFileSync(
      path.join(__dirname, "resetPasswordTemplate.html"),
      "utf8"
    );
    const htmlContent = emailTemplate.replace("{{resetLink}}", resetLink);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "hintelsemamart@gmail.com", // Replace with your email
        pass: "frsvchpqbzwpvgyd", // Replace with your actual app password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Use the HTML content instead of plain text
    const mailOptions = {
      from: "hintelsemamart@gmail.com",
      to: email,
      subject: "Reset Password",
      html: htmlContent, // Send the formatted HTML email
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};

const changePasswordByMailForAdmin = async (req, res) => {
  const { token, newPassword } = req.body; // Assuming the token and new password are sent in the request body
  console.log(token)
  try {
    // Verify the reset token
    const decoded = jwt.verify(token, "yourSecretKey"); // Ensure the key matches what was used in sendMailForresetPassword
    const userId = decoded.userId;

    // Find the user by ID
    const user = await Admin.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password

    // Update the user's password
    user.password = newPassword;
    await user.save();
    //   console.log("done")
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Token expired" });
    }
    return res
      .status(500)
      .json({ message: "Invalid token or something went wrong", error: err });
  }
};


module.exports = {
  sendMailForresetPasswordForUser,
  changePasswordByMailForUser,
  sendMailForresetPasswordForInventory,
  changePasswordByMailForInventory,
  sendMailForresetPasswordForAdmin,
  changePasswordByMailForAdmin,
};
