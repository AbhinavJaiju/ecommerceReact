import React from "react";
import Announcement from "../../components/announcement/Announcement";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Newsletter from "../../components/newsletter/Newsletter";
import "./SingleProduct.css";
import jean from "../../assets/images/avi.jpg";
import Button from "@mui/material/Button";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const SingleProduct = () => {
  return (
    <div className="singleproduct-container">
      <Navbar />
      <Announcement />
      <div className="wrapper">
        <div className="img-container">
          <img className="product-image" src={jean} alt="jean" />
        </div>
        <div className="info-container">
          <h3 className="product-title">Denim Jumpsuit</h3>
          <p className="product-desc">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
            culpa voluptate consequatur mollitia minus provident eligendi
            deleniti molestiae. Deserunt voluptates aliquid odit perferendis
            voluptatem tenetur ipsam illo tempora sed ex!
          </p>
          <span className="product-price"> $20</span>
          <div className="product-addcontainer">
            <div className="amount-container">
              <RemoveIcon/>
              <span className="product-amount">1</span>
              <AddIcon />
            </div>
            <div className="button-div">
              <Button className="buynow" variant="outlined">
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="product-specification">
        <h3>Specification</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa rem
          quis, et necessitatibus corrupti autem nostrum omnis ipsam,
          accusantium minus eos perspiciatis libero, inventore repellat? Ab
          omnis repellat eligendi totam?
        </p>
      </div>
      <hr />
      <div className="product-reviews">
        <h3>Reviews</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum sed
          similique ratione nobis totam doloremque laudantium aliquid provident
          fugit optio. Natus provident reiciendis, pariatur a nesciunt quidem
          eaque deleniti repellat?
        </p>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default SingleProduct;
