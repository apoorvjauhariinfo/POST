import { Box } from "@mui/material";
import StockEntryTable from "../../components/stockEntryReport/StockEntryTable";

export default function StockEntryTableScreen() {
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
        <StockEntryTable />
      </Box>
    </main>
  );
}
