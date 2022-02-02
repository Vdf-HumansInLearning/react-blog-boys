import React from "react";
import "./FooterLinks.css";

function FooterLinks(props) {
  if (props.route === "home") {
    return (
      <footer className="footer next-button-class">
        {props.indexStart !== 0 ? (
          <button
            className="footer__link footer__link--previous"
            id="button-prev"
            onClick={props.handlePrevious}
          >
            previous
          </button>
        ) : (
          <span></span>
        )}
        {props.indexEnd < props.totalNumberOfArticles - 1 ? (
          <button
            className="footer__link footer__link--next"
            id="button-next"
            onClick={props.handleNext}
          >
            next
          </button>
        ) : (
          <span></span>
        )}
      </footer>
    );
  }
  if (props.route === "details") {
    return (
      <footer className="footer next-button-class">
        {props.previousArticle ? (
          <a className="anchor__link" href={props.previousArticle}>
            <button
              className="footer__link footer__link--previous"
              id="button-prev"
            >
              previous article
            </button>
          </a>
        ) : (
          <span></span>
        )}
        {props.nextArticle ? (
          <a className="anchor__link" href={props.nextArticle}>
            <button
              className="footer__link footer__link--next"
              id="button-next"
            >
              next article
            </button>
          </a>
        ) : (
          <span></span>
        )}
      </footer>
    );
  }
}

export default FooterLinks;
