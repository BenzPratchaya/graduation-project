import React from "react";
import { Container, Carousel, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Articlecards(props) {
  const chunkSize = 3;

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const cardChunks = chunkArray(props.cardList, chunkSize);

  return (
    <Container>
      <Row>
        <Carousel interval={5000} pause={false} indicators={false} slide={true}>
          {cardChunks.map((chunk, index) => (
            <Carousel.Item key={index}>
              <Row>
                {chunk.map((card) => (
                  <Col key={card.id} md={4} className="mb-4">
                    <Card className="w3-light-grey">
                      <Link component={Link} to={`/article/${card.id}`} style={{ textDecoration: "none", color: "black" }}>
                        <Card.Img src={`http://localhost:3001/image/${card.image}`} alt={`Card ${card.id}`} style={{ height: "350px" }} />
                        <Card.Body>
                          <Card.Title>{card.title}</Card.Title>
                          <Card.Text>{card.content}</Card.Text>
                          {/* <Button className="btn btn-light">Read More</Button> */}
                        </Card.Body>
                      </Link>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>
    </Container>
  );
}

export default Articlecards;
