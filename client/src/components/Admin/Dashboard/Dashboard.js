import { useEffect,useState } from 'react'
import './Dashboard.css'
import Header from './Components/header'
import NewSidebar from './Components/new_sidebar'
import Home from './Components/home'

function AdminDashboard() {
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
      <Home/>
      
      
    </div>
  )
}

export default AdminDashboard