// import { useState } from 'react'
// import './Dashboard.css'
// import Header from './Components/header'
// import Sidebar from './Components/sidebar'
// import Entry from './Components/entry'
// import Home from './Components/home'
// import NewSidebar from './new_sidebar'

// function Dashboard() {
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle)
//   }

//   return (
//     <div className='grid-container'>

//       <NewSidebar/>
//       <Header OpenSidebar={OpenSidebar}/>
//       <Home/>

//       {/* <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/> */}

//     </div>
//   )
// }

// export default Dashboard

import { useState, useEffect } from "react";
import "./Dashboard.css";
import Header from "./Components/header";
import Home from "./Components/home";
import NewSidebar from "./new_sidebar";

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  const OpenSidebar = () => {
    setOpenSidebarToggle(true);
  };

  const CloseSidebar = () => {
    setOpenSidebarToggle(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setOpenSidebarToggle(true);
      } else {
        setOpenSidebarToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Check the screen size on initial load
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid-container">
      <NewSidebar isOpen={openSidebarToggle} CloseSidebar={CloseSidebar} />
      <Header
        OpenSidebar={OpenSidebar}
        style={{ backgroundColor: "white", borderBottom: "1px solid black" }}
      />
      <Home />
    </div>
  );
}

export default Dashboard;
