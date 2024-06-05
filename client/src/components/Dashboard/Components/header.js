import React from 'react'
import 
 {BsJustify, BsHospital, BsArrowReturnLeft}
 from 'react-icons/bs'
import { Text } from 'recharts'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const hospitalid = localStorage.getItem('hospitalid');
const isInventoryManager = localStorage.getItem("inventorymanagerid")!== null;


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#2E718A', 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '70ch',
      '&:focus': {
        width: '80ch',
      },
    },
  },
}));


function Header({OpenSidebar}) {
 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hospitalname, setHospitalName] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddUser = () => {
    window.location = "/adduser"
  };
  const handleEditAccount = () => {
    window.location = "/editaccount"
  };
  const handleEditHospital = () => {
    window.location = "/edithospital"
  };
  const handleManageDepartment = () => {
    window.location = "/managedepartment"
  };
 

  const handleBack = () => {
    window.location = "/"
  };
  const gethospital = async () => {
    try {
      
      const url = `http://localhost:4000/hospitals`;
      const { data } = await axios.get(url);
      for(let a = 0;a < data.document.length;a++){
        if(data.document[a]._id == hospitalid){
           setHospitalName(data.document[a].hospitalname);
        }
      }
     
  
    } catch (error) {
      console.log(error);
    }
  
  };
  console.log(hospitalid);
  gethospital();
    return (
    <header className='header'style={{ backgroundColor: "white" ,border:"#75b6fa"}}>    

        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        
        <div className='header-left h3'>
        
            <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleBack}
        >
          BACK
        </Button>
         
        </div>
        
        <div className='header-right h3'>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Your Product"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

      </div>
      <div className='header-right h2'>

        
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
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
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleEditAccount}>Edit Account Details</MenuItem>
          <MenuItem onClick={handleEditHospital}>Edit Hospital Details</MenuItem>
          <MenuItem onClick={handleManageDepartment}>Manage Department</MenuItem>
          <MenuItem onClick={handleAddUser}>Manage User</MenuItem>
         
        </Menu>
        )}
      </div>
    </header>
  )
}

export default Header