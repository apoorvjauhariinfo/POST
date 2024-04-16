import {useState,React,CSSProperties} from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import LoadingSpinner from '../Essentials/Spinner/LoadingSpinner';


const override: CSSProperties = {
        display: "block",
};

function MainPage({openSidebarToggle, OpenSidebar}) {
    const [isLoading, setIsLoading] = useState(false);
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    
    const handleFetch = () => {
        setLoading(true);
        window.location = "/reports"
        setLoading(false);
     };

    const addDepartment = () => {
        window.location = "/add-department"
    } 
    const addUser = () => {
        window.location = "/add-user"
    }
    const editAccount = () => {
        window.location = "/edit-account"
    }
    const changePassword = () => {
        window.location = "/change-password"
    }
  return (
    <div id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>

        <div className='sidebar-list'>
            <div className='sidebar-list-item'>
                <a href={addDepartment} onClick={addDepartment}>
                    Department
                </a>
                <span className="separator">|</span>
                <a href={addUser} onClick={addUser}>
                     Add User
                </a>
                <span className="separator">|</span>
                <a href={editAccount} onClick={editAccount}>
                     Edit Account
                </a>
                <span className="separator">|</span> 
                <a href={changePassword} onClick={changePassword}>
                    Change Password
                </a>
            </div>
            
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

        </div>
    </div>
  )
}

export default MainPage 