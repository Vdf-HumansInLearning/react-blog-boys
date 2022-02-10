import React from "react";
import "./SuccessAlert.css";

const SuccessAlert = ({ showSuccessMessage, isToastShown, toastContent }) => {
  if (showSuccessMessage && isToastShown) {
    return (
      <div id="static">
        <div className="alert alert-success" role="alert">
          {toastContent}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default SuccessAlert;
