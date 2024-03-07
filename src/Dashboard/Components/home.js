import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import axios from 'axios'
 import { useState, CSSProperties } from 'react'

function Home() {
  const [prodlen,setProdlen] = useState(null);
  const [stocklen,setStocklen] = useState(null);

  const [issuedlen,setIssuedlen] = useState(null);

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
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>TOTAL</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>${prodlen}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>AVAILAIBLE</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>${stocklen}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CRITICAL</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>2</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ISSUED</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>${issuedlen}</h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Home