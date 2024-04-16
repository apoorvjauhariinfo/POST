
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'

import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
  from 'recharts';
import axios from 'axios'
import Axios from "axios"

import { useState, CSSProperties } from 'react'

function createData(hospitalname, address, ceanumber, phone, state, district) {
  return { hospitalname, address, ceanumber, phone, state, district };
}









function TotalHospital() {
  const [id, setId] = useState([]);

  const [hospitalname, setHospitalName] = useState([]);
  const [address, setAddress] = useState([]);
  const [ceanumber, setCeaNumber] = useState([]);
  const [phone, setPhone] = useState([]);
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState({});
  
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
  }
  const handleClickOpen = (row) => {
    setSelectedHospital(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const rows = [


  ];



  const gethospital = async () => {
    try {

      const url = process.env.REACT_APP_BASE_URL+`hospitals`;
      const { data } = await axios.get(url);
      const id = new Array(data.document.length)
      const hospitalname = new Array(data.document.length)
      const address = new Array(data.document.length)
      const ceanumber = new Array(data.document.length)
      const phone = new Array(data.document.length)
      const state = new Array(data.document.length)
      const district = new Array(data.document.length)


      
     
      for (let i = 0; i < data.document.length; i++) {
            id[i] = data.document[i].id;
            hospitalname[i] = data.document[i].hospitalname;
            address[i] = data.document[i].address;
            ceanumber[i] = data.document[i].ceanumber;
            phone[i] = data.document[i].phone;
            state[i] = data.document[i].state;
            district[i] = data.document[i].district;
      }
      setId(id);
      setHospitalName(hospitalname);
      setAddress(address);
      setCeaNumber(ceanumber);
      setPhone(phone);
      setState(state);
      setDistrict(district);

      
      
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
                    <h3>HOSPITAL DETAILS</h3>
                  </div>

                  
                  <div className='row' align-items-start>
                    <p class="text-right h3 mb-3 mt-4">FILTER</p>
                  </div>

                  <TableContainer component={Paper} className="table table-primary">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">HOSPITAL NAME</TableCell>
                          <TableCell align="right">ADDRESS</TableCell>
                          <TableCell align="right">CEA NUMBER</TableCell>
                          <TableCell align="right">PHONE</TableCell>
                          <TableCell align="right">STATE</TableCell>
                          <TableCell align="right">DISTRICT</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            onClick={(event) => handleClickOpen(row)}

                          >
                            <TableCell align="right" component="th" scope="row">
                              {row.hospitalname}
                            </TableCell>
                            <TableCell align="right">{row.address}</TableCell>
                            <TableCell align="right">{row.ceanumber}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">{row.state}</TableCell>
                            <TableCell align="right">{row.district}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Button variant="text">Load More</Button>
                </div>
              </div>
            </div>
            <Dialog open={open} onClose={handleClose} >       
                   <DialogTitle>Hospital Details</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Hospital Name: {selectedHospital.hospitalname}
                </DialogContentText>
                <DialogContentText>
                  Address: {selectedHospital.address}
                </DialogContentText>
                <DialogContentText>
                  CEA Number: {selectedHospital.ceanumber}
                </DialogContentText>
                <DialogContentText>
                  Phone: {selectedHospital.phone}
                </DialogContentText>
                <DialogContentText>
                  State: {selectedHospital.state}
                </DialogContentText>
                <DialogContentText>
                  District: {selectedHospital.district}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>

          </div>

        </section>
      </div >
    </main >
  )
}

export default TotalHospital;