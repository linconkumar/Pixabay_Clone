import React from "react";
import "./ImageCard.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <div className="image-card" onClick={onClick}>
      <img src={image.webformatURL} alt={image.tags} className="gallery-img" />
    </div>
  );
};

export default ImageCard;
