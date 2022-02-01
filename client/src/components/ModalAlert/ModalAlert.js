import React from "react";
import { Component } from "react/cjs/react.production.min";
import "./ModalAlert.css";

class ModalAlert extends Component {
  constructor(props) {
    super(props);
    props = this.props;
  }
  render() {
    if (this.props.showModalAlert) {
      return (
        <div id="modal-alert" className="modal__overlay__alert">
          <div id="div-modal-alert" className="delete-modal-alert">
            <div className="alert-container">
              <h1 className="alert-title">Delete Article</h1>
              <p className="alert-delete-p">
                Are you sure you want to delete this article?
              </p>
              <div className="clearfix">
                <button
                  type="button"
                  className="button cancel-alert-button"
                  onClick={() => this.props.closeModal("alert")}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="delete-alert-button"
                  onClick={() => {
                    this.props.closeModal("alert");
                    this.props.deleteArticle();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ModalAlert;
