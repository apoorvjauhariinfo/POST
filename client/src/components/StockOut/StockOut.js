import { useEffect,useState } from 'react';
import '../Dashboard/Dashboard.css';
import Header from '../Dashboard/Components/header';
import NewSidebar from '../Dashboard/new_sidebar';
import StockOutTable from './StockOutTable';

function StockOut() {
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

  const hospitalid = localStorage.getItem("hospitalid");

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <NewSidebar isOpen={openSidebarToggle} CloseSidebar={CloseSidebar} />
      <StockOutTable hospitalid={hospitalid} />
    </div>
  );
}

export default StockOut;