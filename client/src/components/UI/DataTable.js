import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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
}) {
  return (
    <Box sx={{ height: 700, width: "100%", marginTop: "20px" }}>
      <DataGrid
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
