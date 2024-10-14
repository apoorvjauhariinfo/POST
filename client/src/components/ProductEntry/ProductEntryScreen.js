import Box from "@mui/material/Box";

import ProductEntry from "../ProductEntry/ProductEntry.js";

function StockEntryScreen() {
  return (
    <main className="main-container">
      <Box
        sx={{
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <ProductEntry />
      </Box>
    </main>
  );
}

export default StockEntryScreen;

