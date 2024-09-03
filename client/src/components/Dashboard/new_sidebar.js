import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { BsX } from "react-icons/bs";
import "./new_sidebar.css";

function NewSidebar({ isOpen, CloseSidebar }) {
  const location = useLocation();
  const [request, setRequest] = useState();
  const hospitalid = localStorage.getItem("hospitalid");

  const getrequests = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}requestbyhospitalid/${hospitalid}`;
      const { data } = await Axios.get(url);
      let count = 0;
      for(let a = 0;a <data.document.length;a++){
        if(data.document[a].status == "pending"){
          count++;
        }
      }
      setRequest(count);
      console.log("Request" + data.document.length);

      console.log("DAta is ours", data);
    } catch (error) {
      console.log(error);
    }
  };

  getrequests();

  const logout = () => {
    localStorage.clear();
    window.location = "/login";
  };

  const handleHome = () => {
    window.location = "/";
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

  const handleUser = () => {
    window.location = "/adduser";
  };

  const isHOH = localStorage.getItem("inventorymanagerid") === null;

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
        src={require("../assets/Semamart.png")}
        className="semamart-img"
        alt="Semamart"
      />

      {/* sidebar */}

      <nav className="sidebar">
        <div className="menu_content">
          <ul className="menu_items">
            <div className="menu_title menu_dashboard"></div>
            <div className="sidebar-brand"></div>
            <li className={`item ${location.pathname === "/" ? "active" : ""}`}>
              <a
                href="/"
                className="nav_link submenu_item"
                onClick={handleHome}
              >
                <span className="navlink_icon">
                  <i className="bx bx-home-alt"></i>
                </span>
                <span className="navlink">Dashboard</span>
              </a>
            </li>
            {isHOH && (
            <li
              className={`item ${
                location.pathname === "/reports" ? "active" : ""
              }`}
            >
              <a
                href="/reports"
                className="nav_link submenu_item"
                onClick={handleReports}
              >
                <span className="navlink_icon">
                  <i className="bx bx-bar-chart-alt-2"></i>
                </span>
                <span className="navlink">Reports</span>
              </a>
            </li>
            )}
            {isHOH && (
            <li
              className={`item ${
                location.pathname === "/adduser" ? "active" : ""
              }`}
            >
              <a
                href="/adduser"
                className="nav_link submenu_item"
                onClick={handleUser}
              >
                <span className="navlink_icon">
                  <i className="bx bx-user"></i>
                </span>
                <span className="navlink">Manage Users</span>
              </a>
            </li>
            )}
            {isHOH && (
              <li
                className={`item ${
                  location.pathname === "/statusrequest" ? "active" : ""
                }`}
              >
                <a href="/requeststatus" className="nav_link submenu_item">
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
            )}
            {!isHOH && (
              <>
                <li
                  className={`item ${
                    location.pathname === "/productentry" ? "active" : ""
                  }`}
                >
                  <a
                    href="/productentry"
                    className="nav_link submenu_item"
                    onClick={handleProductEntry}
                  >
                    <span className="navlink_icon">
                      <i class="bx bxs-package"></i>
                    </span>
                    <span className="navlink">Product Entry</span>
                  </a>
                </li>
                <li
                  className={`item ${
                    location.pathname === "/stockentry" ? "active" : ""
                  }`}
                >
                  <a
                    href="/stockentry"
                    className="nav_link submenu_item"
                    onClick={handleStock}
                  >
                    <span className="navlink_icon">
                      <i class="bx bx-checkbox-checked "></i>
                    </span>
                    <span className="navlink">Stock Entry</span>
                  </a>
                </li>
                <li
                  className={`item ${
                    location.pathname === "/stockissue" ? "active" : ""
                  }`}
                >
                  <a
                    href="/stockissue"
                    className="nav_link submenu_item"
                    onClick={handleStockIssue}
                  >
                    <span className="navlink_icon">
                      <i className="bx bx-columns"></i>
                    </span>
                    <span className="navlink">Stock Issue</span>
                  </a>
                </li>
              </>
            )}
            <li className="item">
              <button
                className="nav_link submenu_item logout-button"
                onClick={logout}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "none",
                  color: "#707070", // Ensure text color remains unchanged
                  outline: "none", // Prevent outline on focus
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
