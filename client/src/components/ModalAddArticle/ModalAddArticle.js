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
      valid: false,
      error: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.validateModal = this.validateModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.showModalAddArticle &&
      this.props.showModalAddArticle !== prevProps.showModalAddArticle
    ) {
      this.resetForm();
    }

    const article = this.props.article;
    if (
      this.props.showModalEdit &&
      this.props.showModalEdit !== prevProps.showModalEdit
    ) {
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
      valid: false,
      error: "",
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState(
      {
        ...this.state,
        [name]: value,
      },
      this.validateModal
    );
  }

  validateModal() {
    let { title, imgUrl, content, tag, author, saying } = this.state;
    let error;
    let regexJpg = /\.(jpe?g|png|gif|bmp)$/i;
    let upperCaseLetter = /^[A-Z]/;

    if (
      title &&
      title.length >= 5 &&
      title.length < 100 &&
      tag &&
      tag.length < 30 &&
      author &&
      upperCaseLetter.test(author) &&
      imgUrl &&
      regexJpg.test(imgUrl) &&
      saying &&
      content
    ) {
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }

    if (!title) {
      error = "Please insert the title of your article!";
    } else if (title.length < 5) {
      error = "The title must be at least 5 characters long!";
    } else if (!tag) {
      error = "Please insert the tag of your article!";
    } else if (tag.length > 30) {
      error = "Please keep your tag under 30 characters!";
    } else if (!author) {
      error = "Please insert the author of your article!";
    } else if (!upperCaseLetter.test(author)) {
      error =
        "Please use capital letters for the author's first and last name!";
    } else if (!imgUrl) {
      error = "Please insert an image url!";
    } else if (!regexJpg.test(imgUrl)) {
      error = "Please insert an image with jpg/jpeg/png/bmp/gif extension!";
    } else if (!saying) {
      error = "Please insert the main saying of your article!";
    } else if (!content) {
      error = "Please insert the content of your article!";
    } else {
      error = "Please check that all fields are filled in correctly";
    }

    if (!this.state.valid) {
      this.setState({ error: error });
    }
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
        this.props.renderArticles(this);
        this.props.showToast("This article has been created!");
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
          onClick={() => {
            this.props.closeModal("add");
            // this.resetForm();
          }}
        >
          Cancel
        </button>
        {this.state.valid ? (
          <button
            type="button"
            className="button button--pink"
            onClick={() => {
              this.props.openModal("success");
              this.props.closeModal("add");
              this.postArticle(this.state);
            }}
          >
            Save
          </button>
        ) : (
          <button type="button" className="button button--disabled" disabled>
            Save
          </button>
        )}
      </>
    ) : this.props.showModalEdit ? (
      <>
        <button
          type="button"
          className="button close-modal"
          onClick={() => {
            this.props.closeModal("edit");
            // this.resetForm();
          }}
        >
          Cancel
        </button>
        {this.state.valid ? (
          <button
            type="button"
            className="button button--pink"
            onClick={() => {
              this.props.openModal("success");
              this.props.sendEditedArticle(this.state);
              this.props.closeModal("edit");
              // this.resetForm();
            }}
          >
            Edit
          </button>
        ) : (
          <button type="button" className="button button--disabled" disabled>
            Edit
          </button>
        )}
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
          <div id="error-modal">
            {!this.state.valid ? this.state.error : ""}
          </div>
        </div>
      </div>
    );

    return this.props.showModalAddArticle || this.props.showModalEdit
      ? renderModal
      : null;
  }
}

export default ModalAddArticle;
