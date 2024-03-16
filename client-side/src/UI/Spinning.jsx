import React from "react";

import "./Spinning.css";

function Spinning({ isBtn }) {
  return (
    <React.Fragment>
      <div className="spin-area">
        <div class={`lds-hourglass ${isBtn ? "lds-hourglass-btn" : ""}`}></div>
      </div>
    </React.Fragment>
  );
}

export default Spinning;
