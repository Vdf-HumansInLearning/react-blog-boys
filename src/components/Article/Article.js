import React from "react";
import "./Article.css";

function Article({ article }) {
  return (
    <div id={article.id}>
      <h2 className="title">{article.title}</h2>
      <ul>
        <li className="info__item">{article.tag}</li>
        <li className="info__item">
          Added by
          <span className="info__mark point">{article.author}</span>
        </li>
        <li className="info__item"></li>
      </ul>
      <div className="actions__container">
        <button type="button" className="actions__btn border" id={article.id}>
          Edit
        </button>
        <button type="button" className="actions__btn" id={article.id}>
          Delete
        </button>
      </div>
      <img src={article.imgUrl} alt={article.imgAlt}></img>
      <div className="content__container">
        <p>{article.content}</p>
      </div>
      <div className="readmore__container">
        <a className="btn-details" href={"#/article/" + article.id}>
          <button type="button" className="button button-details">
            Read More
          </button>
        </a>
      </div>
    </div>
  );
}

export default Article;
