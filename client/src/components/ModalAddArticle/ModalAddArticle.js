import React, { useEffect, useState } from "react";
import "./ModalAddArticle.css";

const ModalAddArticle = (props) => {
  const showModalAddArticle = props.showModalAddArticle;
  const article = props.article;
  const showModalEdit = props.showModalEdit;
  const renderArticles = props.renderArticles;
  const showToast = props.showToast;
  const closeModal = props.closeModal;
  const openModal = props.openModal;
  const sendEditedArticle = props.sendEditedArticle;

  const today = new Date();
  const date =
    today.toLocaleString("default", { month: "long" }) +
    "-" +
    today.getDate() +
    "-" +
    today.getFullYear();

  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  // const [imgAlt, setImgAlt] = useState("");
  const [saying, setSaying] = useState("");
  const [content, setContent] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const [articleE, setArticleE] = useState("");

  // const articleToSend = {
  //   id: articleE.id,
  //   title: articleE.title,
  //   tag: articleE.tag,
  //   author: articleE.author,
  //   date: date,
  //   imgUrl: articleE.imgUrl,
  //   saying: articleE.saying,
  //   content: articleE.content,
  //   valid: articleE.valid,
  //   error: error,
  // };

  useEffect(() => {
    setArticleE(props.article);
  }, [props]);

  useEffect(() => {
    resetForm();
  }, [props.showModalAddArticle]);

  const [articleToReset, setArticleToReset] = useState({
    id: "",
    title: "",
    tag: "",
    author: "",
    date: "",
    imgUrl: "",
    imgAlt: "",
    content: "",
    saying: "",
  });

  // function componentDidUpdate(prevProps) {
  //     if (
  //       showModalAddArticle &&
  //       showModalAddArticle !== prevProps.showModalAddArticle
  //     ) {
  //       this.resetForm();
  //     }

  //     if (
  //       showModalEdit &&
  //       showModalEdit !== prevProps.showModalEdit
  //     ) {
  //       this.setState({
  //         id: article.id,
  //         title: article.title,
  //         tag: article.tag,
  //         author: article.author,
  //         date: article.date,
  //         imgUrl: article.imgUrl,
  //         imgAlt: article.imgAlt,
  //         saying: article.saying,
  //         content: article.content,
  //       });
  //     }
  //   }

  function resetForm() {
    const today = new Date();
    const date =
      today.getDate() +
      "-" +
      parseInt(today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    setArticleToReset(articleToReset);

    // this.setState({
    //   ...this.state,
    //   id: null,
    //   title: "",
    //   tag: "",
    //   author: "",
    //   date: date,
    //   imgUrl: "",
    //   imgAlt: "",
    //   saying: "",
    //   content: "",
    //   valid: false,
    //   error: "",
    // });

    // function handleChange(event) {
    //   const target = event.target;
    //   const value = target.value;
    //   const name = target.name;
    // this.setState({...this.state,
    //     [name]: value},
    //   validateModal
    // );
    // validateModal()
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

  function validateModal() {
    // let { title, imgUrl, content, tag, author, saying } = this.state;
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
      setError({ error: error });
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

  const renderTitle = showModalAddArticle
    ? "Add Article"
    : showModalEdit
    ? "Edit article"
    : null;

  const renderButtonSaveEdit = showModalAddArticle ? (
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
            // postArticle(articleToSend);
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
  ) : showModalEdit ? (
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
            // sendEditedArticle(articleToSend);
            closeModal("edit");
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

  if ((showModalAddArticle || showModalEdit) && props.article) {
    return (
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
                value={articleE.title}
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
                value={date}
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

            <div className="modal__buttons">{renderButtonSaveEdit}</div>
          </div>
          <div id="error-modal">{!valid ? error : ""}</div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ModalAddArticle;
