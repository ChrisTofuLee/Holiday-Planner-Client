import React, { useState } from "react";
import { HashRouter } from "react-router-dom";
import Navigation from "./NavBar";
import Routes from "./Routes";
// import Header from "./components/Header";
import "./App.css";
import palmTree from "./assets/palmTree.jpg";

const App = () => {
  const [backgroundImage, setBackgroundImage] = useState(`url(${palmTree})`);
  const [backgroundSize, setBackgroundSize] = useState("50% 100%");
  
  return (
    <HashRouter>
      <div
        style={{
          minHeight: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundImage: backgroundImage,
          backgroundSize: backgroundSize,
        }}
      >
        <Navigation />
        {/* <div className="container my-4"> */}
        {/* <Header /> */}
        <Routes />
        {/* </div> */}
      </div>
    </HashRouter>
  );
};
export default App;
