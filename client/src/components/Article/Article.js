import React from "react";
import { Component } from "react/cjs/react.production.min";
import ModalAlert from "../ModalAlert/ModalAlert";
import ModalAddArticle from "../ModalAddArticle/ModalAddArticle";
import "./Article.css";

class Article extends Component {
  constructor(props) {
    super(props);
    props = this.props;
  }
  render() {
    const article = this.props.article;
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
            onClick={() => this.props.openModal("add")}
          >
            Edit
          </button>
          <ModalAddArticle
            showModalAddArticle={this.props.showModalAddArticle}
            closeModal={this.props.closeModal}
          />
          <button
            type="button"
            className="actions__btn"
            id={article.id}
            onClick={() => this.props.openModal("alert")}
          >
            Delete
          </button>
          <ModalAlert
            showModalAlert={this.props.showModalAlert}
            closeModal={this.props.closeModal}
          />
        </div>
        <img src={article.imgUrl} alt={article.imgAlt}></img>
        <div className="content__container">
          <p>{article.content}</p>
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
