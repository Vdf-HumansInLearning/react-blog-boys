import React from "react";
import { Component } from "react/cjs/react.production.min";
import AddArticle from "./../components/AddArticle/AddArticle";
import Navbar from "./../components/Navbar/Navbar";
import ArticlesList from "./../components/ArticlesList/ArticlesList";
import Loader from "./../components/Loader/Loader";
import "./../Home.css";
import FooterLinks from "./../components/FooterLinks/FooterLinks";
import SuccessAlert from "../components/SuccessAlert/SuccessAlert";
import ModalAddArticle from "../components/ModalAddArticle/ModalAddArticle";
import ModalAlert from "../components/ModalAlert/ModalAlert";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalAddArticle: false,
      showModalAlert: false,
      showSuccessMessage: false,
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

  render() {
    const showModalAddArticle = this.state.showModalAddArticle;
    const showModalAlert = this.state.showModalAlert;
    const showSuccessMessage = this.state.showSuccessMessage;

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

        <ArticlesList
          showModalAlert={showModalAlert}
          openModal={this.openModal}
          closeModal={this.closeModal}
        />

        <FooterLinks />

        <ModalAddArticle />
        <ModalAlert />
      </>
    );
  }
}

export default Home;
