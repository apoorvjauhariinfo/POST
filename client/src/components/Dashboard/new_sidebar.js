import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import {
  BsProjector,
  BsStoplights,
  BsListColumns,
  BsX,
} from "react-icons/bs";
import "./new_sidebar.css";

function NewSidebar({ isOpen, CloseSidebar }) {
  const location = useLocation();
  const [request, setRequest] = useState();
  const hospitalid = localStorage.getItem('hospitalid');


  const getrequests = async () => {
    try {

      const url = `${process.env.REACT_APP_BASE_URL}requestbyhospitalid/${hospitalid}`;
      const { data } = await Axios.get(url);
      setRequest(data.document.length);
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
        backgroundColor: "#f8f9fa",
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
            <li
              className={`item ${location.pathname === "/reports" ? "active" : ""
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
            <li
              className={`item ${location.pathname === "/adduser" ? "active" : ""
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
            {isHOH && (
            <li
              className={`item ${location.pathname === "/statusrequest" ? "active" : ""
                }`}
            >
              <a href="/requeststatus" className="nav_link submenu_item">
                <span className="navlink_icon">
                  <span className="navlink" style={{ color: "green" }}>{request}</span>
                  <i className="bx bx-bell"></i>
                </span>
                <span className="navlink">Status Request</span>
              </a>
            </li>
            )}

            {!isHOH && (
              <>
                <div className="cardlatest">
                  <div className="card-body">
                    <li
                      className={`sidebar-list-item ${location.pathname === "/productentry" ? "active" : ""
                        }`}
                    >
                      <a
                        href={handleProductEntry}
                        className="sidebar-link"
                        onClick={handleProductEntry}
                      >
                        <div className="icon-container">
                          <BsProjector className="icon" />
                        </div>
                        <span>Product Entry</span>
                      </a>
                    </li>
                  </div>
                </div>
                <div className="cardlatest">
                  <div className="card-body">
                    <li
                      className={`sidebar-list-item ${location.pathname === "/stockentry" ? "active" : ""
                        }`}
                    >
                      <a
                        href={handleStock}
                        className="sidebar-link"
                        onClick={handleStock}
                      >
                        <div className="icon-container">
                          <BsStoplights className="icon" />
                        </div>
                        <span>Stock Entry</span>
                      </a>
                    </li>
                  </div>
                </div>
                <div className="cardlatest">
                  <div className="card-body">
                    <li
                      className={`sidebar-list-item ${location.pathname === "/stockissue" ? "active" : ""
                        }`}
                    >
                      <a
                        href={handleStockIssue}
                        className="sidebar-link"
                        onClick={handleStockIssue}
                      >
                        <div className="icon-container">
                          <BsListColumns className="icon" />
                        </div>
                        <span>Stock Issue</span>
                      </a>
                    </li>
                  </div>
                </div>
              </>
            )}

            {/* <div className="logout_button">
              <a className="nav_link submenu_item" onClick={logout}>
                <span className="navlink_icon">
                  <i className="bx bx-log-out"></i>
                </span>
                <span className="navlink">Logout</span>
              </a>
            </div> */}
            <div className="logout_button">
              <button className="nav_link submenu_item logout-button" onClick={logout}>
                <span className="navlink_icon">
                  <i className="bx bx-log-out"></i>
                </span>
                <span className="navlink">Logout</span>
              </button>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NewSidebar;
