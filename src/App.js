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
        <div>
          <Header style={{ padding: 0, height: "6.5vh"}}>
            <NavBar />
          </Header>
          <Content>
            <Routes />
          </Content>
          </div>
        </UserContext.Provider>
        <Footer style={{position: "fixed",
  bottom: "0", width: "100%", opacity: "50%"}}>Footer</Footer>
      </Layout>
    </HashRouter>
  );
};
export default App;
