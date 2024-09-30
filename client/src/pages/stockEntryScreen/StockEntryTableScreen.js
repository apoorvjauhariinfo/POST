import { Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/Dashboard/Components/header";
import NewSidebar from "../../components/Dashboard/new_sidebar";
import StockEntryTable from "../../components/stockEntryReport/StockEntryTable";

export default function StockEntryTableScreen() {
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
      <main className="main-container">
        <Box
          sx={{
            height: 600,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
          }}
        >
          <StockEntryTable />
        </Box>
      </main>
    </div>
  );
}
