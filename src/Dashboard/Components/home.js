
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
  from 'recharts';
import axios from 'axios'
import { useState, CSSProperties } from 'react'

function createData(date, action, type, product, quantity, emergencytype) {
  return { date, action, type, product, quantity, emergencytype };
}

const rows = [
  createData('02/02/2024', 'Product entry', "Pharma", "INSTAZOLE-40 INJECTIONS", 20, 'Critical'),
  createData('02/02/2024', 'Product issue', "Equipment", "INSTAZOLE-40 INJECTIONS", 20, 'Non Critical'),
  createData('02/02/2024', 'Product entry', "Pharma", "Medical Gun Label", 20, 'Critical'),
  createData('02/02/2024', 'Product issue', "Pharma", "INSTAZOLE-40 INJECTIONS", 20, 'Critical'),
  createData('02/02/2024', 'Product entry', "Equipment", "Medical Gun Label", 20, 'Non Critical'),
  createData('02/02/2024', 'Product issue', "Equipment", "INSTAZOLE-40 INJECTIONS", 20, 'Non Critical'),
  createData('02/02/2024', 'Product entry', "Pharma", "Medical Gun Label", 20, 'Critical'),

];
function Home() {
  const [prodlen, setProdlen] = useState(null);
  const [stocklen, setStocklen] = useState(null);

  const [issuedlen, setIssuedlen] = useState(null);

  const getprod = async () => {
    try {

      const url = `http://localhost:4000/products`;
      const { data } = await axios.get(url);
      setProdlen(data.document.length);

    } catch (error) {
      console.log(error);
    }

  };
  const getstock = async () => {
    try {

      const url = `http://localhost:4000/stocks`;
      const { data } = await axios.get(url);
      setStocklen(data.document.length);

    } catch (error) {
      console.log(error);
    }

  };
  const getissued = async () => {
    try {

      const url = `http://localhost:4000/issueds`;
      const { data } = await axios.get(url);
      setIssuedlen(data.document.length);

    } catch (error) {
      console.log(error);
    }

  };

  getprod();
  getissued();
  getstock();

  const data = [
    {
      name: 'Product A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Product B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Product C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Product D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Product E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Product F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Product G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];


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
                    <div className='card'>
                      <div className='card-inner'>
                        <h3>TOTAL</h3>
                        <BsFillArchiveFill className='card_icon' />
                      </div>
                      <h1>{prodlen}</h1>
                    </div>
                    <div className='card'>
                      <div className='card-inner'>
                        <h3>AVAILAIBLE</h3>
                        <BsFillGrid3X3GapFill className='card_icon' />
                      </div>
                      <h1>{stocklen}</h1>
                    </div>
                    <div className='card'>
                      <div className='card-inner'>
                        <h3>CRITICAL</h3>
                        <BsPeopleFill className='card_icon' />
                      </div>
                      <h1>2</h1>
                    </div>
                    <div className='card'>
                      <div className='card-inner'>
                        <h3>ISSUED</h3>
                        <BsFillBellFill className='card_icon' />
                      </div>
                      <h1>{issuedlen}</h1>
                    </div>
                  </div>
                  <p class="text-left h3 mb-3 mt-4">Recent Activity:</p>
                  <TableContainer component={Paper}>
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