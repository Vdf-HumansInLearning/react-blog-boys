import React from "react";
import { Component } from "react/cjs/react.production.min";
import AddArticle from "./../components/AddArticle/AddArticle";
import Navbar from "./../components/Navbar/Navbar";
import ArticlesList from "./../components/ArticlesList/ArticlesList";
import Loader from "./../components/Loader/Loader";
import SuccessAlert from "./../components/SuccessAlert/SuccessAlert";
import "./../Home.css";
import FooterLinks from "./../components/FooterLinks/FooterLinks";
import ModalAlert from "./../components/ModalAlert/ModalAlert";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <>
        <Loader />
        <SuccessAlert />
        <Navbar />

        <ModalAlert />
        <AddArticle
          showModal={this.state.showModal}
          openModal={this.openModal}
          closeModal={this.closeModal}
        />
        <ArticlesList />
        <FooterLinks />
      </>
    );
  }
}

export default Home;
