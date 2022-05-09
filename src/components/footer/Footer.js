import React from "react";
import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import styledComponents from "styled-components";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Phone, Send, } from "@mui/icons-material";

const SocialIcon = styledComponents.div`
    width:40px;
    height:40px;
    border-radius:50%;
    color:white;
    background-color: #${(props) => props.color};
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:20px;
`;

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-left">
          <h1 className="footer-logo">LAMA.</h1>
          <p className="footer-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            quo reprehenderit aperiam tempora nobis sapiente beatae accusamus
            dignissimos similique assumenda culpa ipsum magnam quos ea itaque
            cupiditate eos, odio quibusdam!
          </p>
          <div className="footer-icon-container">
            <SocialIcon color="3b5999">
              <FacebookIcon />
            </SocialIcon>
            <SocialIcon color="e4405f">
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon color="55acee">
              <TwitterIcon />
            </SocialIcon>
            <SocialIcon color="e60023">
              <PinterestIcon />
            </SocialIcon>
          </div>
        </div>
        <div className="footer-center">
          <h3 className="footer-title">Useful Links</h3>
          <ul className="footer-list">
            <li className="footer-listItem">Home</li>
            <li className="footer-listItem">Cart</li>
            <li className="footer-listItem">My Account</li>
            <li className="footer-listItem">Wishlist</li>
            <li className="footer-listItem">Terms</li>
            <li className="footer-listItem">Home</li>
          </ul>
        </div>
        <div className="footer-right">
          <h3 className="footer-title">Contact</h3>
          <div className="contactItem"><LocationOnIcon style={{marginRight:"10px"}}/>2318, Lodhi Road Complex, Lodhi Road, Delhi</div>
          <div className="contactItem"><Phone style={{marginRight:"10px"}}/>01124648197</div>
          <div className="contactItem"><Send style={{marginRight:"10px"}}/>nikin87172@richdn.com</div>
          <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="payment" className="payment" />
        </div>
      </div>
    </>
  );
};

export default Footer;
