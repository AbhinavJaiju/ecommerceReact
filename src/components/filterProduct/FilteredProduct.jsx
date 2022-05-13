import "./FilteredProduct.css";
import React from "react";
import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container1 = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  flex-direction:column;


  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const imgPath = "../../assets/images/";

const url = "http://localhost/ecommerce/admin/Api/getfilteredproduct.php";
var productData = [];
const customerId = sessionStorage.getItem("userId");
const auth = sessionStorage.getItem("token");

const FilteredProduct = (props) => {
  const [notes, setNotes] = useState("");
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(props.props);
    console.log({ categoryId: props.props });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId: props.props }),
    };
    fetch(
      "http://localhost/ecommerce/admin/Api/getfilteredproduct.php",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setNotes(data));

    console.log(notes);
    console.log(typeof notes);
  }, [props]);



  const AddtoWishlist = (event) => {
    event.preventDefault();
    var data = JSON.stringify({
      customerId: customerId,
      productId: parseInt(value),
    });
    console.log(data);

    var config = {
      method: "post",
      url: "http://localhost/ecommerce/admin/Api/addtowishlist.php",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    //adding product to wishlist
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.message));
        toast(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  if (notes) {
    productData = notes.data;
  }

  return (
    <>
      <Container>
        {productData.map((items) => (
          <Container1 key={items.id}>
            <Circle />
            {console.log(imgPath.concat(items.image))};
            <img
              src={items.image}
              alt={items.name}
              className="productImg"
            />
            <Info>
              <Icon>
                <ShoppingCartIcon />
              </Icon>
              <Icon>
                <SearchIcon />
              </Icon>
              <Icon>
                <FavoriteIcon  value={items.id}
                    onFocus={(e) => setValue(items.id)}
                    edge="start"
                    tabIndex={0}
                    onClick={AddtoWishlist}/>
              </Icon>
            </Info>
            <h3 className="product-name">{items.name}</h3>
            
          </Container1>
          
        ))}
      </Container>
      <ToastContainer />
    </>
  );
};

export default FilteredProduct;
