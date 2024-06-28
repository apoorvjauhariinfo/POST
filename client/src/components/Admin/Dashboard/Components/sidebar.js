import { useState, React, CSSProperties } from "react";
// import ClipLoader from 'react-spinners/ClipLoader';
// import LoadingSpinner from '../../Essentials/Spinner/LoadingSpinner';
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
  const adminid = localStorage.getItem("adminid");
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
  const handleaddadmin = () => {
    window.location = "/addadmin";
  };
  const handlerequeststatus = () => {
    window.location = "/requeststatus";
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img
            src={require("../../../assets/Semamart.png")}
            class="img-fluid"
            alt=""
            style={{ width: "200px" }}
          />
        </div>
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
        <div className="cardlatest">
          <div className="card-body">
            <li className="sidebar-list-item">
              <a
                href={handlehome}
                className="sidebar-link"
                onClick={handlehome}
              >
                <div className="icon-container">
                  <BsProjector className="icon" />
                </div>
                <span>Report</span>
              </a>
            </li>
          </div>
        </div>
        {adminid === "666a9df180a9b257c6cbc3e7" && (
          <div className="cardlatest">
            <div className="card-body">
              <li className="sidebar-list-item">
                <a
                  href={handlehome}
                  className="sidebar-link"
                  onClick={handleaddadmin}
                >
                  <div className="icon-container">
                    <BsStoplights className="icon" />
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
                onClick={handlerequeststatus}
              >
                <div className="icon-container">
                  <BsListColumns className="icon" />
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
                  <BsReceipt className="icon" />
                </div>
                <span>LogOut</span>
              </a>
            </li>
          </div>
        </div>
      </ul>
    </aside>
  );
}

export default Sidebar;
