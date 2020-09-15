import React from "react";

import { Input, Button, Form, Alert } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SignUpForm = ({ onSubmit, error }) => {
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email",
          },
        ]}
        style={{ width: "90%", padding: "10px 0px" }}
      >
        <Input placeholder="the.one@example.com" />
      </Form.Item>
      <Form.Item
        label="Display Name"
        name="displayName"
        rules={[
          {
            required: true,
            message: "Please input your display name",
          },
        ]}
        style={{ width: "90%", padding: "10px 0px" }}
      >
        <Input placeholder="Neo" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password",
          },
        ]}
        style={{ width: "90%", padding: "10px 0px" }}
      >
        <Input.Password placeholder="*******" />
      </Form.Item>
      <Form.Item
        style={{
          paddingTop: "10px",
          justifyContent: "center",
        }}
      >
        <Button
          shape="round"
          style={{ width: "120px" }}
          size="large"
          danger
          type="primary"
          htmlType="submit"
        >
          Sign Up
        </Button>
      </Form.Item>
      {error ? <Alert message={error} type="error" /> : null}
    </Form>
  );
};

export default SignUpForm;
