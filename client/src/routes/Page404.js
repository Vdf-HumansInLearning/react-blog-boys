import React, { Component } from "react";
import Loader from "../components/Loader/Loader";
import Navbar from "./../components/Navbar/Navbar";
import "./../Home.css";

class Page404 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTheme: "",
      currentImg: "",
    };
  }

  componentDidMount() {
    const currentTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : null;

    const currentImg = currentTheme === "dark" ? "img-dark" : "img-light";
    this.setState({ currentTheme: currentTheme, currentImg: currentImg }
    );
  }

  render() {
    return (
      <>
        {!this.state.currentTheme ? (
          <Loader />
        ) : (
          <>
            <Navbar />
            <div className="error-box img-theme" id="error-box">
              <div className="error-info">
                <h1 className="error-message">Error 404 - Page not found!</h1>
                <a href="/">
                  <button type="button" className="to-homepage">
                    BACK TO HOMEPAGE
                  </button>
                </a>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default Page404;
