import React from "react";
import "./AddArticle.css";

const AddArticle = ({ openModal }) => {
  return (
    <div className="add-article-button">
      <div className="add__container">
        <button
          className="button open-modal fas fa-plus"
          onClick={() => openModal("add")}
        >
          Add Article
        </button>
      </div>
    </div>
  );
};
export default AddArticle;
