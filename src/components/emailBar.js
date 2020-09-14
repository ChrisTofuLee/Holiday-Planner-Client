import React from "react";
import { Input, Form } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EmailBar = (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (props.abc) {
    return (
      <div>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
          style={{ width: "90%", paddingTop: "20px" }}
        >
          <Input placeholder="the.one@example.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          style={{ width: "90%" }}
        >
          <Input.Password placeholder="*******" />
        </Form.Item>
      </div>
    );
  } else {
    return (
      <div>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
          style={{ width: "90%", paddingTop: "20px" }}
        >
          <Input placeholder="the.one@example.com" />
        </Form.Item>
        <Form.Item
          label="Display Name"
          name="Display Name"
          rules={[
            {
              required: true,
              message: "Please input your Display Name!",
            },
          ]}
          style={{ width: "90%" }}
        >
          <Input placeholder="Neo" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          style={{ width: "90%" }}
        >
          <Input.Password placeholder="*******" />
        </Form.Item>
      </div>
    );
  }
};

export default EmailBar;
