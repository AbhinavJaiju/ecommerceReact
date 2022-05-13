import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./Product.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  padding: 40px;
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
  margin: 30px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  padding:40px;

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
const url = "http://localhost/ecommerce/admin/Api/getproduct.php";
const customerId = sessionStorage.getItem("userId");
var productData = [];
const bodyParameters = {
  key: "value",
};
const auth = sessionStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${auth}`,
    "Content-Type": "application/json",
  },
};

const Products = () => {
  const [notes, setNotes] = useState("");
  const [value, setValue] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get("http://localhost/ecommerce/admin/Api/getproduct.php", config)
      .then((response) => {
        setNotes(response);
        console.log("%c Products", "color:orange", response.data);
      });
  };

  //   fetch('http://localhost/ecommerce/admin/Api/getproduct.php', {
  //     crossDomain:true,
  //     mode: 'no-cors',
  //     method: 'GET',
  //     headers:{
  //       'Authorization' : "Bearer" + auth,
  //       'Content-Type':'application/json'
  //        },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setNotes(data))
  // }
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

  const SingleProduct = (event)=>{
    event.preventDefault();
    navigate('/pages/singleProduct/SingleProduct');
    sessionStorage.setItem('productId',parseInt(value))
  }

  if (notes) {
    productData = notes.data.data;

  }
  return (
    <>
      <Container>
        {productData.map((items) => (
         
            <Container1 key={items.id}>
              <Circle />
              <img src={items.image} alt={items.image} className="productImg" />
              <Info>
                <Icon>
                  <ShoppingCartIcon />
                </Icon>
                <Icon>
                  <SearchIcon  value={items.id}
                    onFocus={(e) => setValue(items.id)}
                    edge="start"
                    tabIndex={0}
                    onClick={SingleProduct}/>
                </Icon>
                <Icon>
                  <FavoriteIcon
                    value={items.id}
                    onFocus={(e) => setValue(items.id)}
                    edge="start"
                    tabIndex={0}
                    onClick={AddtoWishlist}
                  />
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

export default Products;
