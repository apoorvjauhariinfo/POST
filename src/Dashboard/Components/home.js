
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import "./home.css"

import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
  from 'recharts';
import axios from 'axios'
import Axios from "axios"

import { useState, CSSProperties } from 'react'

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
  const [bufferstock,setBufferStock] = useState(null);
  const [stockout, setStockOut] = useState(null);

  const [issuedlen, setIssuedlen] = useState(null);

  const hospitalid = localStorage.getItem("hospitalid");
  const handleTotal = () => {
    window.location = "/totalproduct"
  };
  const handleAvailaible = () => {
    window.location = "/availaibleproduct"
  };
  const handleBuffer = () => {
    window.location = "/bufferstock"
  };
  const handleStockOut = () => {
    window.location = "/stockout"
  };

  //+1 AFTER ENTERING THE NEW PRODUCT
  const getprod = async () => {
    try {
      let productlength = 0;
      const url = process.env.BASE_URL+`products`;
      const { data } = await axios.get(url);
      for(let a = 0;a < data.document.length;a++){
        if(data.document[a].hospitalid == hospitalid){
          productlength++;
        }
      }
      setProdlen(productlength);

    } catch (error) {
      console.log(error);
    }

  };
  //+1 AFTER A STOCK OF PRODUCT IS ENTERED
  const getstock = async () => {
    try {
      let stocklen = 0;
      const url = process.env.BASE_URL+`stocks`;
      const { data } = await axios.get(url);
      for(let a = 0;a < data.document.length;a++){
        if(data.document[a].hospitalid == hospitalid){
          if(+data.document[a].totalquantity != 0){
             stocklen++;
          }
         
        }
      }
      setStocklen(stocklen);

    } catch (error) {
      console.log(error);
    }

  };

  const getbufferstock = async () => {
    try {

      const url = process.env.BASE_URL+`stocks`;
      const { data } = await axios.get(url);
      let buffer = 0;
      let out = 0;
      for(let i = 0;i<data.document.length; i++){
        if(data.document[i].hospitalid == hospitalid){
        if((+data.document[i].totalquantity <= +data.document[i].buffervalue)&&(+data.document[i].totalquantity > 1)){
            buffer++;
        }
       }
      }
      for(let i = 0;i<data.document.length; i++){
        if(data.document[i].hospitalid == hospitalid){
        if(+data.document[i].totalquantity < 1){
            out++;
        }
       }
      }
      setBufferStock(buffer);
      setStockOut(out);

    } catch (error) {
      console.log(error);
    }

  };


  const getissued = async () => {
    try {
      const issuelen = 0;
      const url = process.env.BASE_URL+`issueds`;
      const { data } = await axios.get(url);
      for(let a = 0;a < data.document.length;a++){
        if(data.document[a].hospitalid == hospitalid){
          issuelen++;
        }
      }
      setIssuedlen(issuelen);

    } catch (error) {
      console.log(error);
    }

  };

  getprod();
  getissued();
  getstock();
  getbufferstock();



  const gethistory = async () => {
    try {

      const url = process.env.BASE_URL+`history`;
      const { data } = await axios.get(url);
      console.log("History is: ", data);
      const date = new Array(data.document.length)
      const productid = new Array(data.document.length)
      const quantity = new Array(data.document.length)
      const type = new Array(data.document.length)
      let a = 0;
      for (let i = 0; i < data.document.length; i++) {
        if(data.document[i].hospitalid == hospitalid){

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
  gethistory();


  const rows = [


  ];



  const getprodnew = async () => {
    try {

      const url = process.env.BASE_URL+`products`;
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


  getprodnew();


//Pushing The data into the Tables
  for (let i = 0; i < date.length ; i++) {
    rows.push(
      createData(
        date[i],
        type[i],
        action[i],
        name[i],
        quantity[i],
        emergency[i],
      )
    );
  }




  return (
    <main className='main-container'>
      <div>
        <section
          class="p-5 w-100"
          style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
        >
          <div class="row">
            <div class="col">
              <div class="card text-black" style={{ borderRadius: "25px" }}>
                <div class="card-body p-md-3">
                  <div className='main-title'>
                    <h3>DASHBOARD</h3>
                  </div>

                  <div className='main-cards'>
                    <div className='cardnew' >
                      <div className='card-inner'>
                        <h4>TOTAL </h4>
                      </div>

                      <h1>{prodlen}</h1>
                      <Button variant="text" onClick={handleTotal}>
                        More
                      </Button>


                    </div>
                    <div className='cardnew2' >
                      <div className='card-inner'>
                        <h4>AVAILAIBLE</h4>
                      </div>
                      <h1>{stocklen}</h1>
                      <Button variant="text" onClick={handleAvailaible}>
                        More
                      </Button> 

                    </div>
                    <div className='cardnew3' >
                      <div className='card-inner'>
                        <h4>BUFFER STOCK</h4>
                      </div>
                      <h1>{bufferstock}</h1>
                      <Button variant="text" onClick={handleBuffer}>
                        More
                      </Button>

                    </div>
                    <div className='cardnew4' >
                      <div className='card-inner'>
                        <h4>STOCK OUT</h4>
                      </div>
                      <h1>{stockout}</h1>
                      <Button variant="text" onClick={handleStockOut}>
                        More
                      </Button>

                    </div>
                  </div>
                  <div className='row' align-items-start>
                    <p class="text-right h3 mb-3 mt-4">Recent Activity</p>
                  </div>

                  <TableContainer component={Paper} className="table table-primary">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="right" component="th" scope="row">
                              {row.date}
                            </TableCell>
                            <TableCell align="right">{row.action}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.product}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.emergencytype}</TableCell>
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
      </div >
    </main >
  )
}

export default Home