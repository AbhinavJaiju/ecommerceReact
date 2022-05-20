import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { ChangePasswordForm } from "./changePasswordForm";
import axios from "axios";

const ChangePassword = () => {
  let navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const auth = sessionStorage.getItem("token");

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    var configpass = {
      method: "put",
      url: "http://localhost/ecommerce/admin/Api/editpassword.php",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(values, null, 4),
    };

    axios(configpass)
      .then(function (response) {
        console.warn(response.status);
        alert(response.message);
      })
      .catch(function (error) {});
  }


  return (
    <div>
       <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Change Password
      </Button>
      <ChangePasswordForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default ChangePassword;
