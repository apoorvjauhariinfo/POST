import { useEffect,useState } from 'react'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Header from '../Dashboard/Components/header'
import NewSidebar from '../Dashboard/new_sidebar.js';
import FullFeaturedCrudGrid from '../Reports/datagrid'
import StockEntry from '../StockEntry/StockEntry.js'

function StockEntryScreen() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true)

  const OpenSidebar = () => {
    setOpenSidebarToggle(true)
  }

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
        <StockEntry/>
       
        </Box>
       
        </main>
      
    </div>
  )
}

export default StockEntryScreen