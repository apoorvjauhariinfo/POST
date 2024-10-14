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

import "./Dashboard.css";
import Home from "./Components/home";

function Dashboard() {
  return <Home />;
}

export default Dashboard;
