import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const SpinnerLoader = () => {
  return (
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"  // Fixed to cover the page
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bgcolor="rgba(0, 0, 0, 0.3)"  // Semi-transparent background
      zIndex={9999}  // Ensures the spinner stays on top of all elements
    >
      <CircularProgress size={60} thickness={3.5} />
    </Box>
  );
};

export default SpinnerLoader;
