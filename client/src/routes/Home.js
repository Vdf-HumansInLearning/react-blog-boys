import React, { useState, useEffect } from "react";
import AddArticle from "./../components/AddArticle/AddArticle";
import Navbar from "./../components/Navbar/Navbar";
import "./../Home.css";
import FooterLinks from "./../components/FooterLinks/FooterLinks";
import SuccessAlert from "../components/SuccessAlert/SuccessAlert";
import ModalAddArticle from "../components/ModalAddArticle/ModalAddArticle";
import ModalDelete from "../components/ModalDelete/ModalDelete";
import Article from "../components/Article/Article";
import Loader from "../components/Loader/Loader";
import ModalEdit from "../components/ModalEdit/ModalEdit";
import ModalAdd from "../components/ModalAdd/ModalAdd";

const Home = () => {
  const [articlesList, setArticlesList] = useState([]);
  const [showModalAddArticle, setShowModalAddArticle] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [selectedArticleToEdit, setSelectedArticleToEdit] = useState({});
  const [numberOfArticles] = useState(4);
  const [indexStart, setIndexStart] = useState(0);
  const [indexEnd, setIndexEnd] = useState(3);
  const [totalNumberOfArticles, setTotalNumberOfArticles] = useState(0);
  const [isToastShown, setIsToastShown] = useState(false);
  const [toastContent, setToastContent] = useState("");

  function showToast(toastContent) {
    setIsToastShown(true);
    setToastContent(toastContent);
    setTimeout(() => setIsToastShown(false), 5000);
  }

  function openModal(option, id) {
    if (option === "add") {
      setShowModalAddArticle(true);
    }
    if (option === "alert") {
      setShowModalDelete(true);
      setIdToDelete(id);
    }
    if (option === "success") {
      setShowSuccessMessage(true);
    }
    if (option === "edit") {
      setShowModalEdit(true);
    }
  }

  function closeModal(option) {
    if (option === "add") {
      setShowModalAddArticle(false);
    }
    if (option === "alert") {
      setShowModalDelete(false);
    }
    if (option === "edit") {
      setShowModalEdit(false);
    }
  }

  function updateStartEndIndexes(button) {
    if (button === "next") {
      setIndexStart(indexStart + numberOfArticles);
      setIndexEnd(indexEnd + numberOfArticles);
    }
    if (button === "previous") {
      setIndexStart(indexStart - numberOfArticles);
      setIndexEnd(indexEnd - numberOfArticles);
    }
  }

  function handlePrevious() {
    updateStartEndIndexes("previous");
  }

  function handleNext() {
    updateStartEndIndexes("next");
  }

  useEffect(() => {
    renderArticles();
  }, [indexStart]);

  function renderArticles() {
    fetch(
      `http://localhost:3007/articles?indexStart=${indexStart}&indexEnd=${indexEnd}`
    ).then(function (response) {
      if (response.status !== 200) {
        console.log(
          "looks like there was a problem. Status Code " + response.status
        );
        return;
      }
      response
        .json()
        .then(function (data) {
          setArticlesList(data.articlesList);
          setTotalNumberOfArticles(data.numberOfArticles);

          if (data.articlesList.length === 0) {
            handlePrevious();
          }
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
    });
  }

  function sendEditedArticle(article) {
    fetch(`http://localhost:3007/articles/${article.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(article),
    }).then((res) => {
      if (res.status === 200) {
        renderArticles();
        showToast("This article has been edited successfully!");
      }
    });
  }

  function deleteArticle() {
    fetch(`http://localhost:3007/articles/${idToDelete}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        renderArticles();
        setIdToDelete("");
      }
    });
  }

  function editArticle(id) {
    if (id) {
      setSelectedArticleToEdit(articlesList.find((item) => item.id === id));
    }
  }

  const articles = articlesList.map((article) => (
    <Article
      article={article}
      id={article.id}
      key={article.id}
      showModalDelete={showModalDelete}
      showModalEdit={showModalEdit}
      openModal={openModal}
      closeModal={closeModal}
      editArticle={editArticle}
    />
  ));

  return (
    <>
      {articlesList.length === 0 ? (
        <Loader />
      ) : (
        <>
          <SuccessAlert
            showSuccessMessage={showSuccessMessage}
            isToastShown={isToastShown}
            toastContent={toastContent}
          />
          <Navbar />
          <AddArticle
            showModalAddArticle={showModalAddArticle}
            openModal={openModal}
            closeModal={closeModal}
            showSuccessMessage={showSuccessMessage}
          />
          <div id="root-articlesList" className="main error">
            <article>{articles}</article>
          </div>
          <FooterLinks
            indexStart={indexStart}
            indexEnd={indexEnd}
            totalNumberOfArticles={totalNumberOfArticles}
            route="home"
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
          {/* <ModalAddArticle
            showModalAddArticle={showModalAddArticle}
            showToast={showToast}
            renderArticles={renderArticles}
            closeModal={closeModal}
            openModal={openModal}
            showModalEdit={showModalEdit}
            article={selectedArticleToEdit}
            sendEditedArticle={sendEditedArticle}
          /> */}
          <ModalAdd
            showModalAddArticle={showModalAddArticle}
            renderArticles={renderArticles}
            showToast={showToast}
            closeModal={closeModal}
            openModal={openModal}
          />
          <ModalEdit
            showModalEdit={showModalEdit}
            openModal={openModal}
            closeModal={closeModal}
            sendEditedArticle={sendEditedArticle}
            article={selectedArticleToEdit}
          />
          <ModalDelete
            showModalDelete={showModalDelete}
            closeModal={closeModal}
            deleteArticle={deleteArticle}
          />
        </>
      )}
    </>
  );
};

export default Home;
