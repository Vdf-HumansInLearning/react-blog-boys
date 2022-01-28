import React from "react";
import { Component } from "react/cjs/react.production.min";
import "./SuccessAlert.css";

class SuccessAlert extends Component {
  render() {
    if (this.props.showSuccessMessage) {
      return (
        <div id="static">
          <div className="alert alert-success" role="alert">
            The article has been created!
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default SuccessAlert;
