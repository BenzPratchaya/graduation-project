import React, { useEffect, useState } from "react";
import "./css/Article.css";
import Footer from "./Footer.jsx";
import Cards from "./Articlecards.jsx";
import Articlecontent from "./Articlecontent.jsx";
import NavTab from "./NavTab.jsx";
import Banner from "./Banner.jsx";

function Article(props) {
  const [articles, setArticles] = useState([]);
  const [articleslike, setArticlesLike] = useState([]);

  // const itemsPerPage = 2;
  // const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((res) => res.json())
      .then((result) => {
        setArticles(result);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/articles/like/${props.user.id}`)
      .then((res) => res.json())
      .then((result) => {
        setArticlesLike(result);
      });
  }, [props.user.id]);

  // useEffect(() => {
  //   const initialVisibleCards = articles.slice(0, 4); // เริ่มแสดง 4 รายการแรก
  //   setVisibleCards(initialVisibleCards);
  // }, [articles]);

  // const loadMoreCards = () => {
  //   const currentIndex = visibleCards.length;
  //   const newVisibleCards = articles.slice(
  //     currentIndex,
  //     currentIndex + itemsPerPage
  //   );
  //   setVisibleCards([...visibleCards, ...newVisibleCards]);
  // };

  return (
    <div className="Article">
      {/* NavTab */}
      <NavTab />
      {/* END NavTab */}
      <Banner title="บทความเพื่อสุขภาพ" page="Articles" />
      <br />
      {/* CardSlide */}
      <Cards key={articles.id} cardList={articles} />
      {/* END CardSlide */}

      {/* CONTENT */}
      <Articlecontent
        contentList={articles}
        user={props.user}
        articleslike={articleslike}
        // loadMoreCards={loadMoreCards}
        // visibleCards={visibleCards}
      />
      {/* END CONTENT */}

      {/* FOOTER */}
      <br />
      <Footer />
      {/* END FOOTER */}
    </div>
  );
}

export default Article;
