
import React, { useEffect, useState } from "react";
import { Form, Input, message, Button, Space, Card, Select } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from 'antd';



const id = sessionStorage.getItem("userId");
const auth = sessionStorage.getItem("token");
var productData = [];

var config = {
    method: "post",
    url: "http://localhost/ecommerce/admin/Api/getuserdetails.php",
    headers: {
      Authorization: `Bearer ${auth}`,
      "Content-Type": "application/json",
    },
    data: {
      customerId: id,
    },
  };

function UpdateProfile() {

    const [notes, setNotes] = useState("");
  let navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    axios(config).then((response) => {
      setNotes(response);
      console.log("%c user", "color:orange", notes)
      productData = notes.data.data;

      if (localStorage.getItem("token")) {
        console.log(productData);
  
           form.setFieldsValue({
             userId:productData.id,
             userName:productData.name,
             email:productData.email,
             phoneNumber: productData.phonenumber,
             gender:productData.gender,
             address:productData.address
         });
      } else {
        navigate("/");
      }
    });
  }, []);

  const onFinish = (values) => {
      let data = JSON.stringify(values)
      var configg = {
        method: 'put',
        url: 'http://localhost/ecommerce/admin/Api/updatecustomer.php',
        headers: { 
          'Authorization':  `Bearer ${auth}`,
          'Content-Type': 'application/json'
        },
        data : data
      };
    console.log(data);
    axios(configg)
      .then((res)=>{
        console.log(res);
      
        <Alert
      message="Success"
      description="Profile updates successfully"
      type="success"
      showIcon
      closable
    />
        
        // else{
        //     <Alert
        //     message="Error"
        //     description="Unable to update. Please try again!"
        //     type="error"
        //     showIcon
        //     closable
        //   />
        // }
      } );
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  return (
    <div className="editForm">
      <LeftOutlined onClick={() => navigate("/admin/profile")} />
      <Card title='Profile'>
          <h3>User Id: {productData.id}</h3>
        <Form
          validateMessages={validateMessages}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off" 
        >
          <Form.Item label="userId" name="userId" >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="userName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                  required: true,
                type: "email",
              },
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>
          
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                min: 10,
                max: 12,
              },
            ]}
          >
            <Input placeholder="Enter Phone Number" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select Gender" >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                  required: true,
                type: "text",
              },
            ]}
          >
            <Input placeholder="Enter Address" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" >
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default UpdateProfile;
