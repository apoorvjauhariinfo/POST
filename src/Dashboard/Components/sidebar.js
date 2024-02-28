import {useState,React,CSSProperties} from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import LoadingSpinner from '../../Essentials/Spinner/LoadingSpinner';
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };
function Sidebar({openSidebarToggle, OpenSidebar}) {
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    
    const handleFetch = () => {
        setLoading(true);
        window.location = "/reports"
        setLoading(false);
     };

    const logout = () => {
        localStorage.clear()
        window.location = "/login"
    }

    const handlehome = () => {
        window.location = "/"
    } 
    const handleStock = () => {
        window.location = "/stockentry"
    }
    const handleStockIssue = () => {
        window.location = "/stockissue"
    }
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
        
            <div className='sidebar-brand'>
                <img
                                            src="https://www.semamart.com/wp-content/uploads/2023/12/Semamart-Logo-5-1024x193.png"
                                            class="img-fluid"
                                            alt=""
                                            style={{ width: "200px" }}

                                        />
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href={handlehome} onClick={handlehome}>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href={handlehome} onClick={handlehome}>
                    <BsGrid1X2Fill className='icon'/> Product Entry
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href={handleStock} onClick={handleStock}>
                    <BsGrid1X2Fill className='icon'/> Stock Entry
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href={handleStockIssue} onClick={handleStockIssue}>
                    <BsGrid1X2Fill className='icon'/> Stock Issue
                </a>
            </li>
            <div className='sweet-loading'>
              

                 
                  <ClipLoader
                      color={color}
                      loading={loading}
                      cssOverride={override}
                      size={150}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                  />

            
            </div>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Manage User
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Request Status
                </a>
            </li>
            
            <li className='sidebar-list-item'>
                <a href={logout} onClick={logout}>
                    <BsFillGearFill className='icon'/> Sign Out?
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar