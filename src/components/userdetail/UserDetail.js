import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import axios from "axios";


const auth = sessionStorage.getItem("token");
const id = sessionStorage.getItem("userId");
var productData = {};
var config = {
    method: "post",
    url: "http://localhost/ecommerce/admin/Api/getuserdetails.php",
    headers: {
      Authorization: `Bearer ${auth}`,
      "Content-Type": "application/json",
    },
    data: {
      customerId: id,
    },
  };

const UserDetail = () => {
    const [notes, setNotes] = useState("");

    useEffect(() => {
        axios(config).then((response) => {
          setNotes(response);
          console.log("%c user", "color:orange", notes);
        });
      }, []);

if(notes){
    productData = notes.data.data;
}
  return (
    <div className='user-container'>
        <Card sx={{ maxWidth: 345,height:500 }}>
      <CardMedia
        component="img"
        height="240"
        image={productData.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {productData.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} >
        Email: {productData.email}
      </Typography>
      <Typography sx={{ mb: 1.5 }} >
        Number: {productData.phonenumber}
      </Typography>
        <Typography variant="body2" color="text.secondary">
          Address:{productData.address}
        </Typography>
      </CardContent>
    </Card>
    </div>
  )
}

export default UserDetail