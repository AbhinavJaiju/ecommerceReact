import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "./EditProfile.css";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import PasswordIcon from "@mui/icons-material/Password";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";




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
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  passwords: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .max(15, "Password should be of maximum 15 characters length")
    .required("Password is required"),
});

const EditProfile = () => {
  const [notes, setNotes] = useState("");
  const [showResults, setShowResults] = React.useState(false);
  const [inputs, setInputs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const onClick = () => setShowResults(true);
  const onClick1 = () => setShowResults(false);

  
  var configg = {
    method: 'put',
    url: 'http://localhost/ecommerce/admin/Api/updatecustomer.php',
    headers: { 
      'Authorization':  `Bearer ${auth}`,
      'Content-Type': 'application/json'
    },
    data : inputs
  };

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputs(values => ({...values, [name]: value}))
  // }
  const formik = useFormik({
    initialValues: {
      name: productData.name,
      passwords: "",
      address:productData.address,
      phonenumber:productData.phonenumber,
      email:productData.email,
    },
    validateOnMount: true,
    validationSchema: validationSchema,

    onSubmit: (values) => {
      setIsSubmitting(true);
      console.log(JSON.stringify(values, null, 2));
      axios(configg)
      .then(function (response) {
        console.log(JSON.stringify(response));
     
          if (response) {
            alert("updated");
          } else {
            alert("Invalid Credentials Please try again");
            setIsSubmitting(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    axios(configg)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if(response){
        alert("User details updated")
      }
    })

  }

  useEffect(() => {
    axios(config).then((response) => {
      setNotes(response);
      console.log("%c user", "color:orange", notes);
    });
  }, []);

 

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
          helperText="customerid"
          name="customerId"
          defaultValue={productData.id}
          value = {formik.values.id}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          variant="standard"
          
        />
      
      <div className="main-data">
         
        <TextField
          required
          id="name"
          helperText="Name"
          name="name"
          defaultValue={productData.name}
          value = {formik.values.name}
          onBlur={formik.handleBlur}
          variant="standard"
          onChange={formik.handleChange}
        />
        

        <TextField
          required
          id="email"
          name = "email"
          helperText="email"
          defaultValue={productData.email}
          value = {formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          />
          
        <TextareaAutosize
          maxRows={10}
          name="address"
          id="address"
          aria-label="maximum height"
          placeholder="Address"
          defaultValue={productData.address}
          onChange={formik.handleChange}
        onBlur={formik.handleBlur}
          style={{ width: 650, height: 200 }}
        />
       
        <TextField
          id="phonenumber"
          name="phonenumber"
          helperText="PhoneNumber"
          defaultValue={productData.phonenumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+91</InputAdornment>
            ),
          }}
          variant="standard"
        />
     
        {/* <input
          required
          id="standard-required"
          label="Required"
          defaultValue="Hello World"
          variant="standard"
        /> */}
        <Button
          variant="outlined"
          onClick={onClick}
          startIcon={<PasswordIcon />}
        >
          Change password
        </Button>

        {showResults ? (
          <>
          
            <TextField
              required
              id="email"
              helperText="Enter Present Password"
              defaultValue=""
              variant="standard"
            />
           
           
            <TextField
              required
              name="password"
              placeholder="Enter Password"
              value={formik.values.passwords}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.passwords && Boolean(formik.errors.passwords)
                }
                helperText={formik.touched.passwords && formik.errors.passwords}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="input-feedback">{formik.errors.password}</div>
              )}
            
            <TextField
              required
              type="password"
              name="confirmPassword"
              placeholder="Enter Confirm Password"
              value={formik.values.passwords}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.passwords && Boolean(formik.errors.passwords)
                }
                helperText={formik.touched.passwords && formik.errors.passwords}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="input-feedback">{formik.errors.password}</div>
              )}
            <Button
              variant="outlined"
              onClick={onClick1}
              startIcon={<PasswordIcon />}
            >
              Close
            </Button>
          </>
        ) : null}
      </div>
    </Box>
    <Button
              variant="outlined"
              type="submit"
              disabled={!formik.isValid || isSubmitting}
            >
              Submit
            </Button>
    </form>
  );
};

export default EditProfile;
