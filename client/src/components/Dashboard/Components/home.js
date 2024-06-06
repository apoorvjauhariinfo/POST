import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
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

import { useState, useEffect } from "react";

function createData(date, action, type, product, quantity, emergencytype) {
  return { date, action, type, product, quantity, emergencytype };
}

function Home() {
  const [history, setHistory] = useState([]);
  const [date, setDate] = useState([]);
  const [productid, setProductId] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [type, setType] = useState([]);
  const [action, setAction] = useState([]);
  const [name, setName] = useState([]);
  const [emergency, setEmergency] = useState([]);
  const [prodlen, setProdlen] = useState(null);
  const [stocklen, setStocklen] = useState(null);
  const [bufferstock, setBufferStock] = useState(0);
  const [stockout, setStockOut] = useState(0);
  const [issuedlen, setIssuedlen] = useState(null);
  const hospitalid = localStorage.getItem("hospitalid");
  const isSmallScreen = useMediaQuery("(max-width:576px)");

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

  const getprod = async () => {
    try {
      let productlength = 0;
      const url = `${process.env.REACT_APP_BASE_URL}products`;
      const { data } = await axios.get(url);
      for (let a = 0; a < data.document.length; a++) {
        if (data.document[a].hospitalid == hospitalid) {
          productlength++;
        }
      }
      setProdlen(productlength);
    } catch (error) {
      console.log(error);
    }
  };

  const getstock = async () => {
    try {
      let stocklen = 0;
      const url = `${process.env.REACT_APP_BASE_URL}stocks`;
      const { data } = await axios.get(url);
      for (let a = 0; a < data.document.length; a++) {
        if (data.document[a].hospitalid == hospitalid) {
          if (+data.document[a].totalquantity != 0) {
            stocklen++;
          }
        }
      }
      setStocklen(stocklen);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}stocks`
        );
        const stocks = response.data.document;

        const bufferStockCount = stocks.reduce((count, stock) => {
          if (
            +stock.totalquantity <= +stock.buffervalue &&
            +stock.totalquantity > 0
          ) {
            return count + 1;
          }
          return count;
        }, 0);

        const stockOutCount = stocks.reduce((count, stock) => {
          if (+stock.totalquantity <= 0) {
            return count + 1;
          }
          return count;
        }, 0);

        setBufferStock(bufferStockCount);
        setStockOut(stockOutCount);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
  }, []);

  const getissued = async () => {
    try {
      let issuelen = 0;
      const url = `${process.env.REACT_APP_BASE_URL}issueds`;
      const { data } = await axios.get(url);
      for (let a = 0; a < data.document.length; a++) {
        if (data.document[a].hospitalid == hospitalid) {
          issuelen++;
        }
      }
      setIssuedlen(issuelen);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getprod();
    getissued();
    getstock();
  }, []);

  const gethistory = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}history`;
      const { data } = await axios.get(url);
      console.log("History is: ", data);
      const date = new Array(data.document.length);
      const productid = new Array(data.document.length);
      const quantity = new Array(data.document.length);
      const type = new Array(data.document.length);
      let a = 0;
      for (let i = 0; i < data.document.length; i++) {
        if (data.document[i].hospitalid == hospitalid) {
          date[a] = data.document[i].date;
          productid[a] = data.document[i].productid;
          quantity[a] = data.document[i].quantity;
          type[a] = data.document[i].type;
          a++;
        }
      }
      setDate(date);
      setType(type);
      setQuantity(quantity);
      setProductId(productid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gethistory();
  }, []);

  const rows = [];

  const getprodnew = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}products`;
      const { data } = await axios.get(url);
      const namearr = [];
      const typoarr = [];
      const emergencyarr = [];
      let a = 0;
      for (let i = 0; i < date.length; i++) {
        for (let j = 0; j < data.document.length; j++) {
          if (productid[i] == data.document[j]._id) {
            namearr[a] = data.document[j].name;
            typoarr[a] = data.document[j].producttype;
            emergencyarr[a] = data.document[j].emergencytype;
            a++;
          }
        }
      }
      setName(namearr);
      setEmergency(emergencyarr);
      setAction(typoarr);
      console.log("DAta is ours", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getprodnew();
  }, [date]);

  for (let i = name.length - 1; i >= 0; i--) {
    rows.push(
      createData(
        date[i],
        type[i],
        action[i],
        name[i],
        quantity[i],
        emergency[i]
      )
    );
  }

  return (
    <main className="main-container">
      <div>
        <section
          className="p-5 w-100"
          style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
        >
          <div className="row">
            <div className="col">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-3">
                  <div className="main-title">
                    <h3>DASHBOARD</h3>
                  </div>

                  <div className="main-cards">
                    <div className="cardnew">
                      <div className="card-inner">
                        <h4>TOTAL </h4>
                      </div>

                      <h1>{prodlen}</h1>
                      <Button variant="text" onClick={handleTotal}>
                        More
                      </Button>
                    </div>
                    <div className="cardnew2">
                      <div className="card-inner">
                        <h4>AVAILAIBLE</h4>
                      </div>
                      <h1>{stocklen}</h1>
                      <Button variant="text" onClick={handleAvailaible}>
                        More
                      </Button>
                    </div>
                    <div className="cardnew3">
                      <div className="card-inner">
                        <h4>BUFFER STOCK</h4>
                      </div>
                      <h1>{bufferstock}</h1>
                      <Button variant="text" onClick={handleBuffer}>
                        More
                      </Button>
                    </div>
                    <div className="cardnew4">
                      <div className="card-inner">
                        <h4>STOCK OUT</h4>
                      </div>
                      <h1>{stockout}</h1>
                      <Button variant="text" onClick={handleStockOut}>
                        More
                      </Button>
                    </div>
                  </div>
                  <div className="row" align-items-start>
                    <p className="text-right h3 mb-3 mt-4">Recent Activity</p>
                  </div>

                  <TableContainer
                    component={Paper}
                    className="table table-primary"
                  >
                    <Table
                      sx={{ minWidth: 650 }}
                      aria-label="simple table"
                      size={isSmallScreen ? "small" : "medium"}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">Date</TableCell>
                          <TableCell align="right">Action</TableCell>
                          <TableCell align="right">Type</TableCell>
                          <TableCell align="right">Product</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Emergency Type</TableCell>
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
                              {row.date}
                            </TableCell>
                            <TableCell align="right">{row.action}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.product}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
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

export default Home;