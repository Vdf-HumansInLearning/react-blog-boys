import React, { Component } from "react";
import "./ModalAddArticle.css";

class ModalAddArticle extends Component {
  constructor(props) {
    super(props);

    const today = new Date();
    const date =
      today.getDate() +
      "-" +
      parseInt(today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    this.state = {
      id: null,
      title: "",
      tag: "",
      author: "",
      date: date,
      imgUrl: "",
      imgAlt: "",
      saying: "",
      content: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidUpdate(prevProps) {
    const article = this.props.article;
    if (article && article !== prevProps.article) {
      this.setState({
        id: article.id,
        title: article.title,
        tag: article.tag,
        author: article.author,
        date: article.date,
        imgUrl: article.imgUrl,
        imgAlt: article.imgAlt,
        saying: article.saying,
        content: article.content,
      });
    }
  }

  resetForm() {
    const today = new Date();
    const date =
      today.getDate() +
      "-" +
      parseInt(today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    this.setState({
      ...this.state,
      id: null,
      title: "",
      tag: "",
      author: "",
      date: date,
      imgUrl: "",
      imgAlt: "",
      saying: "",
      content: "",
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  postArticle(article) {
    fetch("http://localhost:3007/articles", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(article),
    }).then((res) => {
      if (res.status === 200) {
        this.resetForm();
      }
    });
  }

  render() {
    const renderTitle = this.props.showModalAddArticle
      ? "Add Article"
      : this.props.showModalEdit
      ? "Edit article"
      : null;

    const renderButtonSaveEdit = this.props.showModalAddArticle ? (
      <>
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
            this.postArticle(this.state);
          }}
        >
          Save
        </button>
      </>
    ) : this.props.showModalEdit ? (
      <>
        <button
          type="button"
          className="button close-modal"
          onClick={() => {
            this.props.closeModal("edit");
            this.resetForm();
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className="button button--pink"
          onClick={() => {
            // this.props.openModal("success");
            this.props.sendEditedArticle(this.state);
            this.props.closeModal("edit");
            this.resetForm();
          }}
        >
          Edit
        </button>
      </>
    ) : null;

    const renderModal = (
      <div id="modal-box" className="modal__overlay">
        <div className="add-modal">
          <div className="modal__content">
            <h2 className="title modal-title">{renderTitle}</h2>
            <div className="inputs__container">
              <input
                type="text"
                className="input margin"
                id="title"
                placeholder="Please enter title"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              ></input>
              <input
                type="text"
                className="input"
                id="tag"
                placeholder="Please enter tag"
                name="tag"
                value={this.state.tag}
                onChange={this.handleChange}
              ></input>
              <input
                type="text"
                className="input margin"
                id="author"
                placeholder="Please enter author"
                name="author"
                value={this.state.author}
                onChange={this.handleChange}
              ></input>

              <input
                type="text"
                className="input"
                id="date"
                placeholder="Current date"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
                disabled
              ></input>
              <input
                type="text"
                className="input margin"
                id="url"
                placeholder="Please enter image url"
                name="imgUrl"
                value={this.state.imgUrl}
                onChange={this.handleChange}
              ></input>
              <input
                type="text"
                className="input"
                id="saying"
                placeholder="Please enter saying"
                name="saying"
                value={this.state.saying}
                onChange={this.handleChange}
              ></input>
            </div>
            <textarea
              className="textarea"
              id="textarea"
              name="content"
              cols="28"
              rows="7"
              placeholder="Please enter content"
              value={this.state.content}
              onChange={this.handleChange}
            ></textarea>

            <div className="modal__buttons">{renderButtonSaveEdit}</div>
          </div>
          <div id="error-modal"></div>
        </div>
      </div>
    );
    return this.props.showModalAddArticle || this.props.showModalEdit
      ? renderModal
      : null;
  }
}

export default ModalAddArticle;
