import React from "react";
import { Row, Col, Image } from "antd";

import LoginContainer from "../containers/LoginContainer";

import palmTree from "../assets/palmTree.jpg";

const Login = () => {
  const ImageColumn = () => (
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
        <h1 style={{ color: "white", textShadow: "2px 2px #FF4D4F" }}>
          Holiday Planner
        </h1>
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
    <Row style={{
      minHeight: "93.5vh",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${palmTree})`,
      backgroundSize: "50% 100%",
    }}>
      <ImageColumn />
      <FormColumn />
    </Row>
  );
};

export default Login;
