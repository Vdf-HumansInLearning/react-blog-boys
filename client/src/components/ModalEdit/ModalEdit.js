import React, { useState, useEffect } from "react";
import "./ModalEdit.css";

function ModalEdit(props) {
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const [articleE, setArticleE] = useState("");
  const closeModal = props.closeModal;
  const openModal = props.openModal;
  const showModalEdit = props.showModalEdit;

  useEffect(() => {
    setArticleE(props.article);
  }, [props]);

  function validateModal() {
    let error;
    let regexJpg = /\.(jpe?g|png|gif|bmp)$/i;
    let upperCaseLetter = /^[A-Z]/;

    if (
      articleE.title &&
      articleE.title.length >= 5 &&
      articleE.title.length < 100 &&
      articleE.tag &&
      articleE.tag.length < 30 &&
      articleE.author &&
      upperCaseLetter.test(articleE.author) &&
      articleE.imgUrl &&
      regexJpg.test(articleE.imgUrl) &&
      articleE.saying &&
      articleE.content
    ) {
      setValid(true);
    } else {
      setValid(false);
    }

    if (!articleE.title) {
      error = "Please insert the title of your article!";
    } else if (articleE.title.length < 5) {
      error = "The title must be at least 5 characters long!";
    } else if (!articleE.tag) {
      error = "Please insert the tag of your article!";
    } else if (articleE.tag.length > 30) {
      error = "Please keep your tag under 30 characters!";
    } else if (!articleE.author) {
      error = "Please insert the author of your article!";
    } else if (!upperCaseLetter.test(articleE.author)) {
      error =
        "Please use capital letters for the author's first and last name!";
    } else if (!articleE.imgUrl) {
      error = "Please insert an image url!";
    } else if (!regexJpg.test(articleE.imgUrl)) {
      error = "Please insert an image with jpg/jpeg/png/bmp/gif extension!";
    } else if (!articleE.saying) {
      error = "Please insert the main saying of your article!";
    } else if (!articleE.content) {
      error = "Please insert the content of your article!";
    } else {
      error = "Please check that all fields are filled in correctly";
    }

    if (!valid) {
      setError(error);
    }
  }

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setArticleE((prevArticle) => {
      return {
        ...prevArticle,
        [name]: value,
      };
    });
    validateModal();
  };

  return (
    <>
      {showModalEdit ? (
        <div id="modal-box" className="modal__overlay">
          <div className="add-modal">
            <div className="modal__content">
              <h2 className="title modal-title">{"Edit Article"}</h2>
              <div className="inputs__container">
                <input
                  type="text"
                  className="input margin"
                  id="title"
                  placeholder="Please enter title"
                  name="title"
                  value={articleE.title}
                  onChange={handleChange}
                ></input>
                <input
                  type="text"
                  className="input"
                  id="tag"
                  placeholder="Please enter tag"
                  name="tag"
                  value={articleE.tag}
                  onChange={handleChange}
                ></input>
                <input
                  type="text"
                  className="input margin"
                  id="author"
                  placeholder="Please enter author"
                  name="author"
                  value={articleE.author}
                  onChange={handleChange}
                ></input>
                <input
                  type="text"
                  className="input"
                  id="date"
                  placeholder="Current date"
                  name="date"
                  value={articleE.date}
                  disabled
                ></input>
                <input
                  type="text"
                  className="input margin"
                  id="url"
                  placeholder="Please enter image url"
                  name="imgUrl"
                  value={articleE.imgUrl}
                  onChange={handleChange}
                ></input>
                <input
                  type="text"
                  className="input"
                  id="saying"
                  placeholder="Please enter saying"
                  name="saying"
                  value={articleE.saying}
                  onChange={handleChange}
                ></input>
              </div>
              <textarea
                className="textarea"
                id="textarea"
                name="content"
                cols="28"
                rows="7"
                placeholder="Please enter content"
                value={articleE.content}
                onChange={handleChange}
              ></textarea>

              <div className="modal__buttons">
                {
                  <>
                    <button
                      type="button"
                      className="button close-modal"
                      onClick={() => {
                        closeModal("edit");
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
                          props.sendEditedArticle(articleE);
                          closeModal("edit");
                        }}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="button button--disabled"
                        disabled
                      >
                        Edit
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
}

export default ModalEdit;
