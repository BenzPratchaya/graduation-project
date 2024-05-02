import React from "react";

function Modal() {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="คลิปวิดีโอ"
      key={firstaid.id}
      style={{
        content: {
          width: "80%",
          height: "85%",
          margin: "auto",
        },
      }}
    >
      <div
        style={{
          width: "100%",
          height: "85%",
          margin: "auto",
        }}
      >
        <div
          className="header"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2>คลิปวิดีโอ</h2>
          <Button
            className="w3-button w3-white w3-border fw-bold fs-5 px-4 py-2"
            onClick={closeModal}
          >
            X
          </Button>
        </div>

        <iframe
          style={{ width: "100%", height: "100%" }}
          src={firstaid.video}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </Modal>
  );
}

export default Modal;
