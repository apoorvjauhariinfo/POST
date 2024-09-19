import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";
import { BsX } from "react-icons/bs";
import "./new_sidebar.css";
import { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function NewSidebar({ isOpen, CloseSidebar }) {
  const isHOH = localStorage.getItem("inventorymanagerid") === null;
  const location = useLocation();
  const [request, setRequest] = useState(0);
  const hospitalid = localStorage.getItem("hospitalid");
  const imId = localStorage.getItem("inventorymanagerid");

  const getrequests = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}requestbyhospitalid/${hospitalid}`;
    if (!isHOH) {
      url = `${process.env.REACT_APP_BASE_URL}requestbyImId/${imId}`;
    }

    try {
      const { data } = await Axios.get(url);
      let count = 0;
      for (let a = 0; a < data.document.length; a++) {
        if (data.document[a].status === "pending") {
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

  useEffect(() => {
    getrequests();
  }, []);

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
            {isHOH && <ReportsAccordion />}
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
                <li
                  className={`item ${
                    location.pathname === "/reports" ? "active" : ""
                  }`}
                >
                  <a
                    href={"/requeststatus/" + imId}
                    className="nav_link submenu_item"
                    onClick={handleStockIssue}
                  >
                    <span className="navlink_icon">
                      <i className="bx bx-bar-chart-alt-2"></i>
                    </span>
                    <span className="navlink">Request Status</span>
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

function ReportsAccordion() {
  const location = useLocation();
  const locationPaths = [
    "/totalproduct",
    "/availaibleproduct",
    "/stockout",
    "/bufferstock",
    "/stockissuereport",
  ];
  const isExpanded = locationPaths.some((el) => location.pathname.includes(el));

  const [accExpanded, setAccExpanded] = useState(isExpanded);

  function sxStyles(path) {
    return {
      display: "flex",
      alignItems: "center",
      borderRadius: "4px",
      color: location.pathname.includes(path) ? "whitesmoke" : "#707070",
      padding: "12px",
      backgroundColor: location.pathname.includes(path)
        ? "#2E718A"
        : "transparent",
      "&:hover": {
        backgroundColor: "#c45516",
        color: "whitesmoke",
      },
    };
  }

  return (
    <li
    // className={`item ${location.pathname.includes("/reports") ? "active" : ""}`}
    >
      <Accordion
        expanded={accExpanded}
        onChange={(_e, expanded) => setAccExpanded(expanded)}
        sx={{
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            color: "#707070",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#c45516",
              "& .navlink_icon i": {
                color: "white",
                // backgroundColor: "#c45516",
              },
              "& .accord_summ": {
                color: "white",
                // backgroundColor: "#c45516",
              },
            },
          }}
        >
          <Typography className="">
            <span
              className="accord_summ"
              style={{
                position: "relative",
                fontSize: "22px",
                minWidth: "50px",
                lineHeight: "40px",
                display: "inline-block",
                textAlign: "center",
                borderRadius: "6px",
              }}
            >
              <i className="bx bx-bar-chart-alt-2"></i>
            </span>
            <span className="accord_summ">Reports</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingLeft: "40px" }}>
          <div>
            <Link to="/totalproduct" style={{ textDecoration: "none" }}>
              <Typography sx={sxStyles("/totalproduct")}>
                Total Product
              </Typography>
            </Link>
          </div>
          <div>
            <Link to="/availaibleproduct" style={{ textDecoration: "none" }}>
              <Typography sx={sxStyles("/availaibleproduct")}>
                Available Product
              </Typography>
            </Link>
          </div>
          <div>
            <Link to="/bufferstock" style={{ textDecoration: "none" }}>
              <Typography sx={sxStyles("/bufferstock")}>
                Buffer Stock
              </Typography>
            </Link>
          </div>
          <div>
            <Link to="/stockout" style={{ textDecoration: "none" }}>
              <Typography sx={sxStyles("/stockout")}>Stock Out</Typography>
            </Link>
          </div>
          <div>
            <Link to="/stockissuereport" style={{ textDecoration: "none" }}>
              <Typography sx={sxStyles("/stockissuereport")}>
                Stock Issue
              </Typography>
            </Link>
          </div>
        </AccordionDetails>
      </Accordion>
    </li>
  );
}
