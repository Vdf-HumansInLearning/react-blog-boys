import React from "react";
import { Component } from "react/cjs/react.production.min";
import AddArticle from "./../components/AddArticle/AddArticle";
import Navbar from "./../components/Navbar/Navbar";
import "./../Home.css";
import FooterLinks from "./../components/FooterLinks/FooterLinks";
import SuccessAlert from "../components/SuccessAlert/SuccessAlert";
import ModalAddArticle from "../components/ModalAddArticle/ModalAddArticle";
import ModalAlert from "../components/ModalAlert/ModalAlert";
import Article from "../components/Article/Article";
import Loader from "../components/Loader/Loader";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalAddArticle: false,
      showModalAlert: false,
      showSuccessMessage: false,
      showModalEdit: false,
      articlesList: [],
      idToDelete: "",
      selectedArticleToEdit: {},
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
    this.editArticle = this.editArticle.bind(this);
    this.sendEditedArticle = this.sendEditedArticle.bind(this);
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
    if (option === "edit") {
      this.setState({ showModalEdit: true });
    }
  }

  closeModal(option) {
    if (option === "add") {
      this.setState({ showModalAddArticle: false });
    }
    if (option === "alert") {
      this.setState({ showModalAlert: false });
    }
    if (option === "edit") {
      this.setState({ showModalEdit: false });
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

  componentDidUpdate(previousProps, previousState) {
    if (previousState.indexStart !== this.state.indexStart) {
      this.renderArticles(this);
      window.scrollTo(0, 0);
    }
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

  sendEditedArticle(article) {
    fetch(`http://localhost:3007/articles/${article.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(article),
    }).then((res) => {
      if (res.status === 200) {
        this.renderArticles(this);
      }
    });
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

  editArticle(id) {
    if (id) {
      this.setState({
        selectedArticleToEdit: this.state.articlesList.find(
          (item) => item.id === id
        ),
      });
    }
  }

  render() {
    const showModalAddArticle = this.state.showModalAddArticle;
    const showModalAlert = this.state.showModalAlert;
    const showSuccessMessage = this.state.showSuccessMessage;
    const showModalEdit = this.state.showModalEdit;

    const { articlesList } = this.state;
    const articles = articlesList.map((article) => (
      <Article
        article={article}
        id={article.id}
        key={article.id}
        showModalAlert={showModalAlert}
        showModalEdit={showModalEdit}
        openModal={this.openModal}
        closeModal={this.closeModal}
        editArticle={this.editArticle}
      />
    ));

    return (
      <>
        {this.state.articlesList.length === 0 ? (
          <Loader />
        ) : (
          <>
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
            <FooterLinks
              indexStart={this.state.indexStart}
              indexEnd={this.state.indexEnd}
              totalNumberOfArticles={this.state.totalNumberOfArticles}
              route="home"
              handlePrevious={this.handlePrevious}
              handleNext={this.handleNext}
            />
            <ModalAddArticle
              showModalAddArticle={this.state.showModalAddArticle}
              closeModal={this.closeModal}
              sendEditedArticle={this.sendEditedArticle}
              showModalEdit={showModalEdit}
              article={this.state.selectedArticleToEdit}
            />
            <ModalAlert
              showModalAlert={this.state.showModalAlert}
              closeModal={this.closeModal}
              deleteArticle={this.deleteArticle}
            />
          </>
        )}
      </>
    );
  }
}

export default Home;
