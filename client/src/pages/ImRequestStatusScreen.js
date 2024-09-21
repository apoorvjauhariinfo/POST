import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import LoaderOverlay from "../components/Loader/LoaderOverlay";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useGetImReuestStatusData from "./hooks/useFetchImReqestSatus";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";


export default function ImRequestStatusScreen() {
  const { status, resData } = useGetImReuestStatusData();

  return (
    <div>
      <LoaderOverlay loading={status === "loading"} />
      {status === "success" && (
        <section className="p-5 w-100">
          <div className="row">
            <div className="col-12">
              <div className="card-body p-md-50">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-8">
                    <div className="button-body mt-2 mb-2">
                      <div className="d-flex justify-content-center"></div>
                    </div>
                    <TableContainer component={Paper} className="table">
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              Request Date
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              Product Name
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontWeight: "bold",
                                color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              Request Type
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontWeight: "bold",
                                // color: "#2e718a",
                                textTransform: "uppercase",
                                fontSize: "0.9rem",
                                padding: "10px",
                              }}
                            >
                              Status
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {resData.map((row) => (
                            <TableRow
                              key={row.role}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">{row.date}</TableCell>
                              <TableCell align="center">
                                {row.productName}
                              </TableCell>
                              <TableCell align="center">
                                {row.demand === "delete" ? (
                                  <Button
                                    variant="contained"
                                    size="small"
                                    style={{ color: "red", backgroundColor: "white" }}

                                  >
                                    <DeleteOutlined />
                                  </Button>
                                ) : (
                                  <Button variant="contained" size="small" style={{ color: "blue", backgroundColor: "white" }}>

                                    <EditIcon />
                                  </Button>
                                )}
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  variant="contained"
                                  size="small"
                                  sx={{
                                    backgroundColor:
                                      row.status === "accepted"
                                        ? "#198754"
                                        : "#ffc107",
                                    color:
                                      row.status === "accepted"
                                        ? "white"
                                        : "black",
                                  }}
                                >
                                  {row.status.toUpperCase()}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
