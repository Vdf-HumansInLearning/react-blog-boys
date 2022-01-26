import React from "react";
import "./ModalAlert.css";

function ModalAlert() {
  return (
    <div
      id="modal-alert"
      className="modal__overlay__alert"
    >
      <div
        id="div-modal-alert"
        className="delete-modal-alert"
      >
        <div className="modal-content">
          <div className="alert-container">
            <h1 className="alert-title">Delete Article</h1>
            <p className="alert-delete-p">
              Are you sure you want to delete this article?
            </p>
            <div className="clearfix">
              <button type="button" className="button cancel-alert-button">
                Cancel
              </button>
              <button type="button" className="button delete-alert-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAlert;
