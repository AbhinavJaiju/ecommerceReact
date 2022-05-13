import React, { useEffect, useState } from "react";
import Announcement from "../../components/announcement/Announcement";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Newsletter from "../../components/newsletter/Newsletter";
import "./SingleProduct.css";
import jean from "../../assets/images/avi.jpg";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Reviews from "../../components/Reviews/Reviews";

const SingleProduct = () => {
  const [notes, setNotes] = useState([]);

  var productData = [];
  const productId = sessionStorage.getItem("productId");
  const auth = sessionStorage.getItem("token");
  console.log(productId);

  //data for axios
  var data = JSON.stringify({
    productId: parseInt(productId),
  });
  console.log(data);

  //config for axios

  useEffect(() => {
    var config = {
      method: "post",
      url: "http://localhost/ecommerce/admin/Api/singleproductdetail.php",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
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
    <div className="singleproduct-container">
      <Announcement />
      <Navbar />
      <div className="wrapper">
        <div className="img-container">
          <img className="product-image" src={productData.image} alt="jean" />
        </div>
        <div className="info-container">
          <h3 className="product-title">{productData.name}</h3>
          <p className="product-desc">{productData.description}</p>
          <span className="product-price"> {productData.price}</span>
          <div className="product-addcontainer">
            <div className="amount-container">
              <RemoveIcon />
              <span className="product-amount">1</span>
              <AddIcon />
            </div>
            <div className="button-div">
              <Button className="buynow" variant="outlined">
                Add to cart
              </Button>
              <Button className="buynow" variant="outlined" >
                Add to Wishlist
              </Button>
            </div>
          </div>
          <div className="product-specification">
            <h3>Specification</h3>
            <p>
              {productData.specification}
            </p>
          </div>
        </div>
        
      </div>
      <hr />
          <div className="product-reviews">
            <h3>Reviews</h3>
            <Reviews />
          </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default SingleProduct;
