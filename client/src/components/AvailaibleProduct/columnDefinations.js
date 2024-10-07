const width = 220;
export const columnDefinitions = [
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
  // { field: "unitcost", headerName: "UNIT COST", width, editable: true },
  {
    field: "totalquantity",
    headerName: "TOTAL QUANTITY",
    width,
    editable: true,
  },
  // {
  //   field: "gst",
  //   headerName: "GST %",
  //   width,
  //   editable: true,
  // },
  // {
  //   field: "grandtotal",
  //   headerName: "GRAND TOTAL",
  //   width,
  //   editable: true,
  // },
  {
    field: "emergencytype",
    headerName: "EMERGENCY TYPE",
    width,
    editable: true,
  },
];
