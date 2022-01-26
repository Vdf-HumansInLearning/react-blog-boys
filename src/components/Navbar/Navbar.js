import React from "react";
import "./Navbar.css";

function Navbar() {
  const nav = ["home", "reviews", "about", "contact"];

  return (
    <div className="nav">
      <ul className="nav__container">
        {nav.map((item, index) => (
          <li key={index} className="nav__item">
            <a
              href={`${item}` === "contact" ? "contact" : `/`}
              className="nav__link"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
