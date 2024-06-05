import {useState,React,CSSProperties} from 'react' 
import { useNavigate } from 'react-router-dom'; 
import { Button } from '@mui/material';
import NavigationBar from './NavigationBar.js'; 
import './ManageDepartment.css'
import Department from './Department.js';
import LoaderOverlay from '../Loader/LoaderOverlay.js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
 

const sourceTypeItems = [
  {
    id: "ORTHOPEDICS",
    name: "ORTHOPEDICS"
  },
  {
    id: "NEUROLOGY",
    name: "NEUROLOGY"
  },
  {
    id: "DENTAL",
    name: "DENTAL"
  },
  {
    id: "CARDIOLOGY",
    name: "CARDIOLOGY"
  },
  {
      id: "EAR NOSE AND THROAT",
      name: "EAR NOSE AND THROAT"
    },
    {
      id: "PATHOLOGY",
      name: "PATHOLOGY"
    },
    {
      id: "GASTROENTEROLOGY",
      name: "GASTROENTEROLOGY"
    },
    {
      id: "RESPIRATORY MEDICINE",
      name: "RESPIRATORY MEDICINE"
    },
    {
      id: "MICROBIOLOGY",
      name: "MICROBIOLOGY"
    },
    {
      id: "RADIOLOGY",
      name: "RADIOLOGY"
    },
    {
      id: "CUSTOM",
      name: "CUSTOM"
    },
];

function AddDepartment() {
        const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
      
        const OpenSidebar = () => {
          setOpenSidebarToggle(!openSidebarToggle) 
        }

    
  return (
    <div style={{ backgroundColor: '#f5f6fa', minHeight: '100vh' , boxSizing: 'border-box' }}> 
    <NavigationBar OpenSidebar={OpenSidebar} />  
{/* 
    <div style={{ padding: '20px', minHeight: '20px', boxSizing: 'border-box' }}>

        
        <Button variant="contained" color="primary" onClick={navigateToDashboard}>
          Go to Dashboard
        </Button>
      </div>  */}

      
      <Department/>
      

     
      { <div style={{ backgroundColor: 'white', padding: '50px', textAlign: 'center', position: 'fixed', bottom: '0', width: '100%', borderTop: '1px solid #ccc', boxShadow: '0px 5px 10px -5px #555' }}>
        <div className="col text-center">
          Copyright 2024 semamart.com All Rights Reserved.
        </div>
      </div>   } 

      </div>
  );
};

export default AddDepartment;




