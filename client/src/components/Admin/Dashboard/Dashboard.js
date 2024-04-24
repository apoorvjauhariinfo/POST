import { useState } from 'react'
import './Dashboard.css'
import Header from './Components/header'
import Sidebar from './Components/sidebar'
import Entry from './Components/entry'
import Home from './Components/home'

function AdminDashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home/>
      
      
    </div>
  )
}

export default AdminDashboard