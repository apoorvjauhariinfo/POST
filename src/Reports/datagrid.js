import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import data from './DataSource.json';
import Header from '../Dashboard/Components/header';
import Sidebar from '../Dashboard/Components/sidebar';
import { doc, jsPDF } from 'jspdf';
import { useState } from 'react'

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

//Random Row Details Generator
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { Checkbox } from '@mui/material';

//Roles Array from which Randomly Generate Roles
const roles = ['Market', 'Finance', 'Development'];
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
    setRows((oldRows) => [...oldRows, { id, name: 'Name?', companyName: 'Company Name?', type: 'Select', email: 'Your Email', city: 'Select', state: 'Select', contactNumber: 'Your Phone', gstNumber: 'GST No', productType: 'Select', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };




  //AddRecord Button
  return (
    <div className='center'>
    <GridToolbarContainer > 
      <Button color="primary" startIcon={<AddIcon />} variant='outlined' onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
    </div>
  );
}

export default function FullFeaturedCrudGrid() {

  const [rows, setRows] = React.useState(data); //Process data without $oid
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

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row._id.$oid !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id.$oid === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id.$oid !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row._id.$oid === newRow._id.$oid ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const onRowsSelectionHandler = (id) => {
    const selectedIDs = new Set(id);
    const selectedRowsData = id.map((id) => rows.find((row) => row.id === id));
    setCount(selectedIDs)
  };
 //On selection We Get The Row Data //Print Button
  const handlePrint = () => {
    console.log(count)
   if (count.valueOf(0) !== 0) {
    console.log(count)
      const myIterator = count.values();
      let pdftext = "";
      for (const entry of myIterator) {

        for (var jsonentry of data) {
          pdftext += "\n"
          if (entry === jsonentry._id.$oid) {
            pdftext += "Name is " + jsonentry.name + " " +
              "Company Name is " + jsonentry.companyName + "" +
              "From City " + jsonentry.city + "" +
              "Whose contact is " + jsonentry.contactNumber;
          }
        }
      }
      const doc = new jsPDF({ orientation: "vertical", textAlign: "center" });
    doc.text('Your Selected Row IDs are ', 10, 10);
    if(pdftext != ''){
    doc.text(pdftext, 20, 20)
    doc.save("Invoice.pdf");}
    else{ alert("Please Select The Rows To Generate PDF")}
    window.location.reload(false)
  }
    else{
      alert("Please Select The Rows To Generate PDF")
      
    }
    
  };
  



  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  //Defining The columns from the JSON Object and include the Last two Buttons in that.
  const columns = [

    {
      field: 'name', headerName: 'Name', width: 150, align: 'left',
      headerAlign: 'left', editable: true
    },
    {
      field: 'companyName',
      headerName: 'Company Name',

      width: 200,

      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',

      width: 150,
      editable: true,
    },

    {
      field: 'type',
      headerName: 'Supplier Type',
      width: 100,
      editable: true,

    },
    {
      field: 'city',
      headerName: 'City',
      width: 100,
      editable: true,

    },
    {
      field: 'state',
      headerName: 'State',
      width: 100,
      editable: true,

    },
    {
      field: 'contactNumber',
      headerName: 'Contact',
      width: 100,
      editable: true,


    },
    {
      field: 'gstNumber',
      headerName: 'GST No',
      width: 100,
      editable: true,


    },
    {
      field: 'productType',
      headerName: 'Product Type',
      width: 100,
      editable: true,

    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;


        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)} />
            ,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />

        ];
      },
    },
  ];

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <Box
          sx={{
            height: 600,
            width: '100%',
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}

        >
          <DataGrid
            rows={rows}
            columns={columns}

            getRowId={(row) => row._id.$oid}
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
            }} />
          <Button variant='contained' align='center' startIcon={<SaveIcon />} onClick={handlePrint}>
            Print Invoice
          </Button>
        </Box>

      </main>


    </div>


  );

}