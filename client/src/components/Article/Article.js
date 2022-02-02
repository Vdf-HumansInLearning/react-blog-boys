import React from "react";
import { Component } from "react/cjs/react.production.min";
import "./Article.css";

class Article extends Component {
  constructor(props) {
    super(props);
    props = this.props;
  }

  render() {
    const article = this.props.article;

    let firstParagraph;
    let text = this.props.article.content;
    let spliced = text.substring(0, text.length / 2);
    if (
      text.charAt(spliced.length - 1) === "!" ||
      text.charAt(spliced.length - 1) === "." ||
      text.charAt(spliced.length - 1) === "?"
    ) {
      firstParagraph = text.substring(0, text.length / 2);
    } else {
      firstParagraph = text.substring(0, spliced.lastIndexOf(".") + 1);
    }

    return (
      <div id={article.id}>
        <h2 className="title">{article.title}</h2>
        <ul className="info__container">
          <li className="info__item">{article.tag}</li>
          <li className="info__item">
            Added by
            <span className="info__mark point"> {article.author}</span>
          </li>
          <li className="info__item">{article.date}</li>
        </ul>
        <div className="actions__container">
          <button
            type="button"
            className="actions__btn border"
            id={article.id}
            onClick={() => {
              this.props.openModal("edit", article.id);
              this.props.editArticle(article.id);
            }}
          >
            Edit
          </button>

          <button
            type="button"
            className="actions__btn"
            id={article.id}
            onClick={() => this.props.openModal("alert", article.id)}
          >
            Delete
          </button>
        </div>
        <img src={article.imgUrl} alt={article.imgAlt}></img>
        <div className="content__container">
          <p>{firstParagraph}</p>
        </div>
        <div className="readmore__container">
          <a className="btn-details" href={"article/" + article.id}>
            <button type="button" className="button button-details">
              Read More
            </button>
          </a>
        </div>
      </div>
    );
  }
}

export default Article;
