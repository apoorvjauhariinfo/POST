import React, { useEffect } from "react";
import { BsJustify, BsHospital, BsArrowReturnLeft } from "react-icons/bs";
import { Text } from "recharts";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Axios from "axios";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.25),
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
  height: "70%",
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
  const adminid = localStorage.getItem("adminid");
  const [admin, setAdmin] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  const handleBack = () => {
    window.location = "/admindashboard";
  };
  const loadUsers = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}adminbyid/${adminid.toString()}`;
    const { data } = await Axios.get(url);
    console.log(data);
    for (let a = 0; a < data.document.length; a++) {
      if (data.document[a]._id == adminid) {
        setAdmin(data.document[a].name);
        break;

        //Needs to Implement Other Test Cases Too.
      }
    }
  };
 
  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <header className="header" style={{ backgroundColor: "white", border: "black" }}>
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
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

      {/* <div className="header-right h2">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Hospital Search  "
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </div> */}
      <div className="header-right h3">
        <BsHospital  style={{ marginRight: '5px', fontSize: '1.5rem', color: '#2E718A' }} />
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {admin}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {/* <MenuItem onClick={handleAddUser}>Manage Users</MenuItem>
          
          <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        </Menu>
      </div>
    </header>
  );
}

export default Header;
