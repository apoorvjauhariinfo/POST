import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import data from "./UserDataSource.json";
import { doc, jsPDF } from "jspdf";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import "../Dashboard/Dashboard.css";
import "../Dashboard/Components/home.css";

import AlertDialog from "../UI/AlertDialog";

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

export default function UserData() {
  const [rows, setRows] = React.useState(data); //Process data without $oid
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [count, setCount] = React.useState(0);

  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");

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
    setRows(
      rows.map((row) => (row._id.$oid === newRow._id.$oid ? updatedRow : row)),
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const onRowsSelectionHandler = (id) => {
    const selectedIDs = new Set(id);
    const selectedRowsData = id.map((id) => rows.find((row) => row.id === id));
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
          if (entry === jsonentry._id.$oid) {
            // pdftext += "Name is " + jsonentry.name + " " +
            // "Company Name is " + jsonentry.companyName + "" +
            // "From City " + jsonentry.city + "" +
            // "Whose contact is " + jsonentry.contactNumber;
          }
        }
      }
      const doc = new jsPDF({
        orientation: "vertical",
        textAlign: "center",
        compress: true,
      });
      doc.text("Your Selected Row IDs are ", 10, 10);
      if (pdftext != "") {
        doc.text(pdftext, 20, 20);
        doc.save("Invoice.pdf");
      } else {
        setShowAlertDialog(true);
        setAlertText("Please Select The Rows To Generate PDF");
        // alert("Please Select The Rows To Generate PDF")
      }
      window.location.reload(false);
    } else {
      setShowAlertDialog(true);
      setAlertText("Please Select The Rows To Generate PDF");
      alert("Please Select The Rows To Generate PDF");
    }
  };

  //Defining The columns from the JSON Object and include the Last two Buttons in that.
  const columns = [
    {
      field: "assignee",
      headerName: "Assignee",

      width: 200,

      editable: true,
    },
    {
      field: "name",
      headerName: "Name",

      width: 220,
      editable: true,
    },
    {
      field: "phoneno",
      headerName: "Phone No",

      width: 150,
      editable: true,
    },

    {
      field: "email",
      headerName: "Email Address",
      width: 200,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
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
        ];
      },
    },
  ];

  return (
    <main className="main-container">
      <AlertDialog
        onClose={() => setShowAlertDialog(false)}
        open={showAlertDialog}
        text={alertText}
      />
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
                  <br />

                  <br />
                  <div className="row mt-3"></div>
                  <br />
                  <br />
                  <div className="col">
                    <Button
                      color="primary"
                      startIcon={<BsFilter />}
                      variant="contained"
                      onClick={handlePrint}
                    >
                      Add User
                    </Button>
                  </div>

                  <br />
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row._id.$oid}
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
