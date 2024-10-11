import Box from "@mui/material/Box";

import StockIssue from "../StockIssue/StockIssue.js";

function StockIssueScreen() {
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
        <StockIssue />
      </Box>
    </main>
  );
}

export default StockIssueScreen;

