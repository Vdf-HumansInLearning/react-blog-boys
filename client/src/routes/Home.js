import React from "react";
import { Component } from "react/cjs/react.production.min";
import AddArticle from "./../components/AddArticle/AddArticle";
import Navbar from "./../components/Navbar/Navbar";
import Loader from "./../components/Loader/Loader";
import "./../Home.css";
import FooterLinks from "./../components/FooterLinks/FooterLinks";
import SuccessAlert from "../components/SuccessAlert/SuccessAlert";
import ModalAddArticle from "../components/ModalAddArticle/ModalAddArticle";
import ModalAlert from "../components/ModalAlert/ModalAlert";
import Article from "../components/Article/Article";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalAddArticle: false,
      showModalAlert: false,
      showSuccessMessage: false,
      articlesList: [],
      idToDelete: "",
      numberOfArticles: 4,
      indexStart: 0,
      indexEnd: 3,
      totalNumberOfArticles: 0,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderArticles = this.renderArticles.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.updateStartEndIndexes = this.updateStartEndIndexes.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  openModal(option, id) {
    if (option === "add") {
      this.setState({ showModalAddArticle: true });
    }
    if (option === "alert") {
      this.setState({ showModalAlert: true, idToDelete: id });
    }
    if (option === "success") {
      this.setState({ showSuccessMessage: true });
    }
  }

  closeModal(option) {
    if (option === "add") {
      this.setState({ showModalAddArticle: false });
    }
    if (option === "alert") {
      this.setState({ showModalAlert: false });
    }
  }

  updateStartEndIndexes(button) {
    if (button === "next") {
      this.setState({
        indexStart: this.state.indexStart + this.state.numberOfArticles,
        indexEnd: this.state.indexEnd + this.state.numberOfArticles,
      });
    }
    if (button === "previous") {
      this.setState({
        indexStart: this.state.indexStart - this.state.numberOfArticles,
        indexEnd: this.state.indexEnd - this.state.numberOfArticles,
      });
    }
  }

  handlePrevious() {
    this.updateStartEndIndexes("previous");
  }

  handleNext() {
    this.updateStartEndIndexes("next");
  }

  renderArticles() {
    const self = this;
    fetch(
      `http://localhost:3007/articles?indexStart=${this.state.indexStart}&indexEnd=${this.state.indexEnd}`
    )
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "looks like there was a problem. Status Code " + response.status
          );
          return;
        }

        response.json().then(function (data) {
          self.setState(
            {
              articlesList: data.articlesList,
              totalNumberOfArticles: data.numberOfArticles,
            },
            () => {
              if (data.articlesList.length === 0) {
                self.handlePrevious();
              }
            }
          );
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  componentDidMount() {
    this.renderArticles();
  }

  deleteArticle() {
    fetch(`http://localhost:3007/articles/${this.state.idToDelete}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        this.renderArticles();
        this.setState({
          idToDelete: "",
        });
      }
    });
  }

  render() {
    const showModalAddArticle = this.state.showModalAddArticle;
    const showModalAlert = this.state.showModalAlert;
    const showSuccessMessage = this.state.showSuccessMessage;

    const { articlesList } = this.state;
    const articles = articlesList.map((article) => (
      <Article
        article={article}
        id={article.id}
        key={article.id}
        showModalAlert={showModalAlert}
        openModal={this.openModal}
        closeModal={this.closeModal}
      />
    ));

    return (
      <>
        <Loader />
        <SuccessAlert showSuccessMessage={this.props.showSuccessMessage} />
        <Navbar />
        <AddArticle
          showModalAddArticle={showModalAddArticle}
          openModal={this.openModal}
          closeModal={this.closeModal}
          showSuccessMessage={showSuccessMessage}
        />

        <div id="root-articlesList" className="main error">
          <article>{articles}</article>
        </div>

        <ModalAddArticle
          showModalAddArticle={this.state.showModalAddArticle}
          closeModal={this.closeModal}
        />
        <ModalAlert
          showModalAlert={this.state.showModalAlert}
          closeModal={this.closeModal}
          deleteArticle={this.deleteArticle}
        />
        <FooterLinks
          indexStart={this.state.indexStart}
          indexEnd={this.state.indexEnd}
          totalNumberOfArticles={this.state.totalNumberOfArticles}
          route="home"
          handlePrevious={this.handlePrevious}
          handleNext={this.handleNext}
        />
      </>
    );
  }
}

export default Home;
