import React from "react";
import "./Register.css";

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-wrapper">
        <h1 className="register-title">CREATE AN ACCOUNT</h1>
        <form action="" className="register-form">
          <div className="register-inputcontainer">
            <input type="text" placeholder="Name" className="register-input" />
            <input
              type="text"
              placeholder="Last name"
              className="register-input"
            />
            <input
              type="text"
              placeholder="userName"
              className="register-input"
            />
            <input
              type="text"
              placeholder="Password"
              className="register-input"
            />
            <input
              type="text"
              placeholder="Confirm Password"
              className="register-input"
            />
          </div>
          <h5 className="register-terms">Terms and conditions</h5>
          <span className="register-agreement">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea odio hic
            tenetur nemo! Sed, pariatur. Ipsa eligendi totam consequuntur
            assumenda optio quisquam, iusto pariatur a, nam aperiam asperiores
            provident odio?
          </span>
          <button className="register-button">CREATE</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
