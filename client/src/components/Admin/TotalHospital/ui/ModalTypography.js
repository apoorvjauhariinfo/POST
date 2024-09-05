import React from "react";
import { Typography, Box } from "@mui/material";

export default function ModalTypography({ label, name }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1.6fr",
      }}
    >
      <Typography variant="body1" sx={{ paddingLeft: "25px" }} gutterBottom>
        <strong>{label}</strong>
      </Typography>
      <Typography variant="body1" gutterBottom>
        {name}
      </Typography>
    </Box>
  );
}
