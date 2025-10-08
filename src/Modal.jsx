import React from "react";
import "./Modal.css";

const Modal = ({ image, onClose, onDownload }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={image.largeImageURL} alt={image.tags} className="modal-img" />

        <div className="modal-details">
          <p><b>Tags:</b> {image.tags}</p>
          <p><b>Likes:</b> {image.likes} | <b>Downloads:</b> {image.downloads}</p>

          <button className="download-btn" onClick={onDownload}>⬇ Download</button>
        </div>

        <button className="close-btn" onClick={onClose}>✖ Close</button>
      </div>
    </div>
  );
};

export default Modal;
