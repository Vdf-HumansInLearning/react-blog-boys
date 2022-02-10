import "./DarkModeButton.css";
import React, { useEffect } from "react";

const DarkModeButton = () => {
  const currentTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : null;
  const body = document.querySelector("body");

  function switchTheme(event) {
    if (event.target.checked) {
      body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  useEffect(() => {
    const toggleSwitch = document.querySelector(
      '.theme-switch input[type="checkbox"]'
    );
    if (currentTheme) {
      body.setAttribute("data-theme", currentTheme);
      if (currentTheme === "dark") {
        toggleSwitch.checked = true;
      }
    }
  });

  // componentDidMount() {
  //   const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]')
  //   if (this.state.currentTheme) {
  //     this.state.body.setAttribute('data-theme', this.state.currentTheme);
  //     if (this.state.currentTheme === 'dark') {
  //       toggleSwitch.checked = true;
  //     }
  //   }

  return (
    <div className="theme-switch-box">
      <label className="theme-switch" htmlFor="switch">
        <input type="checkbox" id="switch" onChange={switchTheme} />
        <div className="icons">
          <div className="far fa-moon round"></div>
          <div className="fas fa-sun round"></div>
        </div>
      </label>
    </div>
  );
};

export default DarkModeButton;
