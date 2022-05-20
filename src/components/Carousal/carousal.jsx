import React from "react";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import "./carousal.css";

var config = {
  method: "get",
  url: "http://localhost/ecommerce/admin/Api/banner.php",
  headers: {},
};
var productData = [];

const Carousal = () => {
  const [banner, setBanner] = useState();
  useEffect(() => {
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.data));
        setBanner(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  },[]);
  if (banner) {
    productData = banner.data;
    console.log(productData)
    console.log(banner);
  }
  return (
    <Carousel autoPlay>
      {productData.map((items)=>(
    <div className="carousalContainer">
      <img src={items.image} alt="" key={items.id} className="carousal-image"/>
    </div>
    ))}
    </Carousel>
  );
};

export default Carousal;
