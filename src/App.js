import React from "react";
import { Component } from "react/cjs/react.production.min";
import AddArticleButton from "./components/AddArticle/AddArticle";
import Navbar from "./components/Navbar/Navbar";
import ArticlesList from "./components/ArticlesList/ArticlesList";
import Loader from "./components/Loader/Loader";
import SuccessAlert from "./components/SuccessAlert/SuccessAlert";
import "./App.css";
// import Article from "./components/Article/Article";
import FooterLinks from "./components/FooterLinks/FooterLinks";
import DarkModeButton from "./components/DarkModeButton/DarkModeButton";

class App extends Component {
  render() {
    return (
      <>
        <Loader />
        <SuccessAlert />
        <DarkModeButton/>
        <Navbar />
        <AddArticleButton />
        <ArticlesList />
        <FooterLinks/>
      </>
    );
  }
}

export default App;
