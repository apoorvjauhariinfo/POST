import Box from "@mui/material/Box";
import ProductDetails from "./ProductDetails.js";

function ProductDetailsScreen() {
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
        <ProductDetails />
      </Box>
    </main>
  );
}

export default ProductDetailsScreen;
