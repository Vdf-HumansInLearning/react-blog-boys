import React from "react";
import "./SuccessAlert.css";

function SuccessAlert() {
  return (
    <div id="static">
      <div className="alert alert-success" role="alert">
        The article has been created!
      </div>
    </div>
  );
}

export default SuccessAlert;
