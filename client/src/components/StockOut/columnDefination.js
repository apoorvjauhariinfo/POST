//import { Box, Button, Typography } from "@mui/material";

let width = 200;
// const isIm = localStorage.getItem("inventorymanagerid") !== null;

// if (!isIm) {
//   width = 145;
// }

const columnDefinations = [
  {
    field: 'imname',
    headerName: 'IM Name',
    width: 150,
    align: 'left',
    headerAlign: 'left',
    hide: false, // Set default visibility
  },
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
    field: "emergencytype",
    headerName: "EMERGENCY TYPE",
    width,
    editable: true,
  },
];

// if (!isIm) {
//   columnDefinations.push({
//     field: "actions",
//     headerName: "ACTIONS",
//     width,
//     editable: true,
//     renderCell: (params) => (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "flex-start",
//         }}
//       >
//         <Button
//           variant="contained"
//           color="primary"
//           size="small"
//           onClick={(e) => {
//             e.stopPropagation();
//             params.row.actions.onClick();
//           }}
//           sx={{
//             marginTop: 0.5,
//             backgroundColor: "green",
//             color: "#fff",
//             fontSize: "12px",
//             padding: "2px 4px",
//           }}
//         >
//           Initiate Order
//         </Button>
//         <Typography variant="caption">
//           nina
//           {/* {params.row.someField}  */}
//         </Typography>
//       </Box>
//     ),
//   });
// }

export { columnDefinations };
