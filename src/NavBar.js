import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Button, Input } from "antd";
import Logo from "./assets/logoFinal.png";

const { Header, Content } = Layout;
const { Search } = Input;
const Navigation = () => {
  return (
    <Header style={{ opacity: "80%" }}>
      <nav>
        <img className="logo" alt="logo" src={Logo} />
        <Menu
          // theme="dark"
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
        </Menu>
        
        <NavLink to="/">
          <div
            style={{
              float: "right",
              display: "table-cell",
              verticalAlign: "middle",
            }}
          ></div>
          <Button
            type="danger"
            ghost
            key="signOut"
            style={{ marginTop: "15px"}}
            className="float-right"
          >
            Sign Out
          </Button>
        </NavLink>
      </nav>
    </Header>
  );
};

export default Navigation;
