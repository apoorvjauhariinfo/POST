import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

const NavigationBar = () => {
  return (
<AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }} >
<Toolbar>
  {/* Left side: Logo */}
  <IconButton color="inherit">
        <img src="https://www.semamart.com/wp-content/uploads/2023/12/Semamart-Logo-5-1024x193.png" alt="Logo" style={{ width: "150px" }} />
      </IconButton>
   
  

  {/* Right side: Home Icons */}
  <div style={{ marginLeft: 'auto' }}>
    <IconButton color="primary">
      <HomeIcon style={{ color: 'blue' }} />
    </IconButton>

      <IconButton color="inherit">
        <img src="https://www.semamart.com/wp-content/uploads/2023/12/Semamart-Logo-5-1024x193.png" alt="Logo" style={{ width: "100px" }} />
      </IconButton>
   
  </div>
</Toolbar>
</AppBar>
  );
};

export default NavigationBar; 