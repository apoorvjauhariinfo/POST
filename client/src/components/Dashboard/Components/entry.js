import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(action,type,product,quantity,emergencytype ) {
  return { action,type,product,quantity,emergencytype };
}

const rows = [
  createData('02/02/2024', 'Product entry', "Pharma", "INSTAZOLE-40 INJECTIONS", 20 , 'Critical'),
  createData('02/02/2024', 'Product issue', "Equipment", "INSTAZOLE-40 INJECTIONS", 20 , 'Non Critical'),
  createData('02/02/2024', 'Product entry', "Pharma", "Medical Gun Label", 20 , 'Critical'),
  createData('02/02/2024', 'Product issue', "Pharma", "INSTAZOLE-40 INJECTIONS", 20 , 'Critical'),
  createData('02/02/2024', 'Product entry', "Equipment", "Medical Gun Label", 20 , 'Non Critical'),
];

 function Entry() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
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
              <TableCell component="th" scope="row">
                {row.name}
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
  );
}

export default Entry;
