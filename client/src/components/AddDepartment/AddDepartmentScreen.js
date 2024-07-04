import { useState } from 'react'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Header from '../Dashboard/Components/header.js'
import Sidebar from '../Dashboard/Components/sidebar.js'

import FullFeaturedCrudGrid from '../Reports/datagrid.js'
import ProductEntry from '../ProductEntry/ProductEntry.js'
import AddDepartment from './AddDepartment.js'
function AddDepartmentScreen() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='row'>
      
      <Header />
      
     
        <AddDepartment/>
        <Button>
        Proceed To Dashboard
    </Button>
        
       
      
    </div>
   
  )
}

export default AddDepartmentScreen