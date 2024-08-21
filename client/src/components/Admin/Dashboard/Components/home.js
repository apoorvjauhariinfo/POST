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


  const [hospital, setHospital] = useState(null);
  const [newregistration, setNewRegistration] = useState(null);
  const [bufferstock, setBufferStock] = useState(null);
  const [stockout, setStockOut] = useState(null);

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
        const url = `${process.env.REACT_APP_BASE_URL}unverifieduserscount`;
        const { data } = await axios.get(url);
        console.log("count"+data.count);

        setNewRegistration(data.count);
      }catch(error){
        console.log(error);
      }
    };
  //+1 AFTER ENTERING THE NEW PRODUCT
  const gethospital = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}hospitalsnumber`;

      const { data } = await axios.get(url);
      console.log("count"+data.count);
      setHospital(data.count);
      
    } catch (error) {
      console.log(error);
    }
  };
  //+1 AFTER A STOCK OF PRODUCT IS ENTERED
  const getbuffer = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks/buffervalue`;

      const { data } = await axios.get(url);
      console.log("count"+data.count);

      setBufferStock(data.count);
   
    } catch (error) {
      console.log(error);
    }
  };
  const getstockout = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}stocks/outvalue`;

      const { data } = await axios.get(url);
      console.log("count"+data.count);

      setStockOut(data.count);
   
    } catch (error) {
      console.log(error);
    }
  };



  React.useEffect(() => {
    gethospital();
    getnewusers();
    getbuffer();
    getstockout();
  }, []);
  





  return (
    <main className="main-container" style={{ backgroundColor: "#eeeee" }}>
      <div>
        <section
          class="p-5 w-100"
          style={{ backgroundColor: "#eeeee", borderRadius: "0 0 0 0" }}
        >
          <div class="row">
            <div class="col">
              <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-3">
                  < div className="main-cards">
                  <div className="cardnew" onClick={hospital > 0 ? handleTotal : null}>
                      <h1>{hospital}</h1>
                      <span>TOTAL HOSPITAL</span>
                    </div>
                    {/* <div className="cardnew">
                      <div className="card-inner">
                        <h5>TOTAL HOSPITAL</h5>
                        <BsFillArchiveFill className="card_icon" />
                      </div>

                      <h1>{hospital}</h1>
                      <Button variant="text" onClick={handleTotal}>
                        More
                      </Button>
                    </div> */}

                    <div className="cardnew" onClick={newregistration > 0 ? handleNewRegistration : null}>
                      <h1>{newregistration}</h1>
                      <span>NEW REGISTRATION</span>
                    </div>
                    {/* <div className="cardnew2">
                      <div className="card-inner">
                        <h5>NEW REGISTRATION</h5>
                        <BsPeopleFill className="card_icon" />
                      </div>
                      <h1>{newregistration}</h1>
                      <Button variant="text" onClick={handleNewRegistration}>
                        More
                      </Button>
                    </div> */}
                      <div className="cardnew"onClick={bufferstock > 0 ? handleBuffer : null}>
                    <h1 style={{ color: bufferstock > 0 ? '#c45516' : 'green' }}>{bufferstock}</h1>
                    <span>BUFFER STOCK</span>
                    </div>
                    {/* <div className="cardnew3">
                      <div className="card-inner">
                        <h5>BUFFER STOCK</h5>
                        <BsPeopleFill className="card_icon" />
                      </div>
                      <h1>{bufferhospital}</h1>
                      <Button variant="text" onClick={handleBuffer}>
                        More
                      </Button>
                    </div> */}
                     <div className="cardnew" onClick={stockout > 0 ? handleStockOut : null}>
                    <h1 style={{ color: stockout > 0 ? '#c45516' : 'green' }}>{stockout}</h1>
                      <span>STOCK OUT</span>
                    </div>
                  
                    {/* <div className="cardnew4">
                      <div className="card-inner">
                        <h5>STOCK OUT</h5>
                        <BsFillBellFill className="card_icon" />
                      </div>
                      <h1>{stockhospital}</h1>
                      <Button variant="text" onClick={handleStockOut}>
                        More
                      </Button>
                    </div> */}
                    
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
