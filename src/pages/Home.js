import React from "react";
import { Row, Col, Input, Button, Card, Form } from "antd";

const { Search } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Home = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row style={{}}>
      <Col
        span={12}
        style={{
          margin: "auto",
          height: "60%",
          width: "50%",
          paddingTop: "100px",
          verticalAlign: "middle",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "white", textShadow: "2px 2px #153438" }}>
          Holiday Planner
        </h1>
      </Col>
      <Col span={12}>
        <div className="container" style={{ width: "80%" }}>
          <div className="jumbotron mx-auto" style={{ marginTop: "20%" }}>
            <div
              style={{
                textAlign: "center",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                title="Log In"
                headStyle={{ backgroundColor: "#FAFAFA", color: "red", fontSize: "30px" }}
                bordered={false}
                style={{ width: 500 }}
              >
                <Form
                  {...layout}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                    style={{ width: "90%" }}
                  >
                    <Input placeholder="the.one@example.com"  />
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

                  {/* <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

                  <Form.Item
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      shape="round"
                      style={{ marginRight: "20px", marginBottom: "20px", width: "120px"}}
                      size="large"
                      danger
                      type="primary"
                      htmlType="submit"
                    >
                      Log In
                    </Button>
                    <Button shape="round" style={{width: "120px"}} danger size="large" htmlType="submit">
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
            
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Home;

{
  /* <Search
  placeholder="input search text"
  onSearch={(value) => console.log(value)}
  style={{
    margin: "auto",
    float: "center",
    width: 200,
    alignItems: "center",
  }}
/>; */
}
