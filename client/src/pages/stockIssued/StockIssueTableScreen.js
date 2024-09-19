import { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/Dashboard/Components/header";
import NewSidebar from "../../components/Dashboard/new_sidebar";
import StockIssueTable from "../../components/stockIssueReport/StockIssueTable";

export default function StockIssueTableScreen() {
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
      <Header OpenSidebar={OpenSidebar} />
      <NewSidebar isOpen={openSidebarToggle} CloseSidebar={CloseSidebar} />
      <StockIssueTable />
    </div>
  );
}
