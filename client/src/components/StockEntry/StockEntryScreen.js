import { useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Header from "../Dashboard/Components/header";
import Sidebar from "../Dashboard/Components/sidebar";

import FullFeaturedCrudGrid from "../Reports/datagrid";
import StockEntry from "./StockEntry.js";

function StockEntryScreen() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
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
          <StockEntry />
        </Box>
      </main>
    </div>
  );
}

export default StockEntryScreen;
