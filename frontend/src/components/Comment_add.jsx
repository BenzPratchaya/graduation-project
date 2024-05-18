import React, { useState } from "react";
import "./css/Comment_add.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Comment_add() {
  const [username, setUsername] = useState("");
  const [userComment, setUserComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle form submission logic here (e.g., API call)
    console.log("Submitted comment:", username, userComment);

    // Reset form after submission (optional)
    setUsername("");
    setUserComment("");
  };

  return (
    <div className="add-comment-post container w3-padding">
      <form
        action={`/community/user-post-${1}/createComment`}
        method="POST"
        id={1}
        onSubmit={handleSubmit}
      >
        <div className="cm-header">
          <AccountCircleIcon className="box-img" />
          <p>Pratchaya Tanapiboonphol</p>
        </div>
        <hr/>
        <div className="cm-content">
          <textarea
            name="userComment"
            className="contentComment"
            cols="30"
            rows="10"
            value={userComment}
            onChange={(event) => setUserComment(event.target.value)}
          />
          <button className="post-comments-1" type="submit">
            comment
          </button>
        </div>
      </form>
    </div>
  );
}

export default Comment_add;
