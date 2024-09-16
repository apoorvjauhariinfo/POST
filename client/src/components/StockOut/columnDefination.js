let width = 150;
const isIm = localStorage.getItem("inventorymanagerid") !== null;

if (!isIm) {
  width = 145;
}

const columnDefinations = [
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
  { field: "batchno", headerName: "BATCH NO", width, editable: true },
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
  { field: "unitcost", headerName: "UNIT COST", width, editable: true },
  {
    field: "emergencytype",
    headerName: "EMERGENCY TYPE",
    width,
    editable: true,
  },
];

if (!isIm) {
  columnDefinations.push({
    field: "actions",
    headerName: "ACTIONS",
    width,
    editable: true,
  });
}

export { columnDefinations };
