import { useState } from 'react';
import '../Dashboard/Dashboard.css';
import Header from '../Dashboard/Components/header.js';
import Sidebar from '../Dashboard/Components/sidebar.js';
import FullFeaturedCrudGrid from './datagrid.js';

function NewRegistration() {
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
      <FullFeaturedCrudGrid />
    </div>
  );
}

export default NewRegistration;