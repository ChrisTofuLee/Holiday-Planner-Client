import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";

import Logo from "../assets/logoFinal.png";
import UserContext from "../context/UserContext";

const ProtectedRoutes = () => {
  const { setUser } = useContext(UserContext);

  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="app">
        <NavLink to="/">
          <img className="ant-menu-item" src={Logo} alt="logo" />
        </NavLink>
      </Menu.Item>
      <Menu.Item key="dashboard">
        <NavLink to="/dashboard">Dashboard</NavLink>
      </Menu.Item>
      <Menu.Item key="plans">
        <NavLink to="/plans">Plans</NavLink>
      </Menu.Item>
      <Menu.Item
        key="logout"
        style={{ float: "right" }}
        onClick={() => setUser({})}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default ProtectedRoutes;
