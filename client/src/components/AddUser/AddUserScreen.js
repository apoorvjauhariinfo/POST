import { useState } from 'react';
// '../Dashboard/Dashboard.css';
import Header from '../Dashboard/Components/header';
import Sidebar from '../Dashboard/Components/sidebar';

import UserData from './UserData';

function AddUserScreen() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        className={openSidebarToggle? 'sidebar-closed' : 'sidebar-open'}
      />
      <UserData />
    </div>
  );
}

export default AddUserScreen;