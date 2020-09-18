import React, { useState } from "react";
import { HashRouter } from "react-router-dom";
import {
  Layout,
  Col,
  Row,
  Typography,
  Card,
  Button,
  Form,
  Switch,
  Input,
  Collapse,
} from "antd";

import Routes from "./Routes";
import NavBar from "./components/NavBar";
import UserContext from "./context/UserContext";

import "./App.css";

import seaside from "./assets/seaside1.jpg";

const { Panel } = Collapse;
const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;

function callback(key) {
  console.log(key);
}
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const App = () => {
  const [user, setUser] = useState({});

  return (
    <HashRouter>
      <Layout>
        <UserContext.Provider value={{ user, setUser }}>
          <Header style={{ padding: 0 }}>
            <NavBar />
          </Header>
          <Content>
            
          </Content>
        </UserContext.Provider>
      </Layout>
    </HashRouter>
  );
};
export default App;
