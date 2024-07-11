import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import data from "./DataSource.json";
import { doc, jsPDF } from "jspdf";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import "../Dashboard/Dashboard.css";
import "../Dashboard/Components/home.css";
import axios from "axios";
import Axios from "axios";

import Typography from "@mui/material";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridFilterAltIcon,
} from "@mui/x-data-grid";

//Random Row Details Generator
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { Checkbox } from "@mui/material";
import { BsFilter } from "react-icons/bs";

const hospitalid = localStorage.getItem("hospitalid");


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
  const handleClick = () => {
    const id = randomId(); // ID to be introduced here for New Record
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
  const [rows, setRows] = React.useState(data);
  const [stockid, setStockId] = React.useState();
  const [issueid, setIssueId] = React.useState();
 
  const getprod = async () => {
    try {
      const hospitalid = localStorage.getItem("hospitalid");

      let newrows = [];

      const url = `${process.env.REACT_APP_BASE_URL}productbyhospitalid/${hospitalid}`;

      const { data } = await axios.get(url);
      const products = data.products[0]._id;
      console.log("Products are "+products+ data.products[0].name);
      for (let i = 0; i < data.products.length; i++) {
        
          newrows.push(data.products[i]);
        
      }
      setRows(newrows);
    } catch (error) {
      console.log(error);
    }
  };
  getprod();
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
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const deletestock = async (stockid) => {
    console.log("stockidis:"+stockid)
  
   
    const stockresponse = await Axios.delete(
       `${process.env.REACT_APP_BASE_URL}deletestock/${stockid.toString()}`
    );

   

     console.log(stockresponse);
    
  };
  const deleteissue = async (issueid) => {
    console.log("issuedidis"+issueid);
    
    
   
    const issuedresponse = await Axios.delete(
      `${process.env.REACT_APP_BASE_URL}deleteissued/${issueid.toString()}`
    );
   

    console.log(issuedresponse);
    
  };

  const handleDeleteClick = (id) => () => {
    alert("Are you sure you want to delete this product?");
    

    

    //Add API call to delete record here
    //Find Stock Id and Issue Id related to product 
    try{
      const findstock = async() => {
        console.log("productidis"+ id);
        const stockresponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}stocks/`
        );
       
        console.log("Stock: ", stockresponse.data.document);
        
        for(let i = 0; i < stockresponse.data.document.length; i++) {
          if(stockresponse.data.document[i].productid == id){
            const stockId = stockresponse.data.document[i]._id;
            deletestock(stockId);
            console.log("stockid is "+stockId);
            setStockId(stockId);
            return stockId;

          }
        }
       
      }
        
     findstock();
    
    } catch (error) {
      alert("Error finding stock");
      console.error("Error finding stock:", error);
    }
    try{
      const findissue = async() => {
        console.log("productidis"+ id);
        const issueresponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}issueds/`
        );
       
        console.log("Issue: ", issueresponse.data.document);
        
        for(let i = 0; i < issueresponse.data.document.length; i++) {
          if(issueresponse.data.document[i].productid == id){
            const issueId = issueresponse.data.document[i]._id;
            deleteissue(issueId);
            console.log("issueid is "+issueId);
            setIssueId(issueId);
            return issueId;

          }
        }
       
      }
        
     findissue();
    
    } catch (error) {
      alert("Error finding issue");
      console.error("Error finding issue:", error);
    }
  


    //Deleting The Product
    try {
      
      const deleteproduct = async () => {
        console.log("productidis"+ id);
        const response = await Axios.delete(
          `${process.env.REACT_APP_BASE_URL}deleteproduct/${id.toString()}`
        );
       
        // const stockresponse = await Axios.delete(
        //    `${process.env.REACT_APP_BASE_URL}deletestock/${stockid.toString()}`
        // );
        
       
        // const issuedresponse = await Axios.delete(
        //   `${process.env.REACT_APP_BASE_URL}deleteissued/${issueid.toString()}`
        // );
       

         console.log(response);
        
      };
     
   
      // deletestock(stockid);
      // deleteissue(issueid);
      deleteproduct();
    } catch (error) {
      alert("Error deleting product");
      console.error("Error deleting product:", error);
    }
     //Remove the row from the data source
     const updatedRow = processRowUpdate({...rows.find((row) => row._id === id), isDeleted: true });
     setRows(rows.filter((row) => row._id!== id));
     console.log(updatedRow);

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
  const onRowsSelectionHandler = (id) => {
    const selectedIDs = new Set(id);
    const selectedRowsData = id.map((id) => rows.find((row) => row._id === id));
    setCount(selectedIDs);
  };
  //On selection We Get The Row Data //Print Button
  const handlePrint = () => {
    console.log(count);
    if (count.valueOf(0) !== 0) {
      console.log(count);
      const myIterator = count.values();
      let pdftext = "";
      for (const entry of myIterator) {
        for (var jsonentry of data) {
          pdftext += "\n";
          if (entry === jsonentry._id) {
            // pdftext += "Name is " + jsonentry.name + " " +
            // "Company Name is " + jsonentry.companyName + "" +
            // "From City " + jsonentry.city + "" +
            // "Whose contact is " + jsonentry.contactNumber;
          }
        }
      }
      const doc = new jsPDF({ orientation: "vertical", textAlign: "center" });
      doc.text("Your Selected Row IDs are ", 10, 10);
      if (pdftext != "") {
        doc.text(pdftext, 20, 20);
        doc.save("Invoice.pdf");
      } else {
        alert("Please Select The Rows To Generate PDF");
      }
      window.location.reload(false);
    } else {
      alert("Please Select The Rows To Generate PDF");
    }
  };

  //Defining The columns from the JSON Object and include the Last two Buttons in that.
  const columns = [
    {
      field: "producttype",
      headerName: "Product Type",
      headerAlign: "left",
      width: 150,
      align: "left",

      editable: true,
    },
    {
      field: "name",
      headerName: "Product Name",

      width: 200,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",

      width: 120,
      editable: true,
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",

      width: 150,
      editable: true,
    },
    {
      field: "origin",
      headerName: "Origin",

      width: 150,
      editable: true,
    },

    {
      field: "subcategory",
      headerName: "Sub Category",
      width: 150,
      editable: true,
    },
    {
      field: "emergencytype",
      headerName: "Emergency Type",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      align: "center",
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            color="primary"
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
      ),
    },
  ];

  return (
    <main className="main-container">
      <div>
        <section
          class="p-5 w-100"
          style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
        >
          <div class="row">
            <div class="col">
              <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-3"></div>
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    "& .actions": {
                      color: "text.secondary",
                    },
                    "& .textPrimary": {
                      color: "text.primary",
                    },
                  }}
                >
                  <div className="row mt-3">
                    <div className="col">
                      <Stack direction="row" spacing={5}>
                        <h4>Total Products</h4>
                      </Stack>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="col">
                   

                    {/* <Button
                      color="primary"
                      startIcon={<SaveIcon />}
                      variant="contained"
                      
                      onClick={handlePrint}
                    >
                      Export To PDF
                    </Button> */}
                  </div>

                  <br />
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row: any) => row._id}
                    editMode="row"
                    checkboxSelection
                    onRowSelectionModelChange={(id) =>
                      onRowsSelectionHandler(id)
                    }
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
                  />
                </Box>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
