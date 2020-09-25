import React from "react";
import { Row, Col, Image } from "antd";

import LoginContainer from "../containers/LoginContainer";

import palmTree from "../assets/palmTree.jpg";
import instructions from "../assets/a.png";

const Login = () => {
  const ImageColumn = () => (
    <Col
        span={12}
        style={{
          margin: "auto",
          height: "60%",
          width: "50%",
          verticalAlign: "middle",
          textAlign: "center",
        }}
      >
        <img src={instructions} />

      </Col>
  );

  const FormColumn = () => (
    <Col span={12}>
      <div style={{ marginTop: "20%" }}>
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
      
      <FormColumn />
      <ImageColumn />
    </Row>
  );
};

export default Login;
