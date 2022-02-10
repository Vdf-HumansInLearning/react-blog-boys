import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import ArticleDetails from "./../components/ArticleDetails/ArticleDetails";
import FooterLinks from "./../components/FooterLinks/FooterLinks";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const Details = (props) => {
  const [article, setArticle] = useState({
    id: "",
    title: "",
    tag: "",
    author: "",
    date: "",
    imgUrl: "",
    imgAlt: "",
    content: "",
    saying: "",
  });

  useEffect(() => {
    fetch("http://localhost:3007/articles/" + props.params.id)
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          props.navigate("/*", { replace: true });
          return;
        }
        // Examine the text in the response
        response.json().then(function (data) {
          setArticle(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }, [props]);

  return (
    <>
      {!article.id ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <ArticleDetails article={article} key={article.id} />
          <FooterLinks
            route="details"
            previousArticle={article.prevId}
            nextArticle={article.nextId}
          />
        </>
      )}
    </>
  );
};

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useNavigate();

  return <WrappedComponent {...props} params={params} navigate={navigate} />;
};
export default withRouter(Details);
