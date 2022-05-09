import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { useEffect } from "react";
import "./Order.css";



const url = "http://localhost/ecommerce/admin/Api/getfilteredproduct.php";
var productData = [];

const Order = () => {
    const customerid = sessionStorage.getItem('userId')

    console.log(customerid)
    const [notes, setNotes] = useState("");
  useEffect(() => {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: customerid }),
    };
    fetch(
      "http://localhost/ecommerce/admin/Api/customerproduct.php",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setNotes(data));

    console.log(notes);
    console.log(typeof notes);
  }, [customerid]);

  if (notes) {
    productData = notes.data;
    console.log(productData);
  }
  return (
    <TableContainer component={Paper} className="data">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Id</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right">Order Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.orderId}
              </TableCell>
              <TableCell align="right">{row.orderdate}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.totalprice}</TableCell>
              <TableCell align="right">{row.orderstatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Order