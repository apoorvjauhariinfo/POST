import NavigationBar from "./NavigationBar.js";
// import './ManageDepartment.css'
import Department from "./Department.js";
import NewSidebar from "../Dashboard/new_sidebar.js";
import { useState, useEffect } from "react";
import "../Dashboard/Dashboard.css";

function AddDepartment() {
  return (
    <div
      style={{
        backgroundColor: "#eeeee",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div
        className="grid-container"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Department />
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          textAlign: "center",
          position: "fixed",
          bottom: "0",
          width: "100%",
          borderTop: "1px solid #ccc",
          boxShadow: "0px 5px 10px -5px #555",
        }}
      >
        <div className="col text-center">
          Copyright 2024 semamart.com All Rights Reserved.
        </div>
      </div>
    </div>
  );
}

export default AddDepartment;
