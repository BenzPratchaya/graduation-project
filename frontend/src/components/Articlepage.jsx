import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./css/Articledata.css";
import CommentAdd from "./Comment_add";
import Bannerpage from "./Bannerpage";
import Articlepost from "./Articlepost";
import Article1 from "../article/Article1";
import Article2 from "../article/Article2";
import Article3 from "../article/Article3";
import Article4 from "../article/Article4";

const Articlepage = ({ user }) => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((res) => res.json())
      .then((result) => {
        setArticles(result);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/article/${articleId}`)
      .then((response) => setArticle(response.data))
      .catch((error) => console.error("Error fetching the article:", error));
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const selectArticleComponent = (articleId) => {
    switch (articleId) {
      case "1":
        return <Article1 />;
      case "2":
        return <Article2 />;
      case "3":
        return <Article3 />;
      case "4":
        return <Article4 />;
      default:
        return <div>ไม่พบบทความที่ต้องการ {articleId}</div>;
    }
  };

  return (
    <div className="Article1">
      {/* <!-- Banner --> */}
      <div className="banner-container">
        <Bannerpage title="บทความเพื่อสุขภาพ" page="Articles"></Bannerpage>
      </div>
      {/* <!-- END Banner --> */}
      <Container
        className="mt-5"
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row>
          <Col xs={12} sm={8}>
            <div
              className="w3-padding"
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 className="fw-bold">{article.title}</h1>
              <hr />
            </div>
            <div className="w3-padding" style={{ textAlign: "center" }}>
              <img
                src={`http://localhost:3001/image/${article.image}`}
                alt="Norway"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>
            <div className="w3-padding">
              <h2>{article.content}</h2>
            </div>

            <div className="container container-sm">
              <hr />
              {/* Article */}
              {selectArticleComponent(articleId)}
              {/* Article */}
            </div>
            <br />
          </Col>

          {/* <!-- Introduction menu --> */}
          <Articlepost postList={articles} />
          {/* <!-- END Introduction Menu --> */}
        </Row>
        {/* <!-- Comment --> */}
        <CommentAdd articleId={articleId} user={user} />
        {/* <!-- END Comment --> */}
      </Container>
    </div>
  );
};

export default Articlepage;
