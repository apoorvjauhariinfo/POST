import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import data from "./DataSource.json";
import logo from '../assets/Semamart.png'; 
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

import {
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { FiDownload } from "react-icons/fi";

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

const hospitalid = localStorage.getItem("hospitalid");



//Roles Array from which Randomly Generate Roles
const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

//Add The required Information
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  //Function Not Working ((Later Add API to add new Record))
  //Function to add new Record
  const handleClick = () => { // ID to be introduced here for New Record
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
  const [hospitalName, setHospitalName] = React.useState(null);
  const [stockid, setStockId] = React.useState();
  const [issueid, setIssueId] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [columnAnchorEl, setColumnAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const isIManager = localStorage.getItem('inventorymanagerid');

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  
  //for column filter fuctionality
  const [visibleColumns, setVisibleColumns] = React.useState({
    date:true,
    producttype: true,
    name: true,
    category: true,
    manufacturer: true,
    origin: true,
    subcategory: true,
    emergencytype: true,
    actions: true,
  });

  
  
  const getprod = async () => {
    try {
      const hospitalid = localStorage.getItem("hospitalid");
      const url = `${process.env.REACT_APP_BASE_URL}productsdata/${hospitalid}`;
      const { data } = await axios.get(url);     
      setRows(data.documents);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getprod();
    }, []);

  //const [rows, setRows] = React.useState(data); //Process data without $oid
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [count, setCount] = React.useState(0);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    navigate(`/productedit`, { state: { id } });
  };

  const handleSaveClick = (id) => () => {
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const deletestock = async (stockid) => {
    console.log("stockidis:" + stockid);
    if (stockid != null) {
      const stockresponse = await Axios.delete(
        `${process.env.REACT_APP_BASE_URL}deletestock/${stockid.toString()}`
      );
      console.log(stockresponse);
    } else {
      console.log("No Stock Found");
    }
  };

  const deleteissue = async (issueid) => {
    console.log("issuedidis" + issueid);
    if (issueid != null) {
      const issuedresponse = await Axios.delete(
        `${process.env.REACT_APP_BASE_URL}deleteissued/${issueid.toString()}`
      );
      console.log(issuedresponse);
    } else {
      console.log("No Issued Found");
    }
  };

  const handleDeleteClick = (id) => () => {
    alert("Are you sure you want to delete this product & all stocks and issueds related to it?");
    const request = {
     
      userid: localStorage.getItem("id"),
      hospitalid: localStorage.getItem("hospitalid"),
      inventorymanagerid: localStorage.getItem("inventorymanagerid"),
      productid: id,
      demand: "delete",
      status: "pending",
      requestdate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
     
    };
    try {
      const postRequest = async () => {
        const response = await Axios.post(
          `${process.env.REACT_APP_BASE_URL}postrequests`,
          request
        );

        console.log(response);
      };
      postRequest();
    } catch (error) {
      alert("Error Posting Request");
      console.error("Error creating request:", error);
    }
    alert("Your Request is submitted successfully");



  }

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
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
    const selectedRowsData = id.map((id) =>
      rows.find((row) => row._id === id)
    );
    setCount(selectedIDs);
  };

  const handleCSVExport = () => {
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
  
      const csvContent = [
        ['Date','Product Type', 'Product Name', 'Category', 'Manufacturer', 'Origin', 'Sub Category', 'Emergency Type'], // headers
        ...selectedData,
      ]
        .map(e => e.join(','))
        .join('\n');
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${new Date().toLocaleDateString()}_Total_Product.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Please Select The Rows To Generate CSV');
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
      doc.addImage(logo, 'PNG', 5, 5, 0, 10);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Product Report', 70, 20);
      doc.setFontSize(12);
      
  
      // Issued to section
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Issued to:', 14, 60);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 66);
      doc.text(`Hospital Name: ${hospitalName}`, 14, 70);
  
      // Total Products header
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Total Products', 14, 80);
  
      // Add the table
      doc.autoTable({
        startY: 85,
        head: [
          [
            'Date',
            'Product Type',
            'Product Name',
            'Category',
            'Manufacturer',
            'Origin',
            'Sub Category',
            'Emergency Type',
          ],
        ],
        body: selectedData,
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133], textColor: 255, fontSize: 10 },
        bodyStyles: { fontSize: 9 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        styles: { cellPadding: 3 },
      });
  
      // Add footer
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text('semamart.com', 14, doc.internal.pageSize.height - 10);
      doc.text('contact@semamart.com', 60, doc.internal.pageSize.height - 10);
  
      doc.save('ProductReport.pdf');
    } else {
      alert('Please Select The Rows To Generate PDF');
    }
  };

  const columnDefinitions = [
    { field: "date", headerName: "Date", headerAlign: "left", width: 100, align: "left", editable: true },
    { field: "producttype", headerName: "Product Type", headerAlign: "left", width: 150, align: "left", editable: true },
    { field: "name", headerName: "Product Name", width: 200, editable: true },
    { field: "category", headerName: "Category", width: 120, editable: true },
    { field: "manufacturer", headerName: "Manufacturer", width: 150, editable: true },
    { field: "origin", headerName: "Origin", width: 150, editable: true },
    { field: "subcategory", headerName: "Sub Category", width: 150, editable: true },
    { field: "emergencytype", headerName: "Emergency Type", width: 150, editable: true },
    {  
      field: "actions", 
      headerName: "Actions", 
      width: 200, 
      align: "center",  
      isIManager: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            style={{ color: '#2E718A' }}
            size="small"
            startIcon={<EditIcon />}
            onClick={handleEditClick(params.row._id)}
          >
            Edit
          </Button>
          <Button
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick(params.row._id)}
          >
            Delete
          </Button>
        </Stack>
      )
    }
  ];

const columns = columnDefinitions
  .filter((col) => visibleColumns[col.field] && (col.isIManager ? isIManager : true)  )
  .map((col) => ({
    ...col,
    headerAlign: col.headerAlign || "left",
    width: col.width || 150,
    align: col.align || "left",
    editable: col.editable !== undefined ? col.editable : true,
  }));


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
  <Typography
  variant="h4"
  style={{
    marginBottom: '20px',
    fontSize: '2.5rem',       
    fontWeight: 'bold',      
    color: '#2E718A',         // Set the text color
    padding: '10px',          // Add padding
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)', // Add a subtle shadow
   
  }}
>
  Total Products
</Typography>
    <Box
      sx={{
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        padding: "20px",
      }}
    >
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
           style={{
            backgroundColor: '#2E718A',
            color: '#fff', // Ensure the text is readable
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
  {columnDefinitions.map((column) => (
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
            backgroundColor: '#2E718A',
            color: '#fff', // Ensure the text is readable
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
      <Box sx={{ height: 600, width: "100%", marginTop: "20px" }}>
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


