import React from "react";
import { connect } from "react-redux";

function NotFound() {
  console.log(connect);
  return (
    <div className="container">
      <h1>404</h1>
      <h4>Sorry, the page you are looking for is not found.</h4>
    </div>
  );
}

export default NotFound;
