import Box from "@mui/material/Box";
import StockEntry from "../StockEntry/StockEntry.js";

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
        <StockEntry />
      </Box>
    </main>
  );
}

export default StockEntryScreen;

