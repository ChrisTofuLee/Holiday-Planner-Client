import React, { useState, useContext } from "react";
import { Button, Card } from "antd";
import axios from "axios";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import UserContext from "../context/UserContext";

const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:8001" : "https://limitless-eyrie-86412.herokuapp.com";

const LoginContainer = () => {
  const [showLogin, setShowLogIn] = useState(true);
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);

  const handleFormToggle = () => {
    setShowLogIn(!showLogin);
    setError("");
  };

  const handleLoginSubmit = async ({ email, password }) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token } = data;
      const user = { email, token }
      localStorage.setItem("user", JSON.stringify(user))
// change destructured email & token to data if you want to include 'displayName'
      setUser({ email, token });
    } catch (error) {
      setError(`Login failed - ${error.message}`);
    }
  };

  const handleSignUpSubmit = async ({ email, password, displayName }) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        displayName,
      });

      const { token } = data;

      setUser({ email, token });
    } catch (error) {
      setError(`Sign up failed - ${error.message}`);
    }
  };

  return (<div>
    <h1 style={{ color: "white", textShadow: "2px 2px #FF4D4F" }}>Holiday Planner</h1>
    <Card
      title={showLogin ? "Log In" : "Sign Up"}
      headStyle={{

        color: "red",
        paddingLeft: "80px",
        fontSize: "30px",

      }}
      bordered={false}
      style={{
        width: 500,
        boxShadow: "-1px 3px 14px -6px rgba(120,111,120,.48)", borderRadius: "20px"
      }}
      extra={
        <Button
          shape="round"
          onClick={handleFormToggle}
          danger
          htmlType="button"
        >
          {!showLogin ? "Log In" : "Sign Up"}
        </Button>
      }
    >
      {showLogin ? (
        <LoginForm onSubmit={handleLoginSubmit} error={error} />
      ) : (
        <SignUpForm onSubmit={handleSignUpSubmit} error={error} />
      )}
    </Card>
    </div>
  );
};

export default LoginContainer;
