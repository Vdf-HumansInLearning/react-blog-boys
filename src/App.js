import React from "react";
import { Component } from "react/cjs/react.production.min";
import AddArticleButton from "./components/AddArticle/AddArticle";
import Navbar from "./components/Navbar/Navbar";
import ArticlesList from "./components/ArticlesList/ArticlesList";
import Loader from "./components/Loader/Loader";
import SuccessAlert from "./components/SuccessAlert/SuccessAlert";
import "./App.css";
import FooterLinks from "./components/FooterLinks/FooterLinks";
import DarkModeButton from "./components/DarkModeButton/DarkModeButton";
import Modal from "./components/Modal/Modal";

class App extends Component {
  render() {
    return (
      <>
        <Loader />
        <SuccessAlert />
        <DarkModeButton/>
        <Modal />
        <Navbar />
        <AddArticleButton />
        <ArticlesList />
        <FooterLinks/>
      </>
    );
  }
}

export default App;
