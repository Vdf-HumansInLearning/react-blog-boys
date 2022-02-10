import React, { useState, useEffect } from "react";
import "./ModalAdd.css";

const ModalAdd = ({
  renderArticles,
  showToast,
  closeModal,
  openModal,
  showModalAddArticle,
}) => {
  const today = new Date();
  const date =
    today.toLocaleString("default", { month: "long" }) +
    "-" +
    today.getDate() +
    "-" +
    today.getFullYear();

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [saying, setSaying] = useState("");
  const [content, setContent] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");

  const articleToSend = {
    title: title,
    tag: tag,
    author: author,
    date: date,
    imgUrl: imgUrl,
    saying: saying,
    content: content,
  };

  useEffect(() => {
    setTitle("");
    setTag("");
    setAuthor("");
    setImgUrl("");
    setSaying("");
    setContent("");
  }, []);

  function validateModal() {
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
      setValid(true);
    } else {
      setValid(false);
    }

    if (title.length < 5) {
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

    if (!valid) {
      setError(error);
    }
  }

  function postArticle(article) {
    fetch("http://localhost:3007/articles", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(article),
    }).then((res) => {
      if (res.status === 200) {
        renderArticles();
        showToast("This article has been created!");
      }
    });
  }

  return (
    <>
      {showModalAddArticle ? (
        <div id="modal-box" className="modal__overlay">
          <div className="add-modal">
            <div className="modal__content">
              <h2 className="title modal-title">{"Add Article"}</h2>
              <div className="inputs__container">
                <input
                  type="text"
                  className="input margin"
                  id="title"
                  placeholder="Please enter title"
                  name="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    validateModal();
                  }}
                ></input>
                <input
                  type="text"
                  className="input"
                  id="tag"
                  placeholder="Please enter tag"
                  name="tag"
                  value={tag}
                  onChange={(e) => {
                    setTag(e.target.value);
                    validateModal();
                  }}
                ></input>
                <input
                  type="text"
                  className="input margin"
                  id="author"
                  placeholder="Please enter author"
                  name="author"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                    validateModal();
                  }}
                ></input>
                <input
                  type="text"
                  className="input"
                  id="date"
                  placeholder="Current date"
                  name="date"
                  value={date}
                  disabled
                ></input>
                <input
                  type="text"
                  className="input margin"
                  id="url"
                  placeholder="Please enter image url"
                  name="imgUrl"
                  value={imgUrl}
                  onChange={(e) => {
                    setImgUrl(e.target.value);
                    validateModal();
                  }}
                ></input>
                <input
                  type="text"
                  className="input"
                  id="saying"
                  placeholder="Please enter saying"
                  name="saying"
                  value={saying}
                  onChange={(e) => {
                    setSaying(e.target.value);
                    validateModal();
                  }}
                ></input>
              </div>
              <textarea
                className="textarea"
                id="textarea"
                name="content"
                cols="28"
                rows="7"
                placeholder="Please enter content"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  validateModal();
                }}
              ></textarea>

              <div className="modal__buttons">
                {
                  <>
                    <button
                      type="button"
                      className="button close-modal"
                      onClick={() => {
                        closeModal("add");
                      }}
                    >
                      Cancel
                    </button>
                    {valid ? (
                      <button
                        type="button"
                        className="button button--pink"
                        onClick={() => {
                          openModal("success");
                          closeModal("add");
                          postArticle(articleToSend);
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="button button--disabled"
                        disabled
                      >
                        Save
                      </button>
                    )}
                  </>
                }
              </div>
            </div>
            <div id="error-modal">{!valid ? error : ""}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalAdd;
