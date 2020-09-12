import React from "react";

const Header = ({
  title = "Google Books Search",
  subTitle = "Search for and Save Books of Interest",
}) => {
  return (
    <div className="jumbotron text-center">
      <h1 className="display-4">{title}</h1>
      <p className="lead">{subTitle}</p>
      <hr className="my-4" />
    </div>
  );
};

export default Header;
