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
import Card from "@mui/material/Card";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FormControl, Select } from "@mui/material";

import axios from "axios";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FiDownload } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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
import { useState } from "react";

const hospitalid = localStorage.getItem("hospitalid");

// Roles Array from which Randomly Generate Roles
const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

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
  const [productNames, setProductNames] = React.useState([]);
  const [history, setHistory] = React.useState([]);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [selectedProductName, setSelectedProductName] = React.useState("");
  const [selectedProductId, setSelectedProductId] = React.useState("");

  const [activeTable, setActiveTable] = React.useState("table1");

  // Add a new function to fetch product names
  const getProductNames = async () => {
    // Fetch product names and ids from the API
    const url = `${process.env.REACT_APP_BASE_URL}productsdata/${hospitalid}`;
    const { data } = await axios.get(url);

    // Map to an array of objects with name and _id, then sort alphabetically by name
    const sortedProducts = data.documents
      .map((product) => ({ name: product.name, _id: product._id }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return sortedProducts;
  };
  const getHistoryData = async (productId) => {
    const url = `${process.env.REACT_APP_BASE_URL}historybyproductid/${productId}`;
    const { data } = await axios.get(url);
    const sortedHistory = data.documents;

    // Add additional data extraction logic here
    sortedHistory.forEach((historyItem) => {
      // Extract additional data from historyItem
      const additionalData = {
        // Example: Extract quantity and price
        action: historyItem.type,
        quantity: historyItem.quantity,
      };

      // Add the additional data to the historyItem
      Object.assign(historyItem, additionalData);
    });

    setHistory(sortedHistory);
  };
  // Handle dropdown selection and pass the selected product's _id
  const handleProductNameChange = (event) => {
    const selectedProductName = event.target.value;
    const selectedProduct = productNames.find(
      (product) => product.name === selectedProductName,
    );
    setSelectedProductName(selectedProductName);
    if (selectedProduct) {
      setSelectedProductId(selectedProduct._id);

      // Pass the _id to the function as needed
      //handleProductSelection(selectedProduct._id);
    }
  };

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
    } else if (activeTable === "table5") {
      getissued();
    } else if (activeTable === "table6") {
      getProductNames().then((sortedProducts) => {
        // Set the sorted product names and ids as the options for the dropdown
        setProductNames(sortedProducts);
      });
    }
  }, [activeTable]);
  React.useEffect(() => {
    if (selectedProductId) {
      console.log(selectedProductId);
      getHistoryData(selectedProductId);
    }
  }, [selectedProductId]);
  React.useEffect(() => {
    if (history) {
      console.log(history.length);
      generateTableRows();
    }
  }, [history]);

  //for column filter fuctionality
  const [visibleColumns, setVisibleColumns] = React.useState({
    date: true,
    name: true,
    producttype: true,
    category: true,
    subcategory: true,
    upccode: true,
    manufacturer: true,
    origin: true,
    emergencytype: true,
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
      // console.log(data)
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
      setVisibleColumns({
        date: true,
        name: true,
        producttype: true,
        category: true,
        subcategory: true,
        upccode: true,
        manufacturer: true,
        origin: true,
        emergencytype: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Avalaible Products
  const getavaildata = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}aggregatedstocks/${hospitalid}`;
      const { data } = await axios.get(url);
      console.log(data);
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
      setVisibleColumns({
        name: true,
        producttype: true,
        batchno: true,
        manufacturer: true,
        category: true,
        unitcost: true,
        totalquantity: true,
        gst: true,
        grandtotal: true,
        emergencytype: true,
      });
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
      setVisibleColumns({
        name: true,
        producttype: true,
        batchno: true,
        manufacturer: true,
        category: true,
        unitcost: true,
        totalquantity: true,
        emergencytype: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getoutdata = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks/outvalue/details/hospital/${hospitalid}`;
      const { data } = await axios.get(url);
      console.log(data);
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
      setVisibleColumns({
        name: true,
        producttype: true,
        batchno: true,
        manufacturer: true,
        category: true,
        unitcost: true,
        // totalquantity:true,
        emergencytype: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getissued = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}aggregatedissueds/${hospitalid}`;
      const { data } = await axios.get(url);

      // Create rows from stocks and set them in the state
      const newRows = data.documents.map((stock) => ({
        _id: stock._id,
        name: stock.firstname + " " + stock.lastname,
        department: stock.department,
        subdepartment: stock.subdepartment,
        quantityissued: stock.quantityissued,
        productname: stock.productDetails.name,
        category: stock.productDetails.category,
        manufacturer: stock.productDetails.manufacturer,
        emergencytype: stock.productDetails.emergencytype,
      }));

      setRows(newRows);
      setColumns([
        { field: "name", headerName: "Product Name", width: 150 },
        { field: "department", headerName: "Scope", width: 150 },
        { field: "subdepartment", headerName: "Department", width: 150 },
        { field: "quantityissued", headerName: "Issued Quantity", width: 150 },
        { field: "productname", headerName: "Product Name", width: 150 },
        { field: "category", headerName: "Category", width: 150 },
        { field: "manufacturer", headerName: "Manufacturer", width: 150 },
        { field: "emergencytype", headerName: "Emergency Type", width: 150 },
      ]);
      setVisibleColumns({
        name: true,
        department: true,
        subdepartment: true,
        quantityissued: true,
        productname: true,
        category: true,
        manufacturer: true,
        emergencytype: true,
      });
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

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertText, setAlertText] = useState("");

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
          alert("Please Select The Rows To Generate PDF");
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
          alert("Please Select The Rows To Generate PDF");
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
          alert("Please Select The Rows To Generate PDF");
        }
        break;
      case "table5":
        if (count.size !== 0) {
          const selectedData = [];
          for (const entry of count.values()) {
            const row = rows.find((r) => r._id === entry);
            if (row) {
              selectedData.push([
                row.name,
                row.department,
                row.subdepartment,
                row.quantityissued,
                row.productname,
                row.category,
                row.manufacturer,
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
          doc.text("Issueds Records", 14, 80);

          // Add the table
          doc.autoTable({
            startY: 85,
            head: [
              [
                "Person Name",
                "Scope",
                "Department",
                "Issued Quantity",
                "Product Name",
                "Category",
                "Manufacturer",
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
          alert("Please Select The Rows To Generate PDF");
        }
        break;

      default:
        console.log("No tab selected");
    }
  };

  //Styling of button on tab select
  const buttonStyle = (table) => ({
    padding: "10px 20px",
    backgroundColor: activeTable === table ? "#FFFFFF" : "#2E718A",
    color: activeTable === table ? "#000000" : "#FFFFFF", // Optional: Change text color to black when active
  });

  // toggle for column visibility
  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const columns1 = columns
    .filter(
      (col) =>
        visibleColumns[col.field] && (col.isIManager ? isIManager : true),
    )
    .map((col) => ({
      ...col,
      headerAlign: col.headerAlign || "center",
      width: col.width || 150,
      align: col.align || "center",
      editable: col.editable !== undefined ? col.editable : true,
    }));

  const generateTableRows = () => {
    const rows = [];
    let firstStockEntry = true;

    let currentRow = {
      stockEntry: { date: "", quantity: "" },
      bufferStock: { date: "", quantity: "" },
      stockOut: { date: "" },
      stockOrderPlaced: { date: "", quantity: "" },
    };

    history.forEach((entry) => {
      let rowComplete = true;

      if (entry.type === "Stock Entry" && !currentRow.stockEntry.date) {
        currentRow.stockEntry.date = new Date(entry.date).toLocaleDateString();
        currentRow.stockEntry.quantity = entry.quantity;
        rowComplete = false;
      }
      if (entry.quantity < 15 && !currentRow.bufferStock.date) {
        currentRow.bufferStock.date = new Date(entry.date).toLocaleDateString();
        currentRow.bufferStock.quantity = entry.quantity;
        rowComplete = false;
      }
      if (entry.quantity === 0 && !currentRow.stockOut.date) {
        currentRow.stockOut.date = new Date(entry.date).toLocaleDateString();
        rowComplete = false;
      }
      if (entry.type === "Order" && !currentRow.stockOrderPlaced.date) {
        currentRow.stockOrderPlaced.date = new Date(
          entry.date,
        ).toLocaleDateString();
        currentRow.stockOrderPlaced.quantity = entry.quantity;
        rowComplete = false;
      }

      if (rowComplete) {
        rows.push({ ...currentRow });
        currentRow = {
          stockEntry: { date: "", quantity: "" },
          bufferStock: { date: "", quantity: "" },
          stockOut: { date: "" },
          stockOrderPlaced: { date: "", quantity: "" },
        };
      }
    });

    // Push the last row if not added
    if (
      currentRow.stockEntry.date ||
      currentRow.bufferStock.date ||
      currentRow.stockOut.date ||
      currentRow.stockOrderPlaced.date
    ) {
      rows.push(currentRow);
    }

    return rows;
  };

  const newrows = generateTableRows();

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
              style={buttonStyle("table1")}
            >
              Total Product
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonClick("table2")}
              style={buttonStyle("table2")}
            >
              Available Product
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonClick("table3")}
              style={buttonStyle("table3")}
            >
              Buffer Stock
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonClick("table4")}
              style={buttonStyle("table4")}
            >
              Stock Out
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonClick("table5")}
              style={buttonStyle("table5")}
            >
              Stock Issue
            </Button>
            {/* <Button
              variant="contained"
              onClick={() => handleButtonClick('table6')}
              style={buttonStyle('table6')}
            >
              Analytics
            </Button> */}
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
                        checked={visibleColumns[column.field]}
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
              disabled={count === 0} // Disable the button if count is 0
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
        {activeTable != "table6" && (
          <Box sx={{ height: "600", width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={rows}
              columns={columns1}
              getRowId={(row) => row._id}
              editMode="row"
              checkboxSelection
              onRowSelectionModelChange={(id) => onRowsSelectionHandler(id)}
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
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
        )}
        {activeTable === "table6" && (
          <Box
            sx={{
              height: "600px",
              width: "100%",
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormControl>
              <Select
                value={selectedProductName}
                onChange={handleProductNameChange}
                disabled={activeTable !== "table6"} // Disable if not on the "History" tab
                displayEmpty
                renderValue={(value) => value || <em>Choose Your Product</em>} // Show placeholder text when no value is selected
              >
                <MenuItem disabled value="">
                  <em>Choose Your Product</em>
                </MenuItem>
                {productNames.map((product) => (
                  <MenuItem key={product._id} value={product.name}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {history.length > 0 && (
              <Box sx={{ marginTop: "20px", width: "100%" }}>
                <h3 style={{ textAlign: "center" }}>Product History</h3>

                <Paper>
                  <Table
                    sx={{ minWidth: 650, borderCollapse: "collapse" }}
                    aria-label="product history table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={2}
                          sx={{
                            borderRight: "2px solid #000",
                            borderBottom: "2px solid #000",
                            borderTop: "2px solid #000",
                            borderLeft: "2px solid #000",
                          }}
                        >
                          <strong>Stock Entry</strong>
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={2}
                          sx={{
                            borderRight: "2px solid #000",
                            borderBottom: "2px solid #000",
                            borderTop: "2px solid #000",
                          }}
                        >
                          <strong>Buffer Stock</strong>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            borderRight: "2px solid #000",
                            borderBottom: "2px solid #000",
                            borderTop: "2px solid #000",
                          }}
                        >
                          <strong>Stock Out</strong>
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={2}
                          sx={{
                            borderRight: "2px solid #000",
                            borderBottom: "2px solid #000",
                            borderTop: "2px solid #000",
                          }}
                        >
                          <strong>Stock Order Placed</strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #ddd" }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #ddd" }}
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #ddd" }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #ddd" }}
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #ddd" }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #ddd" }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #ddd" }}
                        >
                          Quantity
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {newrows.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell
                            align="center"
                            sx={{ borderRight: "1px solid #ddd" }}
                          >
                            {row.stockEntry.date}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ borderRight: "1px solid #ddd" }}
                          >
                            {row.stockEntry.quantity}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ borderRight: "1px solid #ddd" }}
                          >
                            {row.bufferStock.date}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ borderRight: "1px solid #ddd" }}
                          >
                            {row.bufferStock.quantity}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ borderRight: "1px solid #ddd" }}
                          >
                            {row.stockOut.date}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ borderRight: "1px solid #ddd" }}
                          >
                            {row.stockOrderPlaced.date}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ borderRight: "1px solid #ddd" }}
                          >
                            {row.stockOrderPlaced.quantity}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </main>
  );
}
