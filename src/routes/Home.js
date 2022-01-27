import React from "react";
import { Component } from "react/cjs/react.production.min";
import AddArticle from "./../components/AddArticle/AddArticle";
import Navbar from "./../components/Navbar/Navbar";
import ArticlesList from "./../components/ArticlesList/ArticlesList";
import Loader from "./../components/Loader/Loader";
import SuccessAlert from "./../components/SuccessAlert/SuccessAlert";
import "./../Home.css";
import FooterLinks from "./../components/FooterLinks/FooterLinks";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalAddArticle: false,
      showModalAlert: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(option) {
    if (option === "add") {
      this.setState({ showModalAddArticle: true });
    }
    if (option === "alert") {
      this.setState({ showModalAlert: true });
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

  render() {
    const showModalAddArticle = this.state.showModalAddArticle;
    const showModalAlert = this.state.showModalAlert;

    return (
      <>
        <Loader />
        <SuccessAlert />
        <Navbar />

        <AddArticle
          showModalAddArticle={showModalAddArticle}
          openModal={this.openModal}
          closeModal={this.closeModal}
        />

        <ArticlesList
          showModalAlert={showModalAlert}
          openModal={this.openModal}
          closeModal={this.closeModal}
        />
        <FooterLinks />
      </>
    );
  }
}

export default Home;
