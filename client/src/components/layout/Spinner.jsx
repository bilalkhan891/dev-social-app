import React from "react";

function Spinner() {
  return (
    <div className="spinner-outter">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
