import Box from "@mui/material/Box";
import ViewProduct from "../../components/ProductDetails/ViewProduct.js";

export default function ViewProductScreen({ page }) {
  return (
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
      <ViewProduct page={page} />
    </Box>
  );
}
