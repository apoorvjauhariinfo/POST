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
  const [bufferhospital, setBufferHospital] = useState([]);
  const [stockhospital, setStockHospital] = useState([]);

  const [name, setName] = useState([]);
  const [emergency, setEmergency] = useState([]);

  const [hospital, setHospital] = useState(null);
  const [newregistration, setNewRegistration] = useState(null);
  const [stocklen, setStocklen] = useState(null);
  const [bufferstock, setBufferStock] = useState(null);
  const [stockout, setStockOut] = useState(null);

  const [issuedlen, setIssuedlen] = useState(null);
  const handleTotal = () => {
    window.location = "/totalhospital";
  };
  const handleNewRegistration = () => {
    window.location = "/newregistration";
  };
  const handleBuffer = () => {
    window.location = "/bufferstocksema";
  };
  const handleStockOut = () => {
    window.location = "/stockoutsema";
  };
// Prevent back button
window.history.pushState(null, document.title, window.location.pathname);
window.addEventListener("popstate", function () {
  history.push("/");
});


  //+1 WHEN NEW USER REGISTER ON SEMA
    const getnewusers = async() => {
      try {
        const url = `${process.env.REACT_APP_BASE_URL}users`;
        const { data } = await axios.get(url);
        let newusers = 0;
        for(let a = 0;a<data.document.length;a++){
          if(data.document[a].verified == false){
            newusers++;
          }
        }
        setNewRegistration(newusers);
      }catch(error){
        console.log(error);
      }
    };
  //+1 AFTER ENTERING THE NEW PRODUCT
  const gethospital = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}hospitals`;

      const { data } = await axios.get(url);
      setHospital(data.document.length);
    } catch (error) {
      console.log(error);
    }
  };
  //+1 AFTER A STOCK OF PRODUCT IS ENTERED
  const getstock = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks`;

      const { data } = await axios.get(url);
      setStocklen(data.document.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getbufferstock = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks`;

      const { data } = await axios.get(url);
      let buffer = 0;
      let out = 0;
      const bufferhospitallist = [];
      const stockouthospitallist = [];
      for (let i = 0; i < data.document.length; i++) {
        //No of Buffer Products
        if (
          +data.document[i].totalquantity <= +data.document[i].buffervalue &&
          +data.document[i].totalquantity > 1
        ) {
          buffer++;
          bufferhospitallist.push(data.document[i].hospitalid);
        }
      }
      const uniqueValues = new Set(bufferhospitallist);

      // Get the count of unique BUFFER HOSPITALS
      const buffercount = uniqueValues.size;
      //No of Stock Out Products
      for (let i = 0; i < data.document.length; i++) {
        if (+data.document[i].totalquantity < 1) {
          out++;
          stockouthospitallist.push(data.document[i].hospitalid);
        }
      }
      const uniqueValues1 = new Set(stockouthospitallist);

      // Get the count of unique values
      const stockcount = uniqueValues1.size;
      console.log("buffer list is " + bufferhospitallist);
      setBufferStock(buffer);
      setStockOut(out);
      setBufferHospital(buffercount);
      setStockHospital(stockcount);
    } catch (error) {
      console.log(error);
    }
  };

  const getissued = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}issueds`;

      const { data } = await axios.get(url);
      setIssuedlen(data.document.length);
    } catch (error) {
      console.log(error);
    }
  };

  gethospital();
  getnewusers();
  getissued();
  getstock();
  getbufferstock();

  const gethistory = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}history`;

      const { data } = await axios.get(url);
      console.log("History is: ", data);
      const date = new Array(data.document.length);
      const productid = new Array(data.document.length);
      const quantity = new Array(data.document.length);
      const type = new Array(data.document.length);

      for (let i = 0; i < data.document.length; i++) {
        date[i] = data.document[i].date;
        productid[i] = data.document[i].productid;
        quantity[i] = data.document[i].quantity;
        type[i] = data.document[i].type;
      }
      setDate(date);
      setType(type);
      setQuantity(quantity);
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
      const typoarr = [];
      const emergencyarr = [];
      for (let i = 0; i < date.length; i++) {
        for (let j = 0; j < data.document.length; j++) {
          if (productid[i] == data.document[j]._id) {
            namearr[i] = data.document[j].name;
            typoarr[i] = data.document[j].producttype;
            emergencyarr[i] = data.document[j].emergencytype;
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

  getprodnew();

  //Pushing The data into the Tables
  for (let i = date.length - 1; i >= 0; i--) {
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
          class="p-5 w-100"
          style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
        >
          <div class="row">
            <div class="col">
              <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-3">
                  <div className="main-title">
                    <h3>DASHBOARD</h3>
                  </div>

                  <div className="main-cards">
                    <div className="cardnew">
                      <div className="card-inner">
                        <h5>TOTAL HOSPITAL</h5>
                        <BsFillArchiveFill className="card_icon" />
                      </div>

                      <h1>{hospital}</h1>
                      <Button variant="text" onClick={handleTotal}>
                        More
                      </Button>
                    </div>
                    <div className="cardnew2">
                      <div className="card-inner">
                        <h5>NEW REGISTRATION</h5>
                        <BsPeopleFill className="card_icon" />
                      </div>
                      <h1>{newregistration}</h1>
                      <Button variant="text" onClick={handleNewRegistration}>
                        More
                      </Button>
                    </div>
                    <div className="cardnew3">
                      <div className="card-inner">
                        <h5>BUFFER STOCK</h5>
                        <BsPeopleFill className="card_icon" />
                      </div>
                      <h1>{bufferhospital}</h1>
                      <Button variant="text" onClick={handleBuffer}>
                        More
                      </Button>
                    </div>
                    <div className="cardnew4">
                      <div className="card-inner">
                        <h5>STOCK OUT</h5>
                        <BsFillBellFill className="card_icon" />
                      </div>
                      <h1>{stockhospital}</h1>
                      <Button variant="text" onClick={handleStockOut}>
                        More
                      </Button>
                    </div>
                  </div>
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
