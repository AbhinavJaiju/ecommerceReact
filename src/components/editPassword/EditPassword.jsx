import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "./EditPassword.css";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import PasswordIcon from "@mui/icons-material/Password";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";



const validationSchema = yup.object({
  passwords: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .max(15, "Password should be of maximum 15 characters length")
    .required("Password is required")
    .matches("[0-9]+", "Password Should contain a number")
    .matches("[A-Z]+", "Password Should contain a Upper Case")
    .matches("[a-z]+", "Password Should contain a Lower Case")
    .oneOf([yup.ref("password"), null], "Passwords must match, should be same as new password"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .max(15, "Password should be of maximum 15 characters length")
    .required("Password is required")
    .matches("[0-9]+", "Password Should contain a number")
    .matches("[A-Z]+", "Password Should contain a Upper Case")
    .matches("[a-z]+", "Password Should contain a Lower Case"),
});
const id = sessionStorage.getItem("userId");
const auth = sessionStorage.getItem("token");
var productData = [];



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

const EditPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notes, setNotes] = useState("");
  const [pass, setPass] = useState("");

  console.log(pass);

  useEffect(() => {
    axios(config).then((response) => {
      setNotes(response);
      console.log("%c user", "color:orange", notes);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      passwords: "",
      customerId: id,
    },
    validateOnMount: true,
    validationSchema: validationSchema,

    onSubmit: (values) => {
      var configpass = {
        method: "put",
        url: "http://localhost/ecommerce/admin/Api/updatecustomer.php",
        headers: {
          Authorization: `Bearer ${auth}`,
          "Content-Type": "application/json",
        },
        data: {
          passwords: formik.values.password,
          customerId: id,
        },
      };

      setIsSubmitting(true);
      console.log(JSON.stringify(values, null, 1));
      axios(configpass)
        .then(function (response) {
          console.log(response.data);
          console.warn(response.status);
          if (response) {
            alert("password updated");
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
  if (notes) {
    productData = notes.data.data;
    console.log(productData);
  }
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
      <TextField
          required
          fullWidth
          id="outlined-required"
          label="Enter present password"
          value = {pass}
          onChange = {(event)=>{setPass(event.target.value)}}
          helperText={pass === productData.password?"Correct":"Password not same"}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="New Password"
          type="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="passwords"
          name="passwords"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          value={formik.values.passwords}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.passwords && Boolean(formik.errors.passwords)}
          helperText={formik.touched.passwords && formik.errors.passwords}
        />
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default EditPassword;
