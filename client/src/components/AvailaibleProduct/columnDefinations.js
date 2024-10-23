const width = 200;
export const columnDefinitions = [
  {
    field: "name",
    headerName: "PRODUCT NAME",
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

if (localStorage.getItem("inventorymanagerid") !== "null") {
  columnDefinitions.splice(1, 0, {
    field: "imname",
    headerName: "INVENTORY MANAGER",
    width,
    align: "left",
    headerAlign: "left",
  });
}
