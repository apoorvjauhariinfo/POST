import Box from "@mui/material/Box";
// import Sidebar from '../Dashboard/Components/sidebar.js'
import ProductComparision from "./ProductComparision.js";

function ProductComparisionScreen() {
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
        <ProductComparision />
      </Box>
    </main>
  );
}

export default ProductComparisionScreen;

