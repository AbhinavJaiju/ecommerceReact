import React, { useState, createContext, userContext } from "react";
import Footer from "../../components/footer/Footer";
import EditProfile from '../../components/editProfile/EditProfile';
import Announcement from "../../components/announcement/Announcement";
import SideTabs from '../../components/sideTabls/SideTabs'

import './Profile.css'


import Navbar from "../../components/navbar/Navbar";



const Profile = () => {


  return (
    <div className="container">
      <Announcement />
      <Navbar/>
     <SideTabs />

      <Footer />
    </div>
  );
};

export default Profile;
