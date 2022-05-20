import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./wishList.css";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var productData = [];
const customerId = sessionStorage.getItem("userId");
const auth = sessionStorage.getItem("token");
var datas = JSON.stringify({
  customerId: customerId,
});
var config = {
  method: "post",
  url: "http://localhost/ecommerce/admin/Api/wishlistDetails.php",
  headers: {
    Authorization: `Bearer ${auth}`,
    "Content-Type": "application/json",
  },
  data: datas,
};

const Products = () => {
  const [notes, setNotes] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios(config)
      .then(function (response) {
        console.log(response.data);
        setNotes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const DeleteItem = (event) => {
    event.preventDefault();

    //data to be passed in the ai
    var data = JSON.stringify({
      customerId: parseInt(customerId),
      productId: parseInt(value),
    });


    //config for the api
    var config = {
      method: 'delete',
      url: 'http://localhost/ecommerce/admin/Api/deleteitemfromwishlist.php',
      headers: { 
        'Authorization': `Bearer ${auth}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    //calling api to delete from wishlist
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data.message));
      toast(response.data.message);
      getProducts();
    })
    .catch(function (error) {
      console.log(error);
    });


    
  };

  //
  if (notes) {
    productData = notes.data;
  }
  return (
    <>
      <h2>Wish List</h2>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {productData.map((items) => {
          return (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={items.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={items.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Price : 
                      </Typography>
                      {items.price}
                    </React.Fragment>
                  }
                />
                <ListItemIcon>
                  
                  <DeleteForeverIcon value={items.id} onFocus={(e) =>(setValue(items.id))} edge="start" tabIndex={0}  onClick={DeleteItem} />
                </ListItemIcon>
              </ListItem>

              <Divider variant="inset" component="li" />
            </>
          );
        })}
      </List>
      <ToastContainer />
    </>
  );
};

export default Products;
