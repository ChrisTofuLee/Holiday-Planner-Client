import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";

import Logo from "../assets/logoFinal.png";
import UserContext from "../context/UserContext";
import ProtectedRoutes from "./ProtectedRoutes";

const NavBar = () => {
  const { user } = useContext(UserContext);
  if (user.token) {
    return <ProtectedRoutes />;
  }
  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="app">
        <NavLink to="/">
          <img className="ant-menu-item" src={Logo} alt="logo" />
        </NavLink>
      </Menu.Item>
      <Menu.Item key="login" style={{ float: "right" }}>
        <NavLink to="/login">Login</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
