import { useState } from 'react'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Header from '../Dashboard/Components/header.js'
import Sidebar from '../Dashboard/Components/sidebar.js'
import NewRegistration from './NewRegistration.js';

function AddUserScreen() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
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
        <NewRegistration/>
        </Box>
       
        </main>
      
    </div>
  )
}

export default AddUserScreen;