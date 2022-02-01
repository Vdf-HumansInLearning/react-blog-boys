import React from "react";
import { Component } from "react/cjs/react.production.min";
import "./../Article/Article.css";

class ArticleDetails extends Component {
  splitArticle(content) {}

  render() {
    const article = this.props.article;

    let firstParagraph;
    let secondParagraph;
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
    secondParagraph = text.substring(spliced.lastIndexOf(".") + 1);

    return (
      <>
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
          <img src={"../" + article.imgUrl} alt={"../" + article.imgAlt}></img>
          <div className="content__container">
            <p>{firstParagraph}</p>
            <p className="saying">{article.saying}</p>
            <p>{secondParagraph}</p>
          </div>
        </div>
      </>
    );
  }
}

export default ArticleDetails;
