import React from "react";
import "./css/Firstaid.css";
import { Link } from "react-router-dom";

function Firstaidpost(props) {
  const lastPosts = props.postList.slice().reverse().slice(0, 7);

  return (
    <div className="w3-col l4">
      <div className="w3-card w3-margin">
        <div className="w3-container w3-padding">
          <h4>Latest Post</h4>
        </div>
        <ul className="w3-ul w3-hoverable w3-white">
          {lastPosts.map((firstaid) => (
            <li className="w3-padding-16 d-flex align-items-center" key={firstaid.id} style={{ justifyContent: "center" }}>
              <Link to={`/firstaid/${firstaid.id}`} style={{ textDecoration: "none", color: "black", display: "flex", alignItems: "center" }}>
                <img src={`http://localhost:3001/image/${firstaid.image}`} alt="Image" className="w3-left w3-margin-right" style={{ width: "15%" }} />
                <span className="w3-medium">{firstaid.name}</span>
              </Link>
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Firstaidpost;
