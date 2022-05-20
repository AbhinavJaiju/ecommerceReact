import React, { useState } from "react";
import { Form, Input, SubmitButton, ResetButton } from "formik-antd";
import { Formik, ErrorMessage, validateYupSchema } from "formik";
import * as Yup from "yup";
import { Modal } from "antd";
import {
  ValidatePassword,
  yupToFormErrors,
} from "../../Utils/validatePassword";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import "./changePassword.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const passwordSchema = Yup.object().shape({
  confirmPassword: Yup.string("Enter your password")
  .required("Password is required")
  .oneOf(
    [Yup.ref("password"), null],
    "match_password"
  ),
  password: Yup.string("Enter your password")
    .min(6, "minLength_6")
    .max(15, "maxLength15")
    .required("Password is required")
    .matches("[0-9]+", "contain_number")
    .matches(/[A-Z].*[A-Z]/, "contain_2_upperCase")
    .matches(/[a-z].*[a-z]/, "contain_2_lowerCase")
    .test(
      "atMost2SpecialCharacters",
      "Atmost 2 special characters are allowed!",
      function (value) {
        return new Promise((resolve) => {
          const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi;
          const allFoundCharacters = value.match(specialChars);
          if (allFoundCharacters && allFoundCharacters.length > 2) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      }
    ),
});
const id = sessionStorage.getItem("userId");
const auth = sessionStorage.getItem("token");

export const ChangePasswordForm = ({ visible, onCreate, onCancel }) => {
  // Enable and Disable the submit button
  const [formData, setFormData] = useState(null);
  const [enable, setEnable] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateYupSchemaMultiErrors = async (values, schema) => {
    if (values && values.currentPassword) {
      setFormData({
        currentPassword: values.currentPassword,
        password: values.password,
        confirmPassword: values.confirmPassword,
        customerId: id,
      });
      setEnable(true)
    }
    try {
      await validateYupSchema(values, schema);
      return {};
    } catch (e) {
      return yupToFormErrors(e, { showMultipleFieldErrors: true });
    }
  };
  const submitHandler = ()=>{
    var configpass = {
      method: "put",
      url: "http://localhost/ecommerce/admin/Api/editpassword.php",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
      data: formData
    };

    axios(configpass)
      .then(function (response) {
        console.warn(response.status);
        console.log(JSON.stringify(response.data.message));
        toast(response.data.message);
      })
      .catch(function (error) {});
  }
  return (
    <Modal
      closable="true"
      title="Change Password"
      maskClosable="true"
      onCancel={onCancel}
      visible={visible}
      footer={null}
    >
      <Formik
        // validationSchema={passwordSchema}
        initialValues={{
          currentPassword: "",
          password: "",
          confirmPassword: "",
          customerId: id,
        }}
        // validate={(values) => {
        //   const errors = validateYupSchema(values, passwordSchema);
        //   console.log(errors);
        //   return errors;
        // }}
        // onSubmit={(values, props) => onhandleSubmit(values, props)}
        validate={(values) =>
          validateYupSchemaMultiErrors(values, passwordSchema)
        }
        key="PrimaryDetails"
        onSubmit={submitHandler}
      >
        {(props) => (
          <Form layout="vertical" name="changePassword">
            <Form.Item name="currentPassword" label="Current Password">
              <Input.Password
                name="currentPassword"
                placeholder="Enter your current password"
              />
            </Form.Item>
            <Form.Item name="password" label="New Password">
              <Input.Password
                name="password"
                placeholder="Enter your new password"
              />
            </Form.Item>
            {/* Icon start here */}
            <div className="label-container">
              <label
                htmlFor="password"
                className={ValidatePassword(props, "contain_number")}
              >
                {ValidatePassword(props, "contain_number") === "Inactive" ? (
                  <CheckCircleOutlinedIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                Should contain a number
              </label>
              <label
                htmlFor="password"
                className={ValidatePassword(props, "contain_2_upperCase")}
              >
                {ValidatePassword(props, "contain_2_upperCase") ===
                "Inactive" ? (
                  <CheckCircleOutlinedIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                Should contain 2 upper case
              </label>
              <label
                htmlFor="password"
                className={ValidatePassword(props, "contain_2_lowerCase")}
              >
                {ValidatePassword(props, "contain_2_lowerCase") ===
                "Inactive" ? (
                  <CheckCircleOutlinedIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                Should contain 2 lower case
              </label>
              <label
                htmlFor="password"
                className={ValidatePassword(props, "minLength_6")}
              >
                {ValidatePassword(props, "minLength_6") === "Inactive" ? (
                  <CheckCircleOutlinedIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                password should have minimum 6 characters
              </label>
              <label
                htmlFor="password"
                className={ValidatePassword(props, "maxLength15")}
              >
                {ValidatePassword(props, "maxLength15") === "Inactive" ? (
                  <CheckCircleOutlinedIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                password should have maximum 15 characters
              </label>
              <label
                htmlFor="password"
                className={ValidatePassword(props, "atMost2SpecialCharacters")}
              >
                {ValidatePassword(props, "atMost2SpecialCharacters") ===
                "Inactive" ? (
                  <CheckCircleOutlinedIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                password should atmost 2 special characters
              </label>
            </div>
            {/* Icon End Here */}

            <Form.Item name="confirmPassword" label="Confirm Password">
              <Input.Password
                name="confirmPassword"
                placeholder="Re-enter your new password"
              />
            </Form.Item>
            <div className="label-container">
              <label
                htmlFor="confirmPassword"
                className={ValidatePassword(props, "match_password")}
              >
                {ValidatePassword(props, "match_password") === "Active" ? (
                  <CheckCircleOutlinedIcon />
                ) : (
                  <CircleOutlinedIcon />
                )}
                Password should match
              </label>
            </div>

            <Button type="submit" disabled={isSubmitting}> Submit </Button>
            <ResetButton > Reset </ResetButton>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </Modal>
  );
};
