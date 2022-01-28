import React from "react";
import { Component } from "react/cjs/react.production.min";
import Article from "../Article/Article";
import "./ArticlesList.css";

class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articlesList: [],
    };
  }

  componentDidMount() {
    const self = this;
    fetch("http://localhost:4000/articles")
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "looks like there was a problem. Status Code " + response.status
          );
          return;
        }

        response.json().then(function (data) {
          self.setState({
            articlesList: data,
          });
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    const { articlesList } = this.state;
    const articles = articlesList.map((article) => (
      <Article
        article={article}
        key={article.id}
        showModalAlert={this.props.showModalAlert}
        openModal={this.props.openModal}
        closeModal={this.props.closeModal}
      />
    ));

    return (
      <div id="root-articlesList" className="main error">
        <article>{articles}</article>
      </div>
    );
  }
}

export default ArticlesList;
