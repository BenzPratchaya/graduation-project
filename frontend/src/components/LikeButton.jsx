import React, { useState, useEffect } from "react";
import axios from "axios";
// import io from "socket.io-client";
// const socket = io("http://localhost:3001");
import "./css/LikeButton.css";

function LikeButton(props) {
  const [liked, setLiked] = useState(props.article.liked);
  const [likes, setLikes] = useState(props.article.like_count);

  useEffect(() => {
    setLiked(props.article.liked);
    setLikes(props.article.like_count);
  }, [props.article.liked, props.article.like_count]);

  const handleLikeUnlike = () => {
    if (!props.user.id) {
      alert("Please log in or register to like articles.");
      return;
    }

    const endpoint = liked ? "updateunlike" : "updatelike";
    const method = "put";

    axios[method](
      `http://localhost:3001/article/${endpoint}/${props.article.article_id}`,
      { key: props.article.article_id }
    )
      .then((response) => {
        console.log(response.data);
        axios[method](
          `http://localhost:3001/like/${liked ? "unliked" : "liked"}/${
            props.article.article_id
          }/${props.user.id}`,
          { key: props.article.article_id }
        )
          .then((response) => {
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="d-flex">
      <div onClick={handleLikeUnlike}>
        {liked ? (
          <img
            src="http://localhost:3000/images/red-heart-icon.svg"
            alt="Heart Icon"
            style={{
              marginTop: "5px",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out", // เพิ่ม transition เมื่อมีการ hover
              transform: "scale(1)", // ปกติ
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")} // ขยายขนาดเมื่อ hover
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")} // กลับสู่ขนาดปกติเมื่อไม่ hover
          />
        ) : (
          <img
            src="http://localhost:3000/images/heart-thin-icon.svg"
            alt="Heart Icon"
            style={{
              marginTop: "5px",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out", // เพิ่ม transition เมื่อมีการ hover
              transform: "scale(1)", // ปกติ
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")} // ขยายขนาดเมื่อ hover
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")} // กลับสู่ขนาดปกติเมื่อไม่ hover
          />
        )}
      </div>
      <h5 className="mx-2">{likes}</h5>
    </div>
  );
}

export default LikeButton;
