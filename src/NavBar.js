import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Button, Input } from "antd";
import Logo from "./assets/logoFinal.png";

const { Header, Content } = Layout;
const { Search } = Input;
const Navigation = () => {
  return (
    <Header>
      <nav>
        <img className="logo" alt="logo" src={Logo} />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{
            padding: "0px",
            margin: "0px",
            textAlign: "center",
            display: "inline-block",
            verticalAlign: "top",
          }}
        >
          <Menu.Item key="home">
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="plans">
            <NavLink to="/plans">plans</NavLink>
          </Menu.Item>
          <Menu.Item key="dashboard">
            <NavLink to="/dashboard">dashboard</NavLink>
          </Menu.Item>
          <Search
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
            style={{ width: 200, alignItems: "center" }}
          />
          <Menu.Item
            key="signOut"
            style={{ float: "right" }}
            className="float-right"
          >
            <NavLink to="/">
              <Button type="danger" ghost>
                Sign Out
              </Button>
            </NavLink>
          </Menu.Item>
        </Menu>
      </nav>
    </Header>
  );
};

export default Navigation;
