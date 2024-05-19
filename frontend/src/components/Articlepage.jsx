import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Button, Row, Col } from "react-bootstrap";
import "./css/Articledata.css";
import CommentAdd from "./Comment_add";
import Banner from "./Banner";
import Articlepost from "./Articlepost";

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

  return (
    <div className="Article1">
      {/* <!-- Banner --> */}
      <div class="banner-container">
        <Button as={Link} to="/article">
          Back to Articles
        </Button>
        <Banner title="บทความเพื่อสุขภาพ" page="Articles"></Banner>
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
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s,
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
