import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "./home.css";

import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import axios from "axios";
import Axios from "axios";

import { useState, CSSProperties } from "react";

function createData(
  name,
  type,
  batchno,
  manufacturer,
  category,
  unitcost,
  emergencytype
) {
  return {
    name,
    type,
    batchno,
    manufacturer,
    category,
    unitcost,
    emergencytype,
  };
}

function BufferStock() {
  const [history, setHistory] = useState([]);
  const [batchno, setBatchNo] = useState([]);
  const [productid, setProductId] = useState([]);
  const [totalquantity, setTotalQuantity] = useState([]);
  const [buffervalue, setBufferValue] = useState([]);
  const [unitcost, setUnitCost] = useState([]);
  const [doe, setDoe] = useState([]);
  const [dom, setDom] = useState([]);
  const [type, setType] = useState([]);
  const [action, setAction] = useState([]);

  const [name, setName] = useState([]);
  const [emergency, setEmergency] = useState([]);
  const [category, setCategory] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [emergencytype, setEmergencyType] = useState([]);

  const [prodlen, setProdlen] = useState(null);
  const [stocklen, setStocklen] = useState(null);
  const [bufferstock, setBufferStock] = useState(null);
  const [stockout, setStockOut] = useState(null);

  const [issuedlen, setIssuedlen] = useState(null);
  const handleTotal = () => {
    window.location = "/totalproduct";
  };
  const handleAvailaible = () => {
    window.location = "/availaibleproduct";
  };
  const handleBuffer = () => {
    window.location = "/bufferstock";
  };
  const handleStockOut = () => {
    window.location = "/stockout";
  };
  const hospitalid = localStorage.getItem("hospitalid");

  const gethistory = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks`;

      const { data } = await axios.get(url);
      console.log("History is: ", data);
      const batchno = new Array(data.document.length);
      const productid = new Array(data.document.length);
      const unitcost = new Array(data.document.length);
      const buffervalue = new Array(data.document.length);
      const totalquantity = new Array(data.document.length);
      const entrydate = new Array(data.document.length);
      const manufacturingdate = new Array(data.document.length);
      let a = 0;
      for (let i = 0; i < data.document.length; i++) {
        if (data.document[i].hospitalid == hospitalid) {
          batchno[i] = data.document[i].batchno;
          productid[i] = data.document[i].productid;
          unitcost[i] = data.document[i].unitcost;

          totalquantity[i] = data.document[i].totalquantity;
          buffervalue[i] = data.document[i].buffervalue;
          entrydate[i] = data.document[i].doe;
          manufacturingdate[i] = data.document[i].dom;
          a++;
        }
      }
      setBatchNo(batchno);
      setUnitCost(unitcost);
      setTotalQuantity(totalquantity);
      setBufferValue(buffervalue);
      setDoe(entrydate);

      setDom(manufacturingdate);

      setProductId(productid);
    } catch (error) {
      console.log(error);
    }
  };
  gethistory();

  const rows = [];

  const getprodnew = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}products`;

      const { data } = await axios.get(url);
      const namearr = [];
      const typearry = [];
      const categoryarry = [];
      const manufacturerarry = [];
      const emergencyarry = [];

      for (let i = 0; i < batchno.length; i++) {
        for (let j = 0; j < data.document.length; j++) {
          if (productid[i] == data.document[j]._id) {
            namearr[i] = data.document[j].name;
            typearry[i] = data.document[j].producttype;
            categoryarry[i] = data.document[j].category;
            manufacturerarry[i] = data.document[j].manufacturer;
            emergencyarry[i] = data.document[j].emergencytype;
          }
        }
      }
      setName(namearr);
      setType(typearry);
      setCategory(categoryarry);
      setManufacturer(manufacturerarry);
      setEmergencyType(emergencyarry);

      console.log("DAta is ours", data);
    } catch (error) {
      console.log(error);
    }
  };

  getprodnew();

  //Pushing The data into the Tables
  for (let i = 0; i < batchno.length; i++) {
    if (+totalquantity[i] < 1) {
      rows.push(
        createData(
          name[i],
          type[i],
          batchno[i],
          manufacturer[i],
          category[i],
          unitcost[i],
          // totalquantity[i],

          emergencytype[i]
        )
      );
    }
  }

  return (
    <main className="main-container">
      <div>
        <section
          class="p-5 w-100"
          style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
        >
          <div class="row">
            <div class="col">
              <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-3">
                  <div className="main-title">
                    <h3>STOCK OUT PRODUCTS</h3>
                  </div>

                  <TableContainer
                    component={Paper}
                    className="table "
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">NAME</TableCell>
                          <TableCell align="right">TYPE</TableCell>
                          <TableCell align="right">BATCH NO</TableCell>
                          <TableCell align="right">MANUFACTURER</TableCell>
                          <TableCell align="right">CATEGORY</TableCell>
                          <TableCell align="right">UNIT COST</TableCell>
                          {/* <TableCell align="right">TOTAL QUANTITY</TableCell> */}
                          <TableCell align="right">EMERGENCY TYPE</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right" component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.type}</TableCell>

                            <TableCell align="right">{row.batchno}</TableCell>
                            <TableCell align="right">
                              {row.manufacturer}
                            </TableCell>
                            <TableCell align="right">{row.category}</TableCell>

                            <TableCell align="right">{row.unitcost}</TableCell>
                            {/* <TableCell align="right">{row.totalquantity}</TableCell> */}

                            <TableCell align="right">
                              {row.emergencytype}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Button variant="text">Load More</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default BufferStock;
