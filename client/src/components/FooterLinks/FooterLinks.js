import React from "react";
import "./FooterLinks.css";

function FooterLinks({
  route,
  indexStart,
  handlePrevious,
  indexEnd,
  totalNumberOfArticles,
  handleNext,
  previousArticle,
  nextArticle,
}) {
  if (route === "home") {
    return (
      <footer className="footer next-button-class">
        {indexStart !== 0 ? (
          <button
            className="footer__link footer__link--previous"
            id="button-prev"
            onClick={handlePrevious}
          >
            previous
          </button>
        ) : (
          <span></span>
        )}
        {indexEnd < totalNumberOfArticles - 1 ? (
          <button
            className="footer__link footer__link--next"
            id="button-next"
            onClick={handleNext}
          >
            next
          </button>
        ) : (
          <span></span>
        )}
      </footer>
    );
  }
  if (route === "details") {
    return (
      <footer className="footer next-button-class">
        {previousArticle ? (
          <a className="anchor__link" href={previousArticle}>
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
        {nextArticle ? (
          <a className="anchor__link" href={nextArticle}>
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
