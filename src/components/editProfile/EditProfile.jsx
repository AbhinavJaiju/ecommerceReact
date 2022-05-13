import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "./EditProfile.css";
import axios from "axios";

import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";
import * as yup from "yup";



const currencies = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Other",
    label: "Other",
  },
];


const id = sessionStorage.getItem("userId");
const auth = sessionStorage.getItem("token");
var productData = [];
// const valPassword = () => {
//   var InputValue = $("#password").val();
//   var regex = new RegExp("^(?=.*[a-z]{2,})(?=.*[A-Z]{2,})(?=.*\d)(?=.*[@$!%*?&]{2,})[A-Za-z\d@$!%*?&]{6,15}$");
//   $("#passwordText").text(`Password value:- ${InputValue}`);
//   // if (productData.password == InputValue)
//   // {
//   //     $("#error").text("same password")
//   //     }
//   if (!regex.test(InputValue)) {
//       $("#error").text("Password should contain. 6-15 characters .atmost 2 special characters .min 2 uppercase characters .min 2 lowercase characters");
//   }
//   else {
//       $("#error").text("");
//   }
// }

const formdata = new FormData();
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

const EditProfile = () => {
  const [notes, setNotes] = useState("");
  const [form, setForm] = useState({});


const customerID = sessionStorage.getItem("userId");

  const [inputs, setInputs] = useState({"customerId" : id,
  "name" : productData.name,
  "phonenumber" : productData.phonenumber,
  "address" : productData.address,
  "email" : productData.email});


  
  var configg = {
    method: 'put',
    url: 'http://localhost/ecommerce/admin/Api/updatecustomer.php',
    headers: { 
      'Authorization':  `Bearer ${auth}`,
      'Content-Type': 'application/json'
    },
    data : inputs
  };

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    axios(configg)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("Changes made")
      console.log(formdata)
    })
    

  }

  useEffect(() => {
    axios(config).then((response) => {
      setNotes(response);
      console.log("%c user", "color:orange", notes);
    });
  }, [customerID]);

  if (notes) {
    productData = notes.data.data;
    console.log(productData);
  }

 


  return (
    <form onSubmit={handleSubmit}>
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "75ch" },
      }}
      noValidate
      autoComplete="off"
      className="box"
    >

      
        <TextField
          required
          id="customerId"
          label="customerid"
          name="customerId"
          defaultValue={productData.id}
          onLoad={handleChange}
          disabled
        />
       
      
      <div className="main-data">
        <TextField
          required
          id="name"
          name="name"
          label="Name"
          defaultValue={productData.name}
          onBlur={handleChange}
        
        />
        

        <TextField
          required
          id="email"
          name = "email"
          label="Email"
          defaultValue={productData.email}
          
          onBlur={handleChange}

          />
             <TextField
          name="address"
          id="address"
          aria-label="maximum height"
          placeholder="Address"
          label="Address"
          defaultValue={productData.address}
          
        onBlur={handleChange}
          multiline
          rows={4}
        />
       
       
        <TextField
          id="phonenumber"
          name="phonenumber"
          label="Phone Number"
          defaultValue={productData.phonenumber}
          onBlur={handleChange}
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+91</InputAdornment>
            ),
          }}
        />
     
        {/* <input
          required
          id="standard-required"
          label="Required"
          defaultValue="Hello World"
          variant="standard"
        /> */}
      </div>
    </Box>
    <Button
              variant="outlined"
              type="submit"
            >
              Submit
            </Button>
    </form>
  );
};

export default EditProfile;
