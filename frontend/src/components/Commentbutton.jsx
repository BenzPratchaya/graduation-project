import { React, useState } from "react";

const Commentbutton = () => {
  const [comments, setComments] = useState([]);

  return (
    <div className="d-flex">
      <button>
        <img
          src="https://static.thenounproject.com/png/638755-200.png"
          style={{ width: "30px" }}
        />
        comment
      </button>
    </div>
  );
};

export default Commentbutton;
