import { useState, useEffect } from 'react'
import '../Dashboard/Dashboard.css';
import Header from '../Dashboard/Components/header';
import NewSidebar from '../Dashboard/new_sidebar';
import FullFeaturedCrudGrid from './datagrid';

function AvailaibleProduct() {
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
      <Header OpenSidebar={OpenSidebar} />
      <NewSidebar isOpen={openSidebarToggle} CloseSidebar={CloseSidebar} />
      <FullFeaturedCrudGrid />
    </div>
  );
}

export default AvailaibleProduct;