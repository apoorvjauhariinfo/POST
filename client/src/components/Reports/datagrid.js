import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import data from "./DataSource.json";
import logo from "../assets/Semamart.png";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import axios from "axios";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FiDownload } from "react-icons/fi";

import { randomId, randomArrayItem } from "@mui/x-data-grid-generator";

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import { BsFilter } from "react-icons/bs";

import AlertDialog from "../UI/AlertDialog";

const hospitalid = localStorage.getItem("hospitalid");

// Roles Array from which Randomly Generate Roles
const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

//Add The required Information
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const hospitalid = localStorage.getItem("hospitalid");
  const inventorymanagerid = localStorage.getItem("inventorymanagerid");
  const userid = localStorage.getItem("id");

  //  For Total Products

  const handleClick = () => {
    // ID to be introduced here for New Record
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        name: "Name?",
        companyName: "Company Name?",
        type: "Select",
        email: "Your Email",
        city: "Select",
        state: "Select",
        contactNumber: "Your Phone",
        gstNumber: "GST No",
        productType: "Select",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  //AddRecord Button
  return <GridToolbarContainer></GridToolbarContainer>;
}

export default function FullFeaturedCrudGrid() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState(data);
  const [columns, setColumns] = React.useState([]);

  const [hospitalName, setHospitalName] = React.useState(null);
  const [stockid, setStockId] = React.useState();
  const [issueid, setIssueId] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [columnAnchorEl, setColumnAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const isIManager = localStorage.getItem("inventorymanagerid");

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [activeTable, setActiveTable] = React.useState("table1");

  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");

  React.useEffect(() => {
    // Fetch data based on the active table when the component mounts or activeTable changes
    if (activeTable === "table1") {
      gettotalprod();
    } else if (activeTable === "table2") {
      getavaildata();
    } else if (activeTable === "table3") {
      getbufferdata();
    } else if (activeTable === "table4") {
      getoutdata();
    }
  }, [activeTable]);

  //for column filter fuctionality
  const [visibleColumns, setVisibleColumns] = React.useState({
    date: true,
    producttype: true,
    name: true,
    category: true,
    manufacturer: true,
    origin: true,
    subcategory: true,
    emergencytype: true,
    actions: true,
  });

  // to input the hospital name dynamically in the pdf
  const gethospital = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}hospitalbyid/${hospitalid}`;
      const { data } = await axios.get(url);

      setHospitalName(data.document[0].hospitalname);
    } catch (error) {
      console.log(error);
    }
  };

  //Total Products
  const gettotalprod = async () => {
    try {
      const newrows = [];
      const url = `${process.env.REACT_APP_BASE_URL}productsdata/${hospitalid}`;
      const { data } = await axios.get(url);

      setRows(data.documents);
      setColumns([
        { field: "date", headerName: "Date of Entry", width: 150 },
        { field: "name", headerName: "Product Name", width: 150 },
        { field: "producttype", headerName: "Product Type", width: 150 },
        { field: "category", headerName: "Category", width: 100 },
        { field: "subcategory", headerName: "Sub Category", width: 200 },
        { field: "upccode", headerName: "Upc Code", width: 150 },
        { field: "manufacturer", headerName: "Manufacturer", width: 150 },
        { field: "origin", headerName: "Origin", width: 130 },
        { field: "emergencytype", headerName: "Emergency Type", width: 150 },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  //Avalaible Products
  const getavaildata = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}aggregatedstocks/${hospitalid}`;
      const { data } = await axios.get(url);
      const newRows = data.documents.map((stock) => ({
        _id: stock._id,
        name: stock.productDetails.name,
        producttype: stock.productDetails.producttype,
        batchno: stock.batchno,
        manufacturer: stock.productDetails.manufacturer,
        category: stock.productDetails.category,
        unitcost: stock.unitcost,
        totalquantity: stock.totalquantity,
        gst: stock.gst,
        grandtotal: stock.grandtotal,
        emergencytype: stock.productDetails.emergencytype,
      }));
      setRows(newRows);
      console.log("rows" + rows);

      setColumns([
        { field: "name", headerName: "Product Name", width: 150 },
        { field: "producttype", headerName: "Type", width: 150 },
        { field: "batchno", headerName: "Batch No", width: 150 },
        { field: "manufacturer", headerName: "Manufacturer", width: 150 },
        { field: "category", headerName: "Category", width: 150 },
        { field: "unitcost", headerName: "Unit Cost", width: 150 },
        { field: "totalquantity", headerName: "Total Quantity", width: 150 },
        { field: "gst", headerName: "GST%", width: 150 },
        { field: "grandtotal", headerName: "Grand Total", width: 150 },
        { field: "emergencytype", headerName: "Emergency Type", width: 150 },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const getbufferdata = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}stocks/buffervalue/details/hospital/${hospitalid}`,
      );

      // Create rows from stocks and set them in the state
      const newRows = data.map((stock) => ({
        _id: stock._id,
        name: stock.productDetails.name,
        producttype: stock.productDetails.producttype,
        batchno: stock.batchno,
        manufacturer: stock.productDetails.manufacturer,
        category: stock.productDetails.category,
        unitcost: stock.unitcost,
        totalquantity: stock.totalquantity,
        emergencytype: stock.productDetails.emergencytype,
      }));

      setRows(newRows);
      setColumns([
        { field: "name", headerName: "Product Name", width: 150 },
        { field: "producttype", headerName: "Type", width: 150 },
        { field: "batchno", headerName: "Batch No", width: 150 },
        { field: "manufacturer", headerName: "Manufacturer", width: 150 },
        { field: "category", headerName: "Category", width: 150 },
        { field: "unitcost", headerName: "Unit Cost", width: 150 },
        { field: "totalquantity", headerName: "Total Quantity", width: 150 },
        { field: "emergencytype", headerName: "Emergency Type", width: 150 },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const getoutdata = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks/outvalue/details/hospital/${hospitalid}`;
      const { data } = await axios.get(url);

      // Create rows from stocks and set them in the state
      const newRows = data.map((stock) => ({
        _id: stock._id,
        name: stock.productDetails.name,
        producttype: stock.productDetails.producttype,
        batchno: stock.batchno,
        manufacturer: stock.productDetails.manufacturer,
        category: stock.productDetails.category,
        unitcost: stock.unitcost,
        emergencytype: stock.productDetails.emergencytype,
      }));

      setRows(newRows);
      setColumns([
        { field: "name", headerName: "Product Name", width: 150 },
        { field: "producttype", headerName: "Type", width: 150 },
        { field: "batchno", headerName: "Batch No", width: 150 },
        { field: "manufacturer", headerName: "Manufacturer", width: 150 },
        { field: "category", headerName: "Category", width: 150 },
        { field: "unitcost", headerName: "Unit Cost", width: 150 },
        { field: "emergencytype", headerName: "Emergency Type", width: 150 },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    gethospital();
  }, []);

  // Function to switch active table
  const handleButtonClick = (tableName) => {
    // Ensure you reset columns and rows before updating
    setRows([]);
    setColumns([]);
    setActiveTable(tableName);
  };

  //const [rows, setRows] = React.useState(data); //Process data without $oid
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [count, setCount] = React.useState(0);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(
      rows.map((row) => (row._id.$oid === newRow._id.$oid ? updatedRow : row)),
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleColumnClick = (event) => {
    setColumnAnchorEl(event.currentTarget);
  };

  const handleColumnClose = () => {
    setColumnAnchorEl(null);
  };

  const onRowsSelectionHandler = (id) => {
    const selectedIDs = new Set(id);
    const selectedRowsData = id.map((id) => rows.find((row) => row._id === id));
    setCount(selectedIDs);
  };
  const handleCSVExport = () => {
    if (count.size !== 0) {
      const selectedData = Array.from(count)
        .map((id) => {
          const row = rows.find((r) => r._id === id);
          if (row) {
            return [
              row.date,
              row.producttype,
              row.name,
              row.category,
              row.manufacturer,
              row.origin,
              row.subcategory,
              row.emergencytype,
            ];
          }
          return null;
        })
        .filter((item) => item !== null);

      // Now you can export `selectedData` to CSV
      console.log("Exporting the following data to CSV:", selectedData);
    } else {
      setShowAlertDialog(true);
      setAlertText("No rows selected for export.");
      // alert("No rows selected for export.");
    }
  };

  // toggle for column visibility
  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handlePrint = () => {
    switch (activeTable) {
      case "table1":
        if (count.size !== 0) {
          const selectedData = [];
          for (const entry of count.values()) {
            const row = rows.find((r) => r._id === entry);
            if (row) {
              selectedData.push([
                row.date,
                row.producttype,
                row.name,
                row.category,
                row.manufacturer,
                row.origin,
                row.subcategory,
                row.emergencytype,
              ]);
            }
          }

          const doc = new jsPDF();

          // Add the logo and header
          doc.addImage(logo, "PNG", 5, 5, 0, 10);
          doc.setFontSize(18);
          doc.setFont("helvetica", "bold");
          doc.text("Product Report", 70, 20);
          doc.setFontSize(12);

          // Issued to section
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.text("Issued to:", 14, 60);
          doc.setFontSize(11);
          doc.setFont("helvetica", "normal");
          doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 66);
          doc.text(`Hospital Name: ${hospitalName}`, 14, 70);

          // Total Products header
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.text("Total Products", 14, 80);

          // Add the table
          doc.autoTable({
            startY: 85,
            head: [
              [
                "Date",
                "Product Type",
                "Product Name",
                "Category",
                "Manufacturer",
                "Origin",
                "Sub Category",
                "Emergency Type",
              ],
            ],
            body: selectedData,
            theme: "grid",
            headStyles: {
              fillColor: [22, 160, 133],
              textColor: 255,
              fontSize: 10,
            },
            bodyStyles: { fontSize: 9 },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            styles: { cellPadding: 3 },
          });

          // Add footer
          doc.setFontSize(10);
          doc.setFont("helvetica", "italic");
          doc.text("semamart.com", 14, doc.internal.pageSize.height - 10);
          doc.text(
            "contact@semamart.com",
            60,
            doc.internal.pageSize.height - 10,
          );

          doc.save("ProductReport.pdf");
        } else {
          setShowAlertDialog(true);
          setAlertText("Please Select The Rows To Generate PDF");
          // alert("Please Select The Rows To Generate PDF");
        }
        break;
      case "table2":
        if (count.size !== 0) {
          const selectedData = [];
          for (const entry of count.values()) {
            const row = rows.find((r) => r._id === entry);
            if (row) {
              selectedData.push([
                row.name,
                row.producttype,
                row.batchno,
                row.manufacturer,
                row.category,
                row.unitcost,
                row.totalquantity,
                row.gst,
                row.grandtotal,
                row.emergencytype,
              ]);
            }
          }

          const doc = new jsPDF();

          // Add the logo and header
          doc.addImage(logo, "PNG", 5, 5, 0, 10);
          doc.setFontSize(18);
          doc.setFont("helvetica", "bold");
          doc.text("Product Report", 70, 20);
          doc.setFontSize(12);

          // Issued to section
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.text("Issued to:", 14, 60);
          doc.setFontSize(11);
          doc.setFont("helvetica", "normal");
          doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 66);
          doc.text(`Hospital Name: ${hospitalName}`, 14, 70);

          // Total Products header
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.text("Avalaible Stocks", 14, 80);

          // Add the table
          doc.autoTable({
            startY: 85,
            head: [
              [
                "Product Name",
                "Product Type",
                "Batch No",
                "Manufacturer",
                "Category",
                "Unit Cost",
                "Total Quantity",
                "GST Slab",
                "Grand Total",
                "Emergency Type",
              ],
            ],
            body: selectedData,
            theme: "grid",
            headStyles: {
              fillColor: [22, 160, 133],
              textColor: 255,
              fontSize: 10,
            },
            bodyStyles: { fontSize: 9 },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            styles: { cellPadding: 3 },
          });

          // Add footer
          doc.setFontSize(10);
          doc.setFont("helvetica", "italic");
          doc.text("semamart.com", 14, doc.internal.pageSize.height - 10);
          doc.text(
            "contact@semamart.com",
            60,
            doc.internal.pageSize.height - 10,
          );

          doc.save("ProductReport.pdf");
        } else {
          setShowAlertDialog(true);
          setAlertText("Please Select The Rows To Generate PDF");
          // alert("Please Select The Rows To Generate PDF");
        }
        break;
      case "table3":
        if (count.size !== 0) {
          const selectedData = [];
          for (const entry of count.values()) {
            const row = rows.find((r) => r._id === entry);
            if (row) {
              selectedData.push([
                row.name,
                row.producttype,
                row.batchno,
                row.manufacturer,
                row.category,

                row.unitcost,
                row.totalquantity,
                row.emergencytype,
              ]);
            }
          }

          const doc = new jsPDF();

          // Add the logo and header
          doc.addImage(logo, "PNG", 5, 5, 0, 10);
          doc.setFontSize(18);
          doc.setFont("helvetica", "bold");
          doc.text("Product Report", 70, 20);
          doc.setFontSize(12);

          // Issued to section
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.text("Issued to:", 14, 60);
          doc.setFontSize(11);
          doc.setFont("helvetica", "normal");
          doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 66);
          doc.text(`Hospital Name: ${hospitalName}`, 14, 70);

          // Total Products header
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.text("Buffer Products", 14, 80);

          // Add the table
          doc.autoTable({
            startY: 85,
            head: [
              [
                "Product Name",
                "Product Type",
                "Batch No",
                "Manufacturer",
                "Category",
                "Unit Cost",
                "Total Quantity",
                "Emergency Type",
              ],
            ],
            body: selectedData,
            theme: "grid",
            headStyles: {
              fillColor: [22, 160, 133],
              textColor: 255,
              fontSize: 10,
            },
            bodyStyles: { fontSize: 9 },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            styles: { cellPadding: 3 },
          });

          // Add footer
          doc.setFontSize(10);
          doc.setFont("helvetica", "italic");
          doc.text("semamart.com", 14, doc.internal.pageSize.height - 10);
          doc.text(
            "contact@semamart.com",
            60,
            doc.internal.pageSize.height - 10,
          );

          doc.save("ProductReport.pdf");
        } else {
          setShowAlertDialog(true);
          setAlertText("Please Select The Rows To Generate PDF");
          // alert("Please Select The Rows To Generate PDF");
        }
        break;
      case "table4":
        if (count.size !== 0) {
          const selectedData = [];
          for (const entry of count.values()) {
            const row = rows.find((r) => r._id === entry);
            if (row) {
              selectedData.push([
                row.name,
                row.producttype,
                row.batchno,
                row.manufacturer,
                row.category,
                row.unitcost,
                row.emergencytype,
              ]);
            }
          }

          const doc = new jsPDF();

          // Add the logo and header
          doc.addImage(logo, "PNG", 5, 5, 0, 10);
          doc.setFontSize(18);
          doc.setFont("helvetica", "bold");
          doc.text("Stock Out Report", 70, 20);
          doc.setFontSize(12);

          // Issued to section
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.text("Issued to:", 14, 60);
          doc.setFontSize(11);
          doc.setFont("helvetica", "normal");
          doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 66);
          doc.text(`Hospital Name: ${hospitalName}`, 14, 70);

          // Total Products header
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.text("Total Products", 14, 80);

          // Add the table
          doc.autoTable({
            startY: 85,
            head: [
              [
                "Product Name",
                "Product Type",
                "Batch No",
                "Manufacturer",
                "Category",
                "Unit Cost",
                "Emergency Type",
              ],
            ],
            body: selectedData,
            theme: "grid",
            headStyles: {
              fillColor: [22, 160, 133],
              textColor: 255,
              fontSize: 10,
            },
            bodyStyles: { fontSize: 9 },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            styles: { cellPadding: 3 },
          });

          // Add footer
          doc.setFontSize(10);
          doc.setFont("helvetica", "italic");
          doc.text("semamart.com", 14, doc.internal.pageSize.height - 10);
          doc.text(
            "contact@semamart.com",
            60,
            doc.internal.pageSize.height - 10,
          );

          doc.save("ProductReport.pdf");
        } else {
          setShowAlertDialog(true);
          setAlertText("Please Select The Rows To Generate PDF");
          // alert("Please Select The Rows To Generate PDF");
        }
        break;
      default:
        console.log("No tab selected");
    }
  };

  return (
    <main
      className="main-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#eeeee",
      }}
    >
      <AlertDialog
        open={showAlertDialog}
        onClose={() => setShowAlertDialog(false)}
        text={alertText}
      />
      <Box
        sx={{
          width: "90%",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          padding: "20px",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={2} justifyContent="flex-start">
            <Button
              variant="contained"
              onClick={() => handleButtonClick("table1")}
              style={{ padding: "10px 20px", backgroundColor: "#2E718A" }}
            >
              Total Product
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonClick("table2")}
              style={{ padding: "10px 20px", backgroundColor: "#2E718A" }}
            >
              Available Product
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonClick("table3")}
              style={{ padding: "10px 20px", backgroundColor: "#2E718A" }}
            >
              Buffer Stock
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonClick("table4")}
              style={{ padding: "10px 20px", backgroundColor: "#2E718A" }}
            >
              Stock Out
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonClick("table5")}
              style={{ padding: "10px 20px", backgroundColor: "#2E718A" }}
            >
              Issueds
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              style={{
                backgroundColor: "#2E718A",
                color: "#fff", // Ensure the text is readable
              }}
              variant="contained"
              onClick={handleColumnClick}
            >
              Filter Columns
            </Button>
            <Menu
              anchorEl={columnAnchorEl}
              keepMounted
              open={Boolean(columnAnchorEl)}
              onClose={handleColumnClose}
            >
              {columns.map((column) => (
                <MenuItem key={column.field}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={column.visible}
                        onChange={() => toggleColumnVisibility(column.field)}
                        color="primary"
                      />
                    }
                    label={column.headerName}
                  />
                </MenuItem>
              ))}
            </Menu>
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
              <MenuItem onClick={handlePrint}>PDF</MenuItem>
              <MenuItem onClick={handleCSVExport}>CSV</MenuItem>
            </Menu>
          </Stack>
        </Stack>

        <Box sx={{ height: "600", width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id}
            editMode="row"
            checkboxSelection
            onRowSelectionModelChange={(id) => onRowsSelectionHandler(id)}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            disableColumnMenu
            sx={{
              "& .MuiTablePagination-displayedRows": {
                marginTop: 0,
                marginBottom: 0,
              },
              "& .MuiTablePagination-selectLabel": {
                marginTop: 0,
                marginBottom: 0,
              },
            }}
          />
        </Box>
      </Box>
    </main>
  );
}
