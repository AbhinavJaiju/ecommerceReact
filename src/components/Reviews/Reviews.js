import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ListItemIcon from "@mui/material/ListItemIcon";

const Reviews = () => {
  const [notes, setNotes] = useState([]);
  var productData = [];
  const productId = sessionStorage.getItem("productId");
  const auth = sessionStorage.getItem("token");
  console.log(productId);

  //data for axios
  var data = JSON.stringify({
    productId: parseInt(productId)
  });
  console.log(data);

  //config for axios

  useEffect(() => {
    var config = {
      method: "post",
      url: "http://localhost/ecommerce/admin/Api/reviews.php",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setNotes(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (notes) {
    productData = notes;
  }
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {productData.map((items) => {
          return (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" />
                </ListItemAvatar>
                <ListItemText
                  primary={items.customerName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                       
                      </Typography>
                     {items.review}
                    </React.Fragment>
                  }
                />
                <ListItemIcon>
                  
                  <CalendarTodayIcon />
                  {items.createdDate}
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

export default Reviews;
