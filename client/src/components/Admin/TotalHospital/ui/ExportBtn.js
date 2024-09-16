import { Button, Menu, MenuItem } from "@mui/material";
import jsPDF from "jspdf";
import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import AlertDialog from "../../../UI/AlertDialog";

const defaultHeaders = [
  "HOSPITAL NAME",
  "CEA NUMBER",
  "PHONE",
  "STATE",
  "DISTRICT",
  "NO OF BEDS",
  "NAME",
  "HOSPITAL EMAIL",
];

export default function ExportBtn({
  rows,
  isSelected = false,
  headers = defaultHeaders,
}) {
  const [alertDialog, setAlertDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let selectedData = [];

  if (isSelected) {
    selectedData = rows;
  } else {
    rows.forEach((row) => {
      selectedData.push([
        row.hospitalname,
        row.ceanumber,
        row.phone,
        row.state,
        row.district,
        row.beds,
        row.billingname,
        row.email,
      ]);
    });
  }

  function handleCSVExport() {
    if (selectedData.length === 0) {
      setAlertDialog(true);
      return;
    }
    const csvContent = [headers, ...selectedData]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${new Date().toLocaleDateString()}_Total_Product.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handlePdfExport() {
    if (selectedData.length === 0) {
      setAlertDialog(true);
      return;
    }
    const doc = new jsPDF();

    doc.autoTable({
      startY: 85,
      head: [headers],
      body: selectedData,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133], textColor: 255, fontSize: 10 },
      bodyStyles: { fontSize: 9 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      styles: { cellPadding: 3 },
    });

    // Add footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("semamart.com", 14, doc.internal.pageSize.height - 10);
    doc.text("contact@semamart.com", 60, doc.internal.pageSize.height - 10);

    doc.save("HospitalDetails.pdf");
  }

  //////////////////////

  return (
    <>
      <AlertDialog
        open={alertDialog}
        onClose={() => setAlertDialog(false)}
        text="Please select rows"
      />
      <Button
        style={{
          backgroundColor: "#2E718A",
          color: "#fff", // Ensure the text is readable
        }}
        variant="contained"
        startIcon={<FiDownload />}
        onClick={handleClick}
      >
        Export
      </Button>
      <Menu
        id="export-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "export-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handlePdfExport();
          }}
        >
          PDF
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCSVExport();
          }}
        >
          CSV
        </MenuItem>
      </Menu>
    </>
  );
}
