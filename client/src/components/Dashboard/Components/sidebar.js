import { useState, React, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import LoadingSpinner from "../../Essentials/Spinner/LoadingSpinner";
import "./sidebar.css";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsScrewdriver,
  BsCartDashFill,
  BsProjector,
  BsListColumns,
  BsReceipt,
  BsStack,
  BsLock,
  BsStoplights,
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [isLoading, setIsLoading] = useState(false);
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const handleFetch = () => {
    setLoading(true);
    window.location = "/reports";
    setLoading(false);
  };

  const logout = () => {
    localStorage.clear();
    window.location = "/login";
  };

  const handlehome = () => {
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

  const isHOH = localStorage.getItem("inventorymanagerid") == null;

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        {/* <div className="sidebar-brand">
          <img
            src={require("../../assets/Semamart.png")}
            class="img-fluid"
            alt=""
            style={{ width: "200px" }}
          />
        </div> */}
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <div className="cardlatest">
          <div className="card-body">
            <li className="sidebar-list-item">
              <a
                href={handlehome}
                className="sidebar-link"
                onClick={handlehome}
              >
                <div className="icon-container">
                  <BsCartDashFill className="icon" />
                </div>
                <span>Dashboard</span>
              </a>
            </li>
          </div>
        </div>
        {!isHOH && (
          <div className="cardlatest">
            <div className="card-body">
              <li className="sidebar-list-item">
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
        )}
        {!isHOH && (
          <div className="cardlatest">
            <div className="card-body">
              <li className="sidebar-list-item">
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
        )}
        {!isHOH && (
          <div className="cardlatest">
            <div className="card-body">
              <li className="sidebar-list-item">
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
        )}

        <div className="cardlatest">
          <div className="card-body">
            <li className="sidebar-list-item">
              <a
                href={handleReports}
                className="sidebar-link"
                onClick={handleReports}
              >
                <div className="icon-container">
                  <BsReceipt className="icon" />
                </div>
                <span>Reports</span>
              </a>
            </li>
          </div>
        </div>
        {isHOH && (
          <div className="cardlatest">
            <div className="card-body">
              <li className="sidebar-list-item">
                <a
                  href={handleUser}
                  className="sidebar-link"
                  onClick={handleUser}
                >
                  <div className="icon-container">
                    <BsPeopleFill className="icon" />
                  </div>
                  <span>Manage User</span>
                </a>
              </li>
            </div>
          </div>
        )}
        <div className="cardlatest">
          <div className="card-body">
            <li className="sidebar-list-item">
              <a
                href={handlehome}
                className="sidebar-link"
                onClick={handlehome}
              >
                <div className="icon-container">
                  <BsStack className="icon" />
                </div>
                <span>Request Status</span>
              </a>
            </li>
          </div>
        </div>

        <div className="cardlatest">
          <div className="card-body">
            <li className="sidebar-list-item">
              <a href={logout} className="sidebar-link" onClick={logout}>
                <div className="icon-container">
                  <BsLock className="icon" />
                </div>
                <span>Logout</span>
              </a>
            </li>
          </div>
        </div>
      </ul>
      {/* navbar
      <nav className="navbar">
        <div className="logo_item">
          <i className="bx bx-menu" id="sidebarOpen"></i>
          <img src="images/logo.png" alt="CodingNepal" />
        </div>

        <div className="search_bar">
          <input type="text" placeholder="Search" />
        </div>

        <div className="navbar_content">
          <i className="bi bi-grid"></i>
          <i className="bx bx-sun" id="darkLight"></i>
          <i className="bx bx-bell"></i>
          <img src="images/profile.jpg" alt="" className="profile" />
        </div>
      </nav> */}
    </aside>
  );
}


export default Sidebar;


