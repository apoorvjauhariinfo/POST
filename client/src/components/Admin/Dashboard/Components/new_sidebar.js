import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { BsX } from "react-icons/bs";
import "../../../Dashboard/new_sidebar.css";

function NewSidebar({ isOpen, CloseSidebar }) {
  const adminid = localStorage.getItem("adminid");
  const location = useLocation();
  const [request, setRequest] = useState(0);
  const hospitalid = localStorage.getItem("hospitalid");

  

  const logout = () => {
    localStorage.clear();
    window.location = "/adminlogin";
  };

  const handleHome = () => {
    window.location = "/admindashboard";
  };

  const handleStock = () => {
    window.location = "/stockentry";
  };

  const handleStockIssue = () => {
    window.location = "/stockissue";
  };

  const handleProductEntry = () => {
    window.location = "/productentry";
  };

  const handleReports = () => {
    window.location = "/reports";
  };

  const addadmin = () => {
    window.location = "/addadmin";
  };

  const handlerequeststatus = () => {
    window.location = "/requeststatus";
  };


  return (
    <div
      style={{
        display: isOpen ? "block" : "none",
        position: "fixed",
        zIndex: 1000,
        width: "250px",
        backgroundColor: "white",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <div
        className="close-button"
        style={{ textAlign: "right", padding: "10px" }}
      >
        <BsX
          onClick={CloseSidebar}
          style={{ cursor: "pointer", fontSize: "1.5rem" }}
        />
      </div>
      <img
        src={require("../../../assets/Semamart.png")}
        className="semamart-img"
        alt="Semamart"
      />

      <nav className="sidebar">
        <div className="menu_content">
          <ul className="menu_items">
            <div className="menu_title menu_dashboard"></div>
            <div className="sidebar-brand"></div>
            <li className={`item ${location.pathname === "/admindashboard" ? "active" : ""}`}>
              <a
                href="/admindashboard"
                className="nav_link submenu_item"
                onClick={handleHome}
              >
                <span className="navlink_icon">
                  <i className="bx bx-home-alt"></i>
                </span>
                <span className="navlink">Dashboard</span>
              </a>
            </li>
            <li
              className={`item ${location.pathname === "/reports" ? "active" : ""}`}
            >
              <a
                href="/admindashboard"
                className="nav_link submenu_item"
                onClick={handleHome}
              >
                <span className="navlink_icon">
                  <i className="bx bx-bar-chart-alt-2"></i>
                </span>
                <span className="navlink">Reports</span>
              </a>
            </li>
            
            {adminid === "666a9df180a9b257c6cbc3e7" && (
              <li
                className={`item ${location.pathname === "/addadmin" ? "active" : ""}`}
              >
                <a
                  href="/addadmin"
                  className="nav_link submenu_item"
                  onClick={addadmin}
                >
                  <span className="navlink_icon">
                    <i className="bx bx-user"></i>
                  </span>
                  <span className="navlink">Manage Admins</span>
                </a>
              </li>
            )}
            {/* {adminid === "666a9df180a9b257c6cbc3e7" && (
              <li
                className={`item ${location.pathname === "/requeststatus" ? "active" : ""}`}
              >
                <a
                  href="/requeststatus"
                  className="nav_link submenu_item"
                  onClick={handlerequeststatus}
                >
                  <span className="navlink_icon">
                    <i className="bx bx-bell"></i>
                  </span>
                  <span className="navlink">Status Request</span>
                  <span
                    className="navlink"
                    style={{
                      color: "green",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                    }}
                  >
                    {request}
                  </span>
                </a>
              </li>
            )} */}
            
            <li className="item">
              <button
                className="nav_link submenu_item logout-button"
                onClick={logout}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "none",
                  color: "#707070",
                  outline: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <span className="navlink_icon">
                  <i className="bx bx-log-out"></i>
                </span>
                <span className="navlink">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NewSidebar;
