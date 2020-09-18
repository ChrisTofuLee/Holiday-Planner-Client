import React from "react";
import { Row, Col, Image } from "antd";

import LoginContainer from "../containers/LoginContainer";

import palmTree from "../assets/palmTree.jpg";

const Login = () => {
  const ImageColumn = () => (
    <Col span={12}>
      <Image
        src={palmTree}
        style={{
          minHeight: "100vh",
          objectFit: "cover",
          backgroundSize: "50% 100%",
          height: "100%"
        }}
      />
    </Col>
  );

  const FormColumn = () => (
    <Col span={12}>
      <div style={{ marginTop: "25%" }}>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoginContainer />
        </div>
      </div>
    </Col>
  );

  return (
    <Row>
      <ImageColumn />
      <FormColumn />
    </Row>
  );
};

export default Login;
