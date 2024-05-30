import React from "react";
import { Row } from "react-bootstrap";
import Firstaidcard from "./Firstaidcard";

const Firstaidlist = (props) => {
  return (
    <div className="video-list">
      <Row>
        {props.filteredResults.map((card) => (
          <Firstaidcard key={card.id} id={card.id} name={card.name} detail={card.detail} image={card.image} videoUrl={card.video} link={card.link} />
        ))}
      </Row>
    </div>
  );
};

export default Firstaidlist;
