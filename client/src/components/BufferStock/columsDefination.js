import { Button } from "@mui/material";

const width = 200;
const inventoryManagerId = localStorage.getItem("inventorymanagerid");

export const columnDefinations = [
  ...(inventoryManagerId
    ? []
    : [
        {
          headerName: "INVENTORY MANAGER",
          width,
          align: "left",
          headerAlign: "left",
          field: "imname",
        },
      ]),
  {
    field: "name",
    headerName: "NAME",
    headerAlign: "left",
    width,
    align: "left",
    editable: true,
  },
  {
    field: "type",
    headerName: "TYPE",
    headerAlign: "left",
    width,
    align: "left",
    editable: true,
  },
  // { field: "batchno", headerName: "BATCH NO", width, editable: true },
  {
    field: "manufacturer",
    headerName: "MANUFACTURER",
    width,
    editable: true,
  },
  {
    field: "category",
    headerName: "CATEGORY",
    width,
    editable: true,
  },
  // { field: "unitcost", headerName: "UNIT COST", width, editable: true },
  {
    field: "totalquantity",
    headerName: "TOTAL QUANTITY",
    width,
    editable: true,
  },
  {
    field: "emergencytype",
    headerName: "EMERGENCY TYPE",
    width,
    editable: true,
  },
  {
    field: "actions",
    headerName: "ACTIONS",
    headerAlign: "center",
    align: "center",
    width: 150,
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          // color="primary"
          disabled={params.row.actionClick.history.type === "Order"}
          onClick={() => params.row.actionClick.onClick(params.row)}
          sx={{ backgroundColor: "#2e718a" }}
        >
          Order
        </Button>
      </div>
    ),
  },
];
