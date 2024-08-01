import { useState } from 'react'
import Box from '@mui/material/Box';
import Header from '../Dashboard/Components/header.js'
import Sidebar from '../Dashboard/Components/sidebar.js'
import RequestStatus from './RequestStatus.js';
import '../../Dashboard/Dashboard.css';

function AddUserScreen() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'style={{ backgroundColor: "rgb(247, 247, 247)" }}>
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
        <RequestStatus/>
        </Box>
       
        </main>
      
    </div>
  )
}

export default AddUserScreen;