import React from "react";
import "./css/Firstaid.css";

const FirstaidVideo = ({ isOpen, onClose, videoUrl }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <iframe className="modal-content" style={{ width: "70%", height: "100vh" }} src={videoUrl} allowFullScreen></iframe>
    </div>
  );
};
export default FirstaidVideo;
