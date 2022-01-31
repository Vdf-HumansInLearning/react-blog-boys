import React from "react";
import { Component } from "react/cjs/react.production.min";
import "./../Article/Article.css";

class ArticleDetails extends Component {
  render() {
    const article = this.props.article;
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
            <p>{article.content}</p>
          </div>
        </div>
      </>
    );
  }
}

export default ArticleDetails;
