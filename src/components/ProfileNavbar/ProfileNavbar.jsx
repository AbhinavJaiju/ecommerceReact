import React, { useEffect } from "react";
import styled from "styled-components";
import "./ProfileNavbar.css";
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left:25px;
`;



const ProfileNavbar = (props) => {
    const userName = sessionStorage.getItem('Name')
    const [value, setValue] = useState(false)

    const handleChange = ()=>{
     props = setValue;
}


    let navigate = useNavigate();
    useEffect(()=>{
      handleChange();
    },[value])
    const Logout = ()=>{
        localStorage.clear()
        navigate('../../components/auth/Login')
    }
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-left">

          <div className="navbar-language">{userName}</div>
        </div>
        <div className="navbar-center">
          <h1 className="logo">E-commerce</h1>
        </div>
        <div className="navbar-right">
          <MenuItem><Link to="">{}</Link></MenuItem>
          <MenuItem><Link to="/pages/profile/EditProfile" onClick={handleChange}>Edit Profile</Link></MenuItem>
          <MenuItem onClick={Logout}>Logout</MenuItem>
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
  )
}

export default ProfileNavbar