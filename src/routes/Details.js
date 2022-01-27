import React from "react";
import { Component } from "react/cjs/react.production.min";
import Navbar from "../components/Navbar/Navbar";
import ArticleDetails from "./../components/ArticleDetails/ArticleDetails";
import { useParams } from "react-router-dom";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        id: "",
        title: "",
        tag: "",
        author: "",
        date: "",
        imgUrl: "",
        imgAlt: "",
        content: "",
      },
    };
  }

  componentDidMount() {
    const self = this;
    const { id } = this.props.params;

    fetch("http://localhost:4000/articles/" + id)
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          self.setState({ article: data });
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    const { article } = this.state;
    return (
      <>
        <Navbar />
        <ArticleDetails article={article} key={article.id} />
      </>
    );
  }
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};
export default withRouter(Details);
