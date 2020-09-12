import React from "react";
import { HashRouter } from "react-router-dom";

import Navigation from "./NavBar";
import Routes from "./Routes";
// import Header from "./components/Header";
import 'antd/dist/antd.css'

const App = () => {
  return (
    <HashRouter>
      <Navigation />
      <div className="container my-4">
        {/* <Header /> */}
        <Routes />
      </div>
    </HashRouter>
  );
};
export default App;
