import Box from "@mui/material/Box";
import AddUser from "./AddUser.js";
import "../Dashboard/Dashboard.css";

function AddUserScreen() {
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
        <AddUser />
      </Box>
    </main>
  );
}

export default AddUserScreen;
