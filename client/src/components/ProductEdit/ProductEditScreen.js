import Box from "@mui/material/Box";
import ProductEdit from "../ProductEdit/ProductEdit.js";

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
        <ProductEdit />
      </Box>
    </main>
  );
}

export default StockEntryScreen;
