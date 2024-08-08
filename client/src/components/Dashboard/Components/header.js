import React from "react";
import { BsJustify, BsHospital, BsArrowReturnLeft } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
// import { Text } from "recharts";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
// import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { Box, Select, InputLabel } from "@mui/material";


const hospitalid = localStorage.getItem("hospitalid");
const isInventoryManager = localStorage.getItem("inventorymanagerid") !== null;

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha("#2E718A", 0.25),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(1),
//     width: "auto",
//   },
// }));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "70ch",
      "&:focus": {
        width: "80ch",
      },
    },
  },
}));

function Header({ OpenSidebar }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hospitalname, setHospitalName] = React.useState(null);
  const [profileImage, setProfileImage] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddUser = () => {
    window.location = "/adduser";
  };
  const handleEditAccount = () => {
    window.location = "/editaccount";
  };
  const handleEditHospital = () => {
    window.location = "/edithospital";
  };
  const handleManageDepartment = () => {
    window.location = "/managedepartment";
  };
  const logout = () => {
    localStorage.clear();
    window.location = "/login";
  };

  const handleBack = () => {
    window.location = "/";
  };
  const bufferToBase64 = (buf) => {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buf));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };
  const gethospital = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}hospitals`;
      const { data } = await axios.get(url);
      for (let a = 0; a < data.document.length; a++) {
        if (data.document[a]._id == hospitalid) {
          setHospitalName(data.document[a].hospitalname);
          const imageData = data.document[a].profileImage;
          if (imageData && imageData.data) {
            const base64String = bufferToBase64(imageData.data);
            setProfileImage(`data:image/jpeg;base64,${base64String}`);
          } else {
            setProfileImage(null); // Set to null if no data found
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(hospitalid);
  gethospital();
  return (
    <header
      className="header"
      style={{ backgroundColor: "white", border: "black" }}
    >
      <div className="menu-icon">
        <IoMdMenu className="icon" onClick={OpenSidebar} />
      </div>

      <div className="header-left h3" style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleBack}
          style={{ display: 'flex', alignItems: 'center', color: '#2E718A' }}
        >
          <BsArrowReturnLeft style={{ marginRight: '5px' }} /> 
        </Button>
      </div>

      <div className="header-right h2" style={{ display: 'flex', alignItems: 'center' }}>
        {/* <BsHospital style={{ marginRight: '5px', fontSize: '1.5rem', color: '#2E718A' }} /> */}
        <Box
                          sx={{
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "50",
                            margin: "10px",
                            height: 50,
                          }}
                        >
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Product"
                              style={{ maxWidth: "100%", maxHeight: "100%" , borderRadius:"50%"}}
                            />
                          ) : (
                            <img
                              width="50"
                              height="50"
                              src="http://img.icons8.com/color/96/add-image.png"
                              alt="add-image"
                              style={{ borderRadius: "50%" }} // Add this line to make the image circular

                            />
                          )}
                        </Box>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ color: '#2E718A' }}
        >
          {hospitalname}
        </Button>
        {!isInventoryManager && (
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
              style: {
                padding: '10px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              }
            }}
          >
            <MenuItem onClick={handleEditAccount} style={{ padding: '10px 20px', borderBottom: '1px solid #eee' }}>
              Edit Account Details
            </MenuItem>
            <MenuItem onClick={handleEditHospital} style={{ padding: '10px 20px', borderBottom: '1px solid #eee' }}>
              Edit Hospital Details
            </MenuItem>
            <MenuItem onClick={handleManageDepartment} style={{ padding: '10px 20px', borderBottom: '1px solid #eee' }}>
              Manage Department
            </MenuItem>
            <MenuItem onClick={handleAddUser} style={{ padding: '10px 20px' }}>
              Manage User
            </MenuItem>
            <MenuItem onClick={logout} style={{ padding: '10px 20px' }}>
              Logout
            </MenuItem>
          </Menu>
        )}
      </div>
    </header>
  );
}

export default Header;
