import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import Navbar from "./../components/Navbar/Navbar";
import "./../Home.css";

const Page404 = () => {
  const [currentTheme, setCurrentTheme] = useState("");
  const [currentImg, setCurrentImg] = useState("");

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : null;

    const currentImg = currentTheme === "dark" ? "img-dark" : "img-light";
    setCurrentTheme(currentTheme);
    setCurrentImg(currentImg);
  });

  return (
    <>
      {!currentTheme ? (
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
};

export default Page404;
