import React, { useState } from "react";
import { HashRouter } from "react-router-dom";
import { Layout } from "antd";

import Routes from "./Routes";
import NavBar from "./components/NavBar";
import UserContext from "./context/UserContext";

import "./App.css";

const { Header, Footer, Content } = Layout;

const App = () => {
  const localUser = localStorage.getItem("user");
  const parsedLocalUser = JSON.parse(localUser);
  const [user, setUser] = useState(parsedLocalUser || {});
  
  return (
    <HashRouter>
      <Layout>
        <UserContext.Provider value={{ user, setUser }}>
          <Header style={{ padding: 0 }}>
            <NavBar />
          </Header>
          <Content>
            <Routes />
          </Content>
        </UserContext.Provider>
        <Footer>Footer</Footer>
      </Layout>
    </HashRouter>
  );
};
export default App;
