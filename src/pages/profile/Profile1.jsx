import React from "react";
import Footer from "../../components/footer/Footer";
import Announcement from "../../components/announcement/Announcement";
import SideTabs from "../../components/sideTabls/SideTabs";
import Newsletter from "../../components/newsletter/Newsletter";
import UserDetail from "../../components/userdetail/UserDetail";
import { withRouter} from "react-router-dom";

import "./Profile.css";

import Navbar from "../../components/navbar/Navbar";

const Profile = () => {
  return (
    <div className="profile-container">
      <Announcement />
      <Navbar />
      <div className="data-container">
        <div className="profile-userdetail">
          <UserDetail />
        </div>
        <div className="profile-sidetabs">
          <SideTabs />
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Profile;
