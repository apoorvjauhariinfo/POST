import Box from '@mui/material/Box';
import Header from '../Dashboard/Components/header.js'
import NewSidebar from '../Dashboard/new_sidebar' 
import AddUser from './AddUser.js';
import { useState, useEffect } from 'react'
import '../Dashboard/Dashboard.css';

function AddUserScreen() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  const OpenSidebar = () => {
    setOpenSidebarToggle(true);
  };

  const CloseSidebar = () => {
    setOpenSidebarToggle(false)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setOpenSidebarToggle(true)
      } else {
        setOpenSidebarToggle(false)
      }
    }
    
    window.addEventListener('resize', handleResize)

    // Check the screen size on initial load
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='grid-container'>
      
      <Header OpenSidebar={OpenSidebar}/>
      <NewSidebar isOpen={openSidebarToggle} CloseSidebar={CloseSidebar} />
      <main className='main-container' style={{ backgroundColor: "rgb(247, 247, 247)" }}>
        <Box
          sx={{
            height: 600,
            width: '100%',
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}

        >
        <AddUser/>
        </Box>
       
        </main>
      
    </div>
  )
}

export default AddUserScreen;