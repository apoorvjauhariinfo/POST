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
  hospitalname,
  address,
  ceanumber,
  phone,
  state,
  district,
  billingname,
  email
) {
  return {
    hospitalname,
    address,
    ceanumber,
    phone,
    state,
    district,
    billingname,
    email,
  };
}

function TotalHospital() {
  const [id, setId] = useState([]);

  const [hospitalname, setHospitalName] = useState([]);
  const [address, setAddress] = useState([]);
  const [ceanumber, setCeaNumber] = useState([]);
  const [phone, setPhone] = useState([]);
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [billingname, setBillingName] = useState([]);
  const [email, setEmail] = useState([]);

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

  // const gethistory = async () => {
  //   try {

  //     const url = `http://localhost:4000/stocks`;
  //     const { data } = await axios.get(url);
  //     console.log("History is: ", data);
  //     const batchno = new Array(data.document.length)
  //     const productid = new Array(data.document.length)
  //     const unitcost = new Array(data.document.length)

  //     const totalquantity = new Array(data.document.length)
  //     const entrydate = new Array(data.document.length)
  //     const manufacturingdate = new Array(data.document.length)

  //     for (let i = 0; i < data.document.length; i++) {
  //       batchno[i] = data.document[i].batchno;
  //       productid[i] = data.document[i].productid;
  //       unitcost[i] = data.document[i].unitcost;

  //       totalquantity[i] = data.document[i].totalquantity;
  //       entrydate[i] = data.document[i].doe;
  //       manufacturingdate[i] = data.document[i].dom;

  //     }
  //     setBatchNo(batchno);
  //     setUnitCost(unitcost);
  //     setTotalQuantity(totalquantity);
  //     setDoe(entrydate);

  //     setDom(manufacturingdate);

  //     setProductId(productid);

  //   } catch (error) {
  //     console.log(error);
  //   }

  // };
  // gethistory();

  const rows = [];

  const gethospital = async () => {
    try {
<<<<<<< HEAD

      const url = `http://localhost:4000/hospitals`;
=======
      const url = `${process.env.REACT_APP_BASE_URL}hospitals`;
>>>>>>> 8f93ccfe1b20f4f1f15a0d4506f6509ab9b37bc5
      const { data } = await axios.get(url);
      const id = new Array(data.document.length);
      const hospitalname = new Array(data.document.length);
      const address = new Array(data.document.length);
      const ceanumber = new Array(data.document.length);
      const phone = new Array(data.document.length);
      const state = new Array(data.document.length);
      const district = new Array(data.document.length);
      const billingname = new Array(data.document.length);
      const email = new Array(data.document.length);

      for (let i = 0; i < data.document.length; i++) {
        id[i] = data.document[i].id;
        hospitalname[i] = data.document[i].hospitalname;
        address[i] = data.document[i].address;
        ceanumber[i] = data.document[i].ceanumber;
        phone[i] = data.document[i].phone;
        state[i] = data.document[i].state;
        district[i] = data.document[i].district;
        billingname[i] = data.document[i].billingname;

        email[i] = data.document[i].email;
      }
      setId(id);
      setHospitalName(hospitalname);
      setAddress(address);
      setCeaNumber(ceanumber);
      setPhone(phone);
      setState(state);
      setDistrict(district);
      setBillingName(billingname);

      setEmail(email);

      console.log("DAta is ours", data);
    } catch (error) {
      console.log(error);
    }
  };

  gethospital();

  //Pushing The data into the Tables
  for (let i = 0; i < id.length; i++) {
    rows.push(
      createData(
        hospitalname[i],
        address[i],
        ceanumber[i],
        phone[i],
        state[i],
        district[i],
        billingname[i],
        email[i]
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
                    <h3>NEW HOSPITAL DETAILS</h3>
                  </div>

                  <div className="row" align-items-start>
                    <p class="text-right h3 mb-3 mt-4">FILTER</p>
                  </div>

                  <TableContainer
                    component={Paper}
                    className="table table-primary"
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">HOSPITAL NAME</TableCell>
                          <TableCell align="right">ADDRESS</TableCell>
                          <TableCell align="right">CEA NUMBER</TableCell>
                          <TableCell align="right">PHONE</TableCell>
                          <TableCell align="right">STATE</TableCell>
                          <TableCell align="right">DISTRICT</TableCell>
                          <TableCell align="right">NAME</TableCell>
                          <TableCell align="right">EMAIL</TableCell>
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
                              {row.hospitalname}
                            </TableCell>
                            <TableCell align="right">{row.address}</TableCell>
                            <TableCell align="right">{row.ceanumber}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">{row.state}</TableCell>
                            <TableCell align="right">{row.district}</TableCell>
                            <TableCell align="right">
                              {row.billingname}
                            </TableCell>
                            <TableCell align="right">{row.email}</TableCell>
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

export default TotalHospital;
