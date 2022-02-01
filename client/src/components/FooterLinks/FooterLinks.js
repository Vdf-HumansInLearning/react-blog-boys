import React from "react";
import "./FooterLinks.css";

function FooterLinks(props) {
  if (props.route === "home") {
    return (
      <footer className="footer next-button-class">
        <button
          className="footer__link footer__link--previous"
          id="button-prev"
          onClick={props.handlePrevious}
        >
          previous
        </button>
        <button
          className="footer__link footer__link--next"
          id="button-next"
          onClick={props.handleNext}
        >
          next
        </button>
      </footer>
    );
  }
  if (props.route === "details") {
    return (
      <footer className="footer next-button-class">
        <a className="anchor__link" href={props.previousArticle}>
          <button
            className="footer__link footer__link--previous"
            id="button-prev"
          >
            previous article
          </button>
        </a>
        <a className="anchor__link" href={props.nextArticle}>
          <button className="footer__link footer__link--next" id="button-next">
            next article
          </button>
        </a>
      </footer>
    );
  }
}

export default FooterLinks;
