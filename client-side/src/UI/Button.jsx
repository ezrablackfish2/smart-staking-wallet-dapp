import React from "react";

import "./Button.css";

function Button(props) {
  return (
    <button
      className={`myBtn ${props.className}`}
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
      id={props.id || null}
      data-bs-toggle={props.data_bs_toggle || null}
      aria-expanded={props.aria_expanded || null}
      data-requestId={props.requestId}
    >
      {props.children}
    </button>
  );
}

export default Button;
