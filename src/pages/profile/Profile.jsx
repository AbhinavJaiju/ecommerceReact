import React, { useState, createContext, useContext } from "react";
import Footer from "../../components/footer/Footer";
import ProfileNavbar from "../../components/ProfileNavbar/ProfileNavbar";
import Announcement from "../../components/announcement/Announcement";
import Order from "../../components/order/Order";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { UNSAFE_RouteContext } from "react-router-dom";
import EditProfile from '../../components/editProfile/EditProfile';

const UserContext = createContext()

const Profile = () => {
  const [token,setToken] = useState(false);
  

  return (
    <>
    <UserContext.Provider value={token}>
      <Announcement />

      <ProfileNavbar props={token} />
      {token?<Order />:<EditProfile/>}
          
       

      <Footer />
      </UserContext.Provider>
    </>
  );
};

export default Profile;
