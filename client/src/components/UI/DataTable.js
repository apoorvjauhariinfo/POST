import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function DataTable({
  rows,
  columns,
  rowModesModel,
  onRowModesModelChange,
  onRowEditStop,
  processRowUpdate,
  // EditToolbar,
  // setRowModesModel,
  // setRows,
  onRowsSelectionHandler,
  whichPage,
}) {
  const navigate = useNavigate();

  function onCellClick(params) {
    if (params.field === "name") {
      if (whichPage === "avail") {
        navigate("/viewproductdetails/avail/" + params.row.productid);
      } else if (whichPage === "buffer") {
        navigate("/viewproductdetails/buff/" + params.row.productid);
      } else if (whichPage === "stockout") {
        navigate("/viewproductdetails/stockout/" + params.row.productid);
      } else if (whichPage === "entry") {
        navigate("/viewproductdetails/stockentry/" + params.row.productid);
      } else if (whichPage === "issue") {
        navigate("/viewproductdetails/stockissue/" + params.row.productid);
      }
    }
  }

  return (
    <Box sx={{ height: 700, width: "100%", marginTop: "20px" }}>
      <DataGrid
        onCellClick={(p) => onCellClick(p)}
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        editMode="row"
        checkboxSelection
        onRowSelectionModelChange={(id) => onRowsSelectionHandler(id)}
        rowModesModel={rowModesModel}
        onRowModesModelChange={onRowModesModelChange}
        onRowEditStop={onRowEditStop}
        processRowUpdate={processRowUpdate}
        // slots={{
        //   toolbar: EditToolbar,
        // }}
        // slotProps={{
        //   toolbar: { setRows, setRowModesModel },
        // }}
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
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            color: "#2E718A",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cellContent": {
            color: "black",
          },
        }}
      />
    </Box>
  );
}

export function TableFilterBtn({
  anchorEl,
  onClose,
  onClick,
  columnDefinitions,
  visibleColumns,
  onChange,
}) {
  return (
    <>
      <Button
        style={{
          backgroundColor: "#2E718A",
          color: "#fff", // Ensure the text is readable
        }}
        variant="contained"
        onClick={onClick}
      >
        Filter Columns
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        {columnDefinitions.map((column) => (
          <MenuItem key={column.field}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={visibleColumns[column.field]}
                  onChange={() => onChange(column.field)}
                  color="primary"
                />
              }
              label={column.headerName}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
