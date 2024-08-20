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
  totalquantity,
  emergencytype
) {
  return {
    name,
    type,
    batchno,
    manufacturer,
    category,
    unitcost,
    totalquantity,
    emergencytype,
  };
}

function MinorAvalaible({ hospitalid }) {
  const [history, setHistory] = useState([]);
  const [batchno, setBatchNo] = useState([]);
  const [productid, setProductId] = useState([]);
  const [totalquantity, setTotalQuantity] = useState([]);
  const [unitcost, setUnitCost] = useState([]);
  const [doe, setDoe] = useState([]);
  const [dom, setDom] = useState([]);

  const [name, setName] = useState([]);
  const [type, setType] = useState([]);
  const [category, setCategory] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [emergencytype, setEmergencyType] = useState([]);

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

  const getstocks = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stockbyhospitalid/${hospitalid}`;
      const { data } = await axios.get(url);
      console.log("History is: ", data);
      const batchno = new Array(data.document.length);
      const productid = new Array(data.document.length);
      const unitcost = new Array(data.document.length);

      const totalquantity = new Array(data.document.length);
      const entrydate = new Array(data.document.length);
      const manufacturingdate = new Array(data.document.length);
      let a = 0;
      for (let i = 0; i < data.document.length; i++) {
          if (+data.document[i].totalquantity != 0) {
            batchno[a] = data.document[i].batchno;
            productid[a] = data.document[i].productid;
            unitcost[a] = data.document[i].unitcost;

            totalquantity[a] = data.document[i].totalquantity;
            entrydate[a] = data.document[i].doe;
            manufacturingdate[a] = data.document[i].dom;
            a++;
          }
        
      }
      setBatchNo(batchno);
      setUnitCost(unitcost);
      setTotalQuantity(totalquantity);
      setDoe(entrydate);

      setDom(manufacturingdate);

      setProductId(productid);
    } catch (error) {
      console.log(error);
    }
  };
  getstocks();

  const rows = [];

  const getprodnew = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}productbyhospitalid/${hospitalid}`;

      const { data } = await axios.get(url);
      const namearr = [];
      const typearry = [];
      const categoryarry = [];
      const manufacturerarry = [];
      const emergencyarry = [];

      for (let i = 0; i < batchno.length; i++) {
        for (let j = 0; j < data.products.length; j++) {
          if (productid[i] == data.products[j]._id) {
            namearr[i] = data.products[j].name;
            typearry[i] = data.products[j].producttype;
            categoryarry[i] = data.products[j].category;
            manufacturerarry[i] = data.products[j].manufacturer;
            emergencyarry[i] = data.products[j].emergencytype;
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
  for (let i = 0; i < name.length; i++) {
    rows.push(
      createData(
        name[i],
        type[i],
        batchno[i],
        manufacturer[i],
        category[i],
        unitcost[i],
        totalquantity[i],
        emergencytype[i]
      )
    );
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
                    <h3>AVAILABLE PRODUCTS</h3>
                  </div>

                  <div className="row" align-items-start>
                    <p class="text-right h3 mb-3 mt-4">FILTER</p>
                  </div>

                  <TableContainer
                    component={Paper}
                    className="table"
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
                          <TableCell align="right">TOTAL QUANTITY</TableCell>
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
                            <TableCell align="right">
                              {row.totalquantity}
                            </TableCell>
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

export default MinorAvalaible;
