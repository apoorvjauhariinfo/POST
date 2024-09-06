import { TableCell } from "@mui/material";
import React from "react";

export default function TableHeadElement({ text }) {
  return (
    <TableCell
      align="center"
      style={{
        fontWeight: "bold",
        color: "#2e718a",
        textTransform: "uppercase",
        fontSize: "0.9rem",
        padding: "10px",
      }}
    >
      {text}
    </TableCell>
  );
}
