import React from "react";
import { Component } from "react/cjs/react.production.min";
import AddArticleButton from "./../components/AddArticle/AddArticle";
import Navbar from "./../components/Navbar/Navbar";
import ArticlesList from "./../components/ArticlesList/ArticlesList";
import Loader from "./../components/Loader/Loader";
import SuccessAlert from "./../components/SuccessAlert/SuccessAlert";
import "./../Home.css";
import FooterLinks from "./../components/FooterLinks/FooterLinks";
import ModalAddArticle from "./../components/ModalAddArticle/ModalAddArticle";
import ModalAlert from "./../components/ModalAlert/ModalAlert";

class Home extends Component {
  render() {
    return (
      <>
        <Loader />
        <SuccessAlert />
        <Navbar />
        <ModalAddArticle />
        <ModalAlert />
        <AddArticleButton />
        <ArticlesList />
        <FooterLinks />
      </>
    );
  }
}

export default Home;
