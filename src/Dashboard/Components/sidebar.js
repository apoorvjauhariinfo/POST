import {useState,React} from 'react'
import LoadingSpinner from '../../Essentials/Spinner/LoadingSpinner';
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const [isLoading, setIsLoading] = useState(false);
    const handleFetch = () => {
        setIsLoading(true);
        window.location = "/reports"
        setIsLoading(false);
     };
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
                <a href="/">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
            {isLoading ? <LoadingSpinner /> : <a href={handleFetch} onClick={handleFetch}>
                    <BsFillArchiveFill className='icon'/> Reports
                </a>}
                
            </li>
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
                <a href="">
                    <BsFillGearFill className='icon'/> Sign Out?
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar