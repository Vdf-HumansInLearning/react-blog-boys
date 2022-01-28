import React, { Component } from "react";
import "./ModalAddArticle.css";

class ModalAddArticle extends Component {
  render() {
    if (this.props.showModalAddArticle) {
      return (
        <div id="modal-box" className="modal__overlay">
          <div className="add-modal">
            <div className="modal__content">
              <h2 className="title modal-title">Add/Edit article</h2>
              <div className="inputs__container">
                <input
                  type="text"
                  className="input margin"
                  id="title"
                  placeholder="Please enter title"
                ></input>
                <input
                  type="text"
                  className="input"
                  id="tag"
                  placeholder="Please enter tag"
                ></input>
                <input
                  type="text"
                  className="input margin"
                  id="author"
                  placeholder="Please enter author"
                ></input>

                <input
                  type="text"
                  className="input"
                  id="date"
                  placeholder="Current date"
                ></input>
                <input
                  type="text"
                  className="input margin"
                  id="url"
                  placeholder="Please enter image url"
                ></input>
                <input
                  type="text"
                  className="input"
                  id="saying"
                  placeholder="Please enter saying"
                ></input>
              </div>
              <textarea
                className="textarea"
                id="textarea"
                name="content"
                cols="28"
                rows="7"
                placeholder="Please enter title"
              ></textarea>

              <div className="modal__buttons">
                <button
                  type="button"
                  className="button close-modal"
                  onClick={() => this.props.closeModal("add")}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="button button--pink"
                  onClick={() => {
                    // this.props.openModal("success");
                    this.props.closeModal("add");
                  }}
                >
                  Save
                </button>

                <button type="button" className="button button-edit-modal">
                  Edit
                </button>
              </div>
            </div>
            <div id="error-modal"></div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ModalAddArticle;
