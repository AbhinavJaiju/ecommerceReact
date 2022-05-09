import React from "react";
import styled from "styled-components";
import "./Navber.css";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { Link } from "react-router-dom";
import Profile from "../../pages/profile/Profile1";
import { useNavigate } from "react-router-dom";


const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left:25px;
`;


const Navbar = () => {
  const userName = sessionStorage.getItem('userName')
  let navigate = useNavigate();


const Logout = ()=>{
  sessionStorage.clear('userId')
  sessionStorage.clear('userName')
  sessionStorage.clear('token')
  navigate('/components/auth/Login');
}

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-left">
          <div className="navbar-language"><Link to="/pages/profile/Profile1">{userName}</Link></div>
          
        </div>
        <div className="navbar-center">
          <h1 className="logo"><Link to="/pages/Home">E-commerce</Link></h1>
        </div>
        <div className="navbar-right">
          <MenuItem><Link to="">{}</Link></MenuItem>
          <MenuItem><Link to="/pages/ProductList">Products</Link></MenuItem>
          <MenuItem><Link to="/pages/register/Register">Register</Link></MenuItem>
          <MenuItem onClick={Logout}>Log Out</MenuItem>
          <MenuItem>
            <IconButton aria-label="cart">
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </MenuItem>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
